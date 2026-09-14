<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Tests\Feature;

use Modules\TasksProjects\Models\Task;
use Modules\TasksProjects\Models\TaskStatus;
use Modules\TasksProjects\Support\Abilities;
use Modules\TasksProjects\Support\Authorizes;
use Modules\TasksProjects\Tests\TestCase;

final class TasksApiTest extends TestCase
{
    private const COMPANY = 9;

    private const OTHER_COMPANY = 10;

    private const CUSTOMER = 42;

    public function test_the_task_number_is_a_per_company_sequence(): void
    {
        $first = $this->asCompany(self::COMPANY)->postJson('/api/v1/tasks-projects/tasks', ['name' => 'First']);
        $second = $this->asCompany(self::COMPANY)->postJson('/api/v1/tasks-projects/tasks', ['name' => 'Second']);
        $elsewhere = $this->asCompany(self::OTHER_COMPANY)->postJson('/api/v1/tasks-projects/tasks', ['name' => 'Theirs']);

        $first->assertCreated()->assertJsonPath('data.number', 1);
        $second->assertCreated()->assertJsonPath('data.number', 2);
        $elsewhere->assertCreated()->assertJsonPath('data.number', 1);
    }

    public function test_a_new_task_lands_in_the_default_column_and_takes_the_projects_customer(): void
    {
        $project = $this->makeProject(self::COMPANY, ['customer_id' => self::CUSTOMER]);

        $response = $this->asCompany(self::COMPANY)->postJson('/api/v1/tasks-projects/tasks', [
            'name' => 'Landing page',
            'project_id' => $project->id,
            'priority' => Task::PRIORITY_HIGH,
            'estimated_minutes' => 120,
        ]);

        $response->assertCreated();
        $response->assertJsonPath('data.customer_id', self::CUSTOMER);
        $response->assertJsonPath('data.creator_id', self::DEFAULT_USER);
        $response->assertJsonPath('data.billable', true);
        $response->assertJsonPath('data.priority', Task::PRIORITY_HIGH);
        $response->assertJsonPath('data.closed_at', null);

        $default = TaskStatus::query()->forCompany(self::COMPANY)->where('is_default', true)->firstOrFail();
        $response->assertJsonPath('data.task_status_id', (int) $default->id);
    }

    public function test_a_standalone_task_can_carry_its_own_customer(): void
    {
        $this->asCompany(self::COMPANY)
            ->postJson('/api/v1/tasks-projects/tasks', ['name' => 'Ad hoc call', 'customer_id' => self::CUSTOMER])
            ->assertCreated()
            ->assertJsonPath('data.project_id', null)
            ->assertJsonPath('data.customer_id', self::CUSTOMER);
    }

    public function test_entering_a_closed_column_stamps_closed_at_and_leaving_it_clears_it(): void
    {
        $open = $this->makeStatus(self::COMPANY, ['name' => 'Backlog']);
        $done = $this->makeStatus(self::COMPANY, ['name' => 'Done', 'position' => 2, 'is_default' => false, 'is_closed' => true]);
        $task = $this->makeTask(self::COMPANY, ['task_status_id' => $open->id]);

        $this->asCompany(self::COMPANY)
            ->putJson('/api/v1/tasks-projects/tasks/'.$task->id, ['task_status_id' => $done->id])
            ->assertOk()
            ->assertJsonPath('data.task_status_id', (int) $done->id);

        self::assertNotNull(Task::query()->findOrFail($task->id)->closed_at);

        $this->asCompany(self::COMPANY)
            ->putJson('/api/v1/tasks-projects/tasks/'.$task->id, ['task_status_id' => $open->id])
            ->assertOk()
            ->assertJsonPath('data.closed_at', null);
    }

    public function test_the_list_filters_by_project_assignee_status_due_date_and_text(): void
    {
        $project = $this->makeProject(self::COMPANY);
        $status = $this->makeStatus(self::COMPANY);
        $other = $this->makeStatus(self::COMPANY, ['name' => 'Done', 'position' => 2, 'is_default' => false]);

        $landing = $this->makeTask(self::COMPANY, [
            'task_status_id' => $status->id,
            'project_id' => $project->id,
            'assignee_id' => 8,
            'name' => 'Landing page',
            'due_date' => '2026-09-10',
        ]);
        $pricing = $this->makeTask(self::COMPANY, [
            'task_status_id' => $other->id,
            'name' => 'Pricing table',
            'due_date' => '2026-10-10',
        ]);

        $this->assertListReturns([$landing->id], '?project_id='.$project->id);
        $this->assertListReturns([$landing->id], '?assignee_id=8');
        $this->assertListReturns([$pricing->id], '?task_status_id='.$other->id);
        $this->assertListReturns([$landing->id], '?due_before=2026-09-30');
        $this->assertListReturns([$pricing->id], '?due_after=2026-09-30');
        $this->assertListReturns([$pricing->id], '?search=Pricing');
    }

    public function test_the_list_is_paged_and_never_leaves_the_company(): void
    {
        $this->makeTask(self::COMPANY, ['name' => 'Mine']);
        $this->makeTask(self::OTHER_COMPANY, ['name' => 'Theirs']);

        $this->asCompany(self::COMPANY)
            ->getJson('/api/v1/tasks-projects/tasks')
            ->assertOk()
            ->assertJsonPath('meta.total', 1)
            ->assertJsonPath('meta.per_page', 15)
            ->assertJsonPath('data.0.name', 'Mine');
    }

    public function test_a_move_lands_between_its_new_neighbours(): void
    {
        $status = $this->makeStatus(self::COMPANY);
        $target = $this->makeStatus(self::COMPANY, ['name' => 'In Progress', 'position' => 2, 'is_default' => false]);

        $first = $this->makeTask(self::COMPANY, ['task_status_id' => $target->id, 'board_position' => '1024.0000000000']);
        $second = $this->makeTask(self::COMPANY, ['task_status_id' => $target->id, 'board_position' => '2048.0000000000']);
        $dragged = $this->makeTask(self::COMPANY, ['task_status_id' => $status->id]);

        $response = $this->asCompany(self::COMPANY)->postJson('/api/v1/tasks-projects/tasks/'.$dragged->id.'/move', [
            'task_status_id' => $target->id,
            'before_id' => $first->id,
            'after_id' => $second->id,
        ]);

        $response->assertOk();
        $response->assertJsonPath('data.task_status_id', (int) $target->id);
        $response->assertJsonPath('data.board_position', '1536.0000000000');
    }

    public function test_a_move_to_the_end_of_a_column_appends(): void
    {
        $status = $this->makeStatus(self::COMPANY);
        $last = $this->makeTask(self::COMPANY, ['task_status_id' => $status->id, 'board_position' => '2048.0000000000']);
        $dragged = $this->makeTask(self::COMPANY, ['task_status_id' => $status->id, 'board_position' => '1024.0000000000']);

        $this->asCompany(self::COMPANY)
            ->postJson('/api/v1/tasks-projects/tasks/'.$dragged->id.'/move', [
                'task_status_id' => $status->id,
                'before_id' => $last->id,
            ])
            ->assertOk()
            ->assertJsonPath('data.board_position', '3072.0000000000');
    }

    public function test_a_move_refuses_a_neighbour_outside_the_target_column(): void
    {
        $status = $this->makeStatus(self::COMPANY);
        $target = $this->makeStatus(self::COMPANY, ['name' => 'In Progress', 'position' => 2, 'is_default' => false]);
        $stranger = $this->makeTask(self::COMPANY, ['task_status_id' => $status->id]);
        $dragged = $this->makeTask(self::COMPANY, ['task_status_id' => $status->id]);

        $this->asCompany(self::COMPANY)
            ->postJson('/api/v1/tasks-projects/tasks/'.$dragged->id.'/move', [
                'task_status_id' => $target->id,
                'before_id' => $stranger->id,
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['before_id']);
    }

    public function test_the_board_groups_tasks_into_columns_in_board_order(): void
    {
        $backlog = $this->makeStatus(self::COMPANY, ['name' => 'Backlog']);
        $doing = $this->makeStatus(self::COMPANY, ['name' => 'In Progress', 'position' => 2, 'is_default' => false]);

        $second = $this->makeTask(self::COMPANY, ['task_status_id' => $backlog->id, 'name' => 'Second', 'board_position' => '2048.0000000000']);
        $first = $this->makeTask(self::COMPANY, ['task_status_id' => $backlog->id, 'name' => 'First', 'board_position' => '1024.0000000000']);
        $this->makeTask(self::COMPANY, ['task_status_id' => $doing->id, 'name' => 'Underway']);
        $this->makeTask(self::OTHER_COMPANY, ['name' => 'Theirs']);

        $response = $this->asCompany(self::COMPANY)->getJson('/api/v1/tasks-projects/board');

        $response->assertOk();
        $response->assertJsonCount(2, 'data');
        $response->assertJsonPath('data.0.status.name', 'Backlog');
        $response->assertJsonPath('data.0.tasks.0.id', (int) $first->id);
        $response->assertJsonPath('data.0.tasks.1.id', (int) $second->id);
        $response->assertJsonPath('data.1.status.name', 'In Progress');
        $response->assertJsonPath('data.1.tasks.0.name', 'Underway');
    }

    public function test_the_board_seeds_the_default_columns_and_filters_by_project_and_assignee(): void
    {
        $project = $this->makeProject(self::COMPANY);

        $response = $this->asCompany(self::COMPANY)->getJson('/api/v1/tasks-projects/board');

        $response->assertOk();
        $response->assertJsonCount(4, 'data');
        $response->assertJsonPath('data.0.status.name', 'Backlog');

        $status = TaskStatus::query()->forCompany(self::COMPANY)->where('is_default', true)->firstOrFail();
        $mine = $this->makeTask(self::COMPANY, ['task_status_id' => $status->id, 'project_id' => $project->id, 'assignee_id' => 8]);
        $this->makeTask(self::COMPANY, ['task_status_id' => $status->id, 'name' => 'Unassigned']);

        $this->asCompany(self::COMPANY)
            ->getJson('/api/v1/tasks-projects/board?project_id='.$project->id)
            ->assertJsonCount(1, 'data.0.tasks')
            ->assertJsonPath('data.0.tasks.0.id', (int) $mine->id);

        $this->asCompany(self::COMPANY)
            ->getJson('/api/v1/tasks-projects/board?assignee_id=8')
            ->assertJsonCount(1, 'data.0.tasks')
            ->assertJsonPath('data.0.tasks.0.id', (int) $mine->id);
    }

    public function test_deleting_a_task_takes_its_uninvoiced_time_with_it(): void
    {
        $task = $this->makeTask(self::COMPANY);
        $this->makeEntry(self::COMPANY, (int) $task->id);

        $this->asCompany(self::COMPANY)
            ->deleteJson('/api/v1/tasks-projects/tasks/'.$task->id)
            ->assertOk()
            ->assertJson(['success' => true]);

        self::assertSame(0, Task::query()->forCompany(self::COMPANY)->count());
    }

    public function test_deleting_a_task_with_invoiced_time_is_refused(): void
    {
        $task = $this->makeTask(self::COMPANY);
        $this->makeEntry(self::COMPANY, (int) $task->id, ['invoice_id' => 77, 'invoice_item_id' => 88]);

        $this->asCompany(self::COMPANY)
            ->deleteJson('/api/v1/tasks-projects/tasks/'.$task->id)
            ->assertStatus(422)
            ->assertJsonPath('error', 'entries_already_invoiced');
    }

    public function test_a_task_of_another_company_is_not_found(): void
    {
        $task = $this->makeTask(self::OTHER_COMPANY);

        $this->asCompany(self::COMPANY)->getJson('/api/v1/tasks-projects/tasks/'.$task->id)->assertNotFound();
        $this->asCompany(self::COMPANY)->putJson('/api/v1/tasks-projects/tasks/'.$task->id, ['name' => 'Mine now'])->assertNotFound();
        $this->asCompany(self::COMPANY)->deleteJson('/api/v1/tasks-projects/tasks/'.$task->id)->assertNotFound();
    }

    public function test_every_action_refuses_without_its_ability(): void
    {
        $task = $this->makeTask(self::COMPANY);

        $this->authorization->deny(
            Authorizes::id(Abilities::VIEW_TASK),
            Authorizes::id(Abilities::CREATE_TASK),
            Authorizes::id(Abilities::EDIT_TASK),
            Authorizes::id(Abilities::DELETE_TASK),
        );

        $this->asCompany(self::COMPANY)->getJson('/api/v1/tasks-projects/tasks')->assertForbidden();
        $this->asCompany(self::COMPANY)->postJson('/api/v1/tasks-projects/tasks', ['name' => 'Nope'])->assertForbidden();
        $this->asCompany(self::COMPANY)->getJson('/api/v1/tasks-projects/tasks/'.$task->id)->assertForbidden();
        $this->asCompany(self::COMPANY)->putJson('/api/v1/tasks-projects/tasks/'.$task->id, ['name' => 'Nope'])->assertForbidden();
        $this->asCompany(self::COMPANY)->deleteJson('/api/v1/tasks-projects/tasks/'.$task->id)->assertForbidden();
        $this->asCompany(self::COMPANY)->postJson('/api/v1/tasks-projects/tasks/'.$task->id.'/move', [
            'task_status_id' => $task->task_status_id,
        ])->assertForbidden();
        $this->asCompany(self::COMPANY)->getJson('/api/v1/tasks-projects/board')->assertForbidden();
    }

    /** @param list<int> $expected */
    private function assertListReturns(array $expected, string $query): void
    {
        $ids = $this->asCompany(self::COMPANY)
            ->getJson('/api/v1/tasks-projects/tasks'.$query)
            ->assertOk()
            ->json('data.*.id');

        self::assertSame(array_map(intval(...), $expected), $ids);
    }
}
