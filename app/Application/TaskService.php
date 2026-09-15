<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Application;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Modules\TasksProjects\Application\Concerns\DetectsUniqueViolations;
use Modules\TasksProjects\Application\Concerns\SortsLists;
use Modules\TasksProjects\Application\Exceptions\EntriesAlreadyInvoiced;
use Modules\TasksProjects\Models\Project;
use Modules\TasksProjects\Models\Task;
use Modules\TasksProjects\Models\TaskStatus;
use Modules\TasksProjects\Models\TimeEntry;

/** Task CRUD and board moves. Everything here is scoped to one company. */
final class TaskService
{
    use DetectsUniqueViolations;
    use SortsLists;

    /**
     * The columns the list may be ordered by. The request rule reads this, so
     * a new key is added here and nowhere else.
     *
     * @var list<string>
     */
    public const SORT_KEYS = ['number', 'name', 'priority', 'due_date', 'created_at'];

    /** The per-company sequence, which is the order people refer to tasks in. */
    public const DEFAULT_SORT_KEY = 'number';

    public const DEFAULT_SORT_ORDER = 'asc';

    /** @var list<string> */
    private const FIELDS = [
        'name', 'description', 'assignee_id', 'priority', 'due_date',
        'estimated_minutes', 'billable', 'rate', 'creator_id',
    ];

    public function __construct(
        private readonly TaskNumberSequence $numbers,
        private readonly BoardOrderingService $board,
        private readonly TaskStatusService $statuses,
        private readonly ProjectService $projects,
    ) {}

    /**
     * @param  array{project_id?: int, assignee_id?: int, task_status_id?: int, customer_id?: int, due_before?: string, due_after?: string, search?: string, sort_by?: string, sort_order?: string}  $filters
     * @return Collection<int, Task>
     */
    public function listFor(int $companyId, array $filters = []): Collection
    {
        $query = Task::query()->forCompany($companyId);

        foreach (['project_id', 'assignee_id', 'task_status_id', 'customer_id'] as $field) {
            if (array_key_exists($field, $filters)) {
                $query->where($field, $filters[$field]);
            }
        }

        if (isset($filters['due_after'])) {
            $query->where('due_date', '>=', Carbon::parse($filters['due_after'])->toDateString());
        }

        if (isset($filters['due_before'])) {
            $query->where('due_date', '<=', Carbon::parse($filters['due_before'])->toDateString());
        }

        if (isset($filters['search']) && $filters['search'] !== '') {
            $query->where('name', 'like', '%'.$filters['search'].'%');
        }

        $sorts = $this->sorts();
        [$key, $order] = $this->sortFor($filters, $sorts, self::DEFAULT_SORT_KEY, self::DEFAULT_SORT_ORDER);

        return $this->sortList($query->get(), $sorts[$key], $order);
    }

    /**
     * How each sortable column compares, as a value the sorter can order.
     *
     * Priority sorts by its rank rather than by its name, so URGENT sits above
     * HIGH instead of below it, and a task with no priority set answers null,
     * which the sorter always puts last.
     *
     * @return array<string, callable(Task): (int|string|null)>
     */
    private function sorts(): array
    {
        return [
            'number' => static fn (Task $task): int => (int) $task->number,
            'name' => static fn (Task $task): string => (string) $task->name,
            'priority' => static fn (Task $task): ?int => self::priorityRank($task),
            'due_date' => static fn (Task $task): ?int => $task->due_date?->getTimestamp(),
            'created_at' => static fn (Task $task): ?int => $task->created_at?->getTimestamp(),
        ];
    }

    /** LOW, NORMAL, HIGH, URGENT as 1 to 4; an unset or unknown value as null. */
    private static function priorityRank(Task $task): ?int
    {
        $rank = array_search($task->priority, Task::PRIORITIES, true);

        return $rank === false ? null : $rank + 1;
    }

    public function findForCompany(int $companyId, int $id): Task
    {
        $task = Task::query()->forCompany($companyId)->find($id);

        if ($task === null) {
            throw (new ModelNotFoundException)->setModel(Task::class, [$id]);
        }

        return $task;
    }

    /**
     * Create a task, denormalising the customer from its project.
     *
     * The number comes from the per-company sequence; because two writers can
     * pick the same one, the unique index catches the loser and the write is
     * retried once with a fresh number.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function create(int $companyId, array $attributes): Task
    {
        $project = isset($attributes['project_id']) && $attributes['project_id'] !== null
            ? $this->projects->findForCompany($companyId, (int) $attributes['project_id'])
            : null;

        $status = isset($attributes['task_status_id']) && $attributes['task_status_id'] !== null
            ? $this->statuses->findForCompany($companyId, (int) $attributes['task_status_id'])
            : $this->statuses->defaultFor($companyId);

        $values = [
            'company_id' => $companyId,
            'project_id' => $project?->id,
            'customer_id' => $this->customerFor($project, $attributes),
            'task_status_id' => $status->id,
            'billable' => (bool) ($attributes['billable'] ?? true),
            'closed_at' => $status->is_closed ? Carbon::now() : null,
        ];

        foreach (self::FIELDS as $field) {
            if (array_key_exists($field, $attributes)) {
                $values[$field] = $attributes[$field];
            }
        }

        return $this->withRetry(fn (): Task => Task::query()->create($values + [
            'number' => $this->numbers->next($companyId),
            'board_position' => $this->board->positionFor($companyId, (int) $status->id),
        ]));
    }

    /** @param array<string, mixed> $attributes */
    public function update(int $companyId, int $id, array $attributes): Task
    {
        return DB::transaction(function () use ($companyId, $id, $attributes): Task {
            $task = $this->findForCompany($companyId, $id);

            if (array_key_exists('project_id', $attributes)) {
                $project = $attributes['project_id'] === null
                    ? null
                    : $this->projects->findForCompany($companyId, (int) $attributes['project_id']);

                $task->project_id = $project?->id;
                $task->customer_id = $this->customerFor($project, $attributes);
            } elseif (array_key_exists('customer_id', $attributes) && $task->project_id === null) {
                $task->customer_id = $attributes['customer_id'];
            }

            if (array_key_exists('task_status_id', $attributes)
                && (int) $attributes['task_status_id'] !== (int) $task->task_status_id) {
                $status = $this->statuses->findForCompany($companyId, (int) $attributes['task_status_id']);
                $this->applyStatus($task, $status);
                $task->board_position = $this->board->positionFor($companyId, (int) $status->id);
            }

            foreach (self::FIELDS as $field) {
                if (array_key_exists($field, $attributes)) {
                    $task->{$field} = $attributes[$field];
                }
            }

            $task->save();

            return $task;
        });
    }

    /** Deleting a task takes its time entries with it, unless any of them are invoiced. */
    public function delete(int $companyId, int $id): void
    {
        DB::transaction(function () use ($companyId, $id): void {
            $task = $this->findForCompany($companyId, $id);

            $invoiced = TimeEntry::query()
                ->forCompany($companyId)
                ->where('task_id', $task->id)
                ->whereNotNull('invoice_id')
                ->pluck('id')
                ->all();

            if ($invoiced !== []) {
                throw EntriesAlreadyInvoiced::forEntries(array_map(intval(...), $invoiced));
            }

            TimeEntry::query()->forCompany($companyId)->where('task_id', $task->id)->delete();

            $task->delete();
        });
    }

    /** Drop a task between two neighbours of the target column. */
    public function move(int $companyId, int $taskId, int $statusId, ?int $beforeId = null, ?int $afterId = null): Task
    {
        return DB::transaction(function () use ($companyId, $taskId, $statusId, $beforeId, $afterId): Task {
            $task = $this->findForCompany($companyId, $taskId);
            $status = $this->statuses->findForCompany($companyId, $statusId);

            $position = $this->board->positionFor($companyId, (int) $status->id, $beforeId, $afterId);

            $this->applyStatus($task, $status);
            $task->board_position = $position;
            $task->save();

            return $task;
        });
    }

    /** Entering a closed status stamps closed_at; leaving one clears it. */
    private function applyStatus(Task $task, TaskStatus $status): void
    {
        $task->task_status_id = $status->id;

        if ($status->is_closed) {
            $task->closed_at ??= Carbon::now();

            return;
        }

        $task->closed_at = null;
    }

    /** @param array<string, mixed> $attributes */
    private function customerFor(?Project $project, array $attributes): ?int
    {
        if ($project !== null) {
            return $project->customer_id === null ? null : (int) $project->customer_id;
        }

        return isset($attributes['customer_id']) ? (int) $attributes['customer_id'] : null;
    }

    /**
     * Run a write once more when the per-company number collided.
     *
     * @template T
     *
     * @param  callable(): T  $write
     * @return T
     */
    private function withRetry(callable $write): mixed
    {
        try {
            return $write();
        } catch (QueryException $exception) {
            if (! $this->isUniqueViolation($exception)) {
                throw $exception;
            }

            return $write();
        }
    }
}
