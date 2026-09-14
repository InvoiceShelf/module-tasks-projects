<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Tests\Feature;

use Illuminate\Support\Carbon;
use Modules\TasksProjects\Models\TimeEntry;
use Modules\TasksProjects\Support\Abilities;
use Modules\TasksProjects\Support\Authorizes;
use Modules\TasksProjects\Support\ModuleSettings;
use Modules\TasksProjects\Tests\TestCase;

final class TimerApiTest extends TestCase
{
    private const COMPANY = 9;

    private const OTHER_COMPANY = 10;

    public function test_the_timer_is_null_until_it_is_started(): void
    {
        $this->asCompany(self::COMPANY)
            ->getJson('/api/v1/tasks-projects/timer')
            ->assertOk()
            ->assertExactJson(['data' => null]);
    }

    public function test_starting_opens_an_entry_that_carries_no_money_yet(): void
    {
        Carbon::setTestNow('2026-09-15 09:00:00');
        $task = $this->taskOnProjectAt(6000);

        $response = $this->asCompany(self::COMPANY)->postJson('/api/v1/tasks-projects/timer/start', [
            'task_id' => $task,
            'description' => 'Fixing the importer',
        ]);

        $response->assertCreated();
        $response->assertJsonPath('data.is_running', true);
        $response->assertJsonPath('data.user_id', self::DEFAULT_USER);
        $response->assertJsonPath('data.duration_minutes', 0);
        $response->assertJsonPath('data.amount', 0);
        $response->assertJsonPath('data.ended_at', null);

        $this->asCompany(self::COMPANY)
            ->getJson('/api/v1/tasks-projects/timer')
            ->assertOk()
            ->assertJsonPath('data.description', 'Fixing the importer');
    }

    public function test_a_second_start_is_a_conflict(): void
    {
        $task = $this->taskOnProjectAt(6000);
        $this->asCompany(self::COMPANY)->postJson('/api/v1/tasks-projects/timer/start', ['task_id' => $task])->assertCreated();

        $this->asCompany(self::COMPANY)
            ->postJson('/api/v1/tasks-projects/timer/start', ['task_id' => $task])
            ->assertStatus(409)
            ->assertJsonPath('error', 'timer_already_running');
    }

    public function test_stopping_rounds_the_elapsed_time_and_freezes_the_rate(): void
    {
        $this->settings->putCompany(self::COMPANY, ModuleSettings::PREFIX.'rounding_minutes', 15);
        $task = $this->taskOnProjectAt(6000);

        Carbon::setTestNow('2026-09-15 09:00:00');
        $this->asCompany(self::COMPANY)->postJson('/api/v1/tasks-projects/timer/start', ['task_id' => $task])->assertCreated();

        Carbon::setTestNow('2026-09-15 09:50:00');
        $response = $this->asCompany(self::COMPANY)->postJson('/api/v1/tasks-projects/timer/stop');

        $response->assertOk();
        $response->assertJsonPath('data.is_running', false);
        $response->assertJsonPath('data.duration_minutes', 45);
        $response->assertJsonPath('data.rate', 6000);
        $response->assertJsonPath('data.amount', 4500);

        $this->asCompany(self::COMPANY)
            ->getJson('/api/v1/tasks-projects/timer')
            ->assertExactJson(['data' => null]);
    }

    public function test_the_stopped_entry_joins_the_timesheet(): void
    {
        $task = $this->taskOnProjectAt(6000);

        Carbon::setTestNow('2026-09-15 09:00:00');
        $this->asCompany(self::COMPANY)->postJson('/api/v1/tasks-projects/timer/start', ['task_id' => $task]);

        $this->asCompany(self::COMPANY)
            ->getJson('/api/v1/tasks-projects/time-entries')
            ->assertJsonPath('meta.total', 0);

        Carbon::setTestNow('2026-09-15 10:00:00');
        $this->asCompany(self::COMPANY)->postJson('/api/v1/tasks-projects/timer/stop')->assertOk();

        $this->asCompany(self::COMPANY)
            ->getJson('/api/v1/tasks-projects/time-entries')
            ->assertJsonPath('meta.total', 1)
            ->assertJsonPath('data.0.duration_minutes', 60);
    }

    public function test_discarding_throws_the_running_entry_away(): void
    {
        $task = $this->taskOnProjectAt(6000);
        $this->asCompany(self::COMPANY)->postJson('/api/v1/tasks-projects/timer/start', ['task_id' => $task])->assertCreated();

        $this->asCompany(self::COMPANY)
            ->deleteJson('/api/v1/tasks-projects/timer')
            ->assertOk()
            ->assertJson(['success' => true]);

        self::assertSame(0, TimeEntry::query()->forCompany(self::COMPANY)->count());
    }

    public function test_stopping_or_discarding_an_idle_timer_is_not_found(): void
    {
        $this->asCompany(self::COMPANY)->postJson('/api/v1/tasks-projects/timer/stop')->assertNotFound();
        $this->asCompany(self::COMPANY)->deleteJson('/api/v1/tasks-projects/timer')->assertNotFound();
    }

    public function test_a_task_of_another_company_cannot_be_timed(): void
    {
        $task = $this->makeTask(self::OTHER_COMPANY);

        $this->asCompany(self::COMPANY)
            ->postJson('/api/v1/tasks-projects/timer/start', ['task_id' => $task->id])
            ->assertNotFound();
    }

    public function test_the_running_timer_belongs_to_one_company_at_a_time(): void
    {
        $here = $this->taskOnProjectAt(6000);
        $there = (int) $this->makeTask(self::OTHER_COMPANY)->id;

        $this->asCompany(self::COMPANY)->postJson('/api/v1/tasks-projects/timer/start', ['task_id' => $here])->assertCreated();

        $this->asCompany(self::OTHER_COMPANY)
            ->getJson('/api/v1/tasks-projects/timer')
            ->assertExactJson(['data' => null]);

        $this->asCompany(self::OTHER_COMPANY)
            ->postJson('/api/v1/tasks-projects/timer/start', ['task_id' => $there])
            ->assertCreated();

        self::assertSame(1, TimeEntry::query()->forCompany(self::COMPANY)->whereNotNull('running_user_id')->count());
        self::assertSame(1, TimeEntry::query()->forCompany(self::OTHER_COMPANY)->whereNotNull('running_user_id')->count());
    }

    public function test_the_timer_needs_the_own_time_ability(): void
    {
        $task = $this->taskOnProjectAt(6000);
        $this->authorization->deny(Authorizes::id(Abilities::VIEW_OWN_TIME));

        $this->asCompany(self::COMPANY)->getJson('/api/v1/tasks-projects/timer')->assertForbidden();
        $this->asCompany(self::COMPANY)->postJson('/api/v1/tasks-projects/timer/start', ['task_id' => $task])->assertForbidden();
        $this->asCompany(self::COMPANY)->postJson('/api/v1/tasks-projects/timer/stop')->assertForbidden();
        $this->asCompany(self::COMPANY)->deleteJson('/api/v1/tasks-projects/timer')->assertForbidden();
    }

    private function taskOnProjectAt(int $rate): int
    {
        $project = $this->makeProject(self::COMPANY, ['customer_id' => 42, 'default_rate' => $rate, 'currency_id' => 3]);

        return (int) $this->makeTask(self::COMPANY, ['project_id' => $project->id])->id;
    }
}
