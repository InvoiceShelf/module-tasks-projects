<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Application;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Modules\TasksProjects\Application\Exceptions\ProjectInUse;
use Modules\TasksProjects\Models\Project;
use Modules\TasksProjects\Models\ProjectMember;
use Modules\TasksProjects\Models\Task;
use Modules\TasksProjects\Models\TimeEntry;

/** Project CRUD, archiving and the totals the project detail screen shows. */
final class ProjectService
{
    /** @var list<string> */
    private const FIELDS = [
        'customer_id', 'name', 'identifier', 'description', 'colour', 'status',
        'currency_id', 'default_rate', 'budget_minutes', 'due_date', 'creator_id',
    ];

    /**
     * @param  array{status?: string, customer_id?: int, user_id?: int}  $filters
     * @return Collection<int, Project>
     */
    public function listFor(int $companyId, array $filters = []): Collection
    {
        $query = Project::query()->forCompany($companyId);

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (array_key_exists('customer_id', $filters)) {
            $query->where('customer_id', $filters['customer_id']);
        }

        if (isset($filters['user_id'])) {
            $query->whereIn('id', ProjectMember::query()
                ->forCompany($companyId)
                ->where('user_id', $filters['user_id'])
                ->select('project_id'));
        }

        return $query->orderBy('name')->orderBy('id')->get();
    }

    public function findForCompany(int $companyId, int $id): Project
    {
        $project = Project::query()->forCompany($companyId)->find($id);

        if ($project === null) {
            throw (new ModelNotFoundException)->setModel(Project::class, [$id]);
        }

        return $project;
    }

    /** @param array<string, mixed> $attributes */
    public function create(int $companyId, array $attributes): Project
    {
        $values = ['company_id' => $companyId, 'status' => Project::STATUS_ACTIVE];

        foreach (self::FIELDS as $field) {
            if (array_key_exists($field, $attributes)) {
                $values[$field] = $attributes[$field];
            }
        }

        return Project::query()->create($values);
    }

    /**
     * A project's customer is denormalised onto its tasks, so changing it
     * rewrites the tasks that follow the project.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function update(int $companyId, int $id, array $attributes): Project
    {
        return DB::transaction(function () use ($companyId, $id, $attributes): Project {
            $project = $this->findForCompany($companyId, $id);
            $customerChanged = array_key_exists('customer_id', $attributes)
                && (int) $attributes['customer_id'] !== (int) $project->customer_id;

            foreach (self::FIELDS as $field) {
                if (array_key_exists($field, $attributes)) {
                    $project->{$field} = $attributes[$field];
                }
            }

            $project->save();

            if ($customerChanged) {
                Task::query()
                    ->forCompany($companyId)
                    ->where('project_id', $project->id)
                    ->get()
                    ->each(function (Task $task) use ($project): void {
                        $task->customer_id = $project->customer_id;
                        $task->save();
                    });
            }

            return $project;
        });
    }

    public function archive(int $companyId, int $id): Project
    {
        return $this->setStatus($companyId, $id, Project::STATUS_ARCHIVED);
    }

    public function unarchive(int $companyId, int $id): Project
    {
        return $this->setStatus($companyId, $id, Project::STATUS_ACTIVE);
    }

    /**
     * Delete a project with its members, tasks and time entries.
     *
     * Invoiced time is history and never disappears, so a project that carries
     * any stamped entry is refused: archive it instead.
     */
    public function delete(int $companyId, int $id): void
    {
        DB::transaction(function () use ($companyId, $id): void {
            $project = $this->findForCompany($companyId, $id);

            $invoiced = TimeEntry::query()
                ->forCompany($companyId)
                ->where('project_id', $project->id)
                ->whereNotNull('invoice_id')
                ->exists();

            if ($invoiced) {
                throw ProjectInUse::hasInvoicedTime((int) $project->id);
            }

            TimeEntry::query()->forCompany($companyId)->where('project_id', $project->id)->delete();
            Task::query()->forCompany($companyId)->where('project_id', $project->id)->delete();
            ProjectMember::query()->forCompany($companyId)->where('project_id', $project->id)->delete();

            $project->delete();
        });
    }

    /**
     * Task counts and logged, billable and unbilled totals for one project.
     *
     * Amounts stay in minor units and are not converted between currencies: a
     * project carries a single currency, inherited from its customer.
     *
     * @return array{tasks: array{total: int, open: int, closed: int}, logged_minutes: int, billable_minutes: int, billable_amount: int, unbilled_amount: int, currency_id: int|null}
     */
    public function totals(Project $project): array
    {
        $companyId = (int) $project->company_id;

        $total = Task::query()->forCompany($companyId)->where('project_id', $project->id)->count();
        $closed = Task::query()->forCompany($companyId)->where('project_id', $project->id)->whereNotNull('closed_at')->count();

        $entries = TimeEntry::query()
            ->forCompany($companyId)
            ->where('project_id', $project->id)
            ->get(['duration_minutes', 'billable', 'amount', 'invoice_id']);

        $loggedMinutes = 0;
        $billableMinutes = 0;
        $billableAmount = 0;
        $unbilledAmount = 0;

        foreach ($entries as $entry) {
            $loggedMinutes += (int) $entry->duration_minutes;

            if (! $entry->billable) {
                continue;
            }

            $billableMinutes += (int) $entry->duration_minutes;
            $billableAmount += (int) $entry->amount;

            if ($entry->invoice_id === null) {
                $unbilledAmount += (int) $entry->amount;
            }
        }

        return [
            'tasks' => ['total' => $total, 'open' => $total - $closed, 'closed' => $closed],
            'logged_minutes' => $loggedMinutes,
            'billable_minutes' => $billableMinutes,
            'billable_amount' => $billableAmount,
            'unbilled_amount' => $unbilledAmount,
            'currency_id' => $project->currency_id === null ? null : (int) $project->currency_id,
        ];
    }

    private function setStatus(int $companyId, int $id, string $status): Project
    {
        $project = $this->findForCompany($companyId, $id);
        $project->status = $status;
        $project->save();

        return $project;
    }
}
