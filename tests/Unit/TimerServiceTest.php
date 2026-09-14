<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Tests\Unit;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Modules\TasksProjects\Application\BoardOrderingService;
use Modules\TasksProjects\Application\Exceptions\TimerAlreadyRunning;
use Modules\TasksProjects\Application\ProjectService;
use Modules\TasksProjects\Application\RateResolver;
use Modules\TasksProjects\Application\TaskNumberSequence;
use Modules\TasksProjects\Application\TaskService;
use Modules\TasksProjects\Application\TaskStatusService;
use Modules\TasksProjects\Application\TimerService;
use Modules\TasksProjects\Models\TimeEntry;
use Modules\TasksProjects\Support\ModuleSettings;
use Modules\TasksProjects\Tests\TestCase;

final class TimerServiceTest extends TestCase
{
    private const COMPANY = 9;

    private const USER = 7;

    private TimerService $timer;

    protected function setUp(): void
    {
        parent::setUp();

        $this->timer = new TimerService(
            new TaskService(new TaskNumberSequence, new BoardOrderingService, new TaskStatusService, new ProjectService($this->companyData)),
            new RateResolver,
            $this->moduleSettings(),
        );
    }

    protected function tearDown(): void
    {
        TimeEntry::flushEventListeners();

        parent::tearDown();
    }

    public function test_nothing_is_running_until_the_user_starts_the_clock(): void
    {
        self::assertNull($this->timer->running(self::COMPANY, self::USER));
    }

    public function test_starting_opens_an_entry_with_no_end_and_no_time_on_it(): void
    {
        Carbon::setTestNow('2026-09-15 09:00:00');
        $project = $this->makeProject(self::COMPANY, ['currency_id' => 3]);
        $task = $this->makeTask(self::COMPANY, ['project_id' => $project->id]);

        $entry = $this->timer->start(self::COMPANY, self::USER, (int) $task->id, 'Pairing on the board');

        self::assertSame(self::USER, $entry->running_user_id);
        self::assertSame(self::USER, $entry->user_id);
        self::assertSame('2026-09-15 09:00:00', $entry->started_at?->toDateTimeString());
        self::assertNull($entry->ended_at);
        self::assertSame(0, $entry->duration_minutes);
        self::assertSame(0, $entry->amount);
        self::assertSame(3, $entry->currency_id);
        self::assertSame('Pairing on the board', $entry->description);
        self::assertTrue($entry->is($this->timer->running(self::COMPANY, self::USER)));
    }

    public function test_a_second_timer_for_the_same_user_is_refused(): void
    {
        $task = $this->makeTask(self::COMPANY);
        $this->timer->start(self::COMPANY, self::USER, (int) $task->id);

        $this->expectException(TimerAlreadyRunning::class);
        $this->expectExceptionMessage('User 7 already has a running timer in company 9.');

        $this->timer->start(self::COMPANY, self::USER, (int) $task->id);
    }

    public function test_two_users_and_two_companies_each_get_their_own_clock(): void
    {
        $task = $this->makeTask(self::COMPANY);
        $otherCompanyTask = $this->makeTask(10);

        $this->timer->start(self::COMPANY, self::USER, (int) $task->id);
        $this->timer->start(self::COMPANY, 8, (int) $task->id);
        $this->timer->start(10, self::USER, (int) $otherCompanyTask->id);

        self::assertSame(3, TimeEntry::query()->whereNotNull('running_user_id')->count());
    }

    public function test_a_timer_that_slips_past_the_check_is_still_refused_by_the_unique_index(): void
    {
        $task = $this->makeTask(self::COMPANY);
        $raced = false;

        TimeEntry::creating(function () use (&$raced): void {
            if ($raced) {
                return;
            }

            $raced = true;
            DB::table('tp_time_entries')->insert([
                'company_id' => self::COMPANY,
                'task_id' => 1,
                'user_id' => self::USER,
                'duration_minutes' => 0,
                'billable' => true,
                'rate' => 0,
                'amount' => 0,
                'running_user_id' => self::USER,
            ]);
        });

        $this->expectException(TimerAlreadyRunning::class);

        $this->timer->start(self::COMPANY, self::USER, (int) $task->id);
    }

    public function test_stopping_closes_the_entry_and_freezes_the_money(): void
    {
        $project = $this->makeProject(self::COMPANY, ['default_rate' => 6000]);
        $task = $this->makeTask(self::COMPANY, ['project_id' => $project->id]);

        Carbon::setTestNow('2026-09-15 09:00:00');
        $this->timer->start(self::COMPANY, self::USER, (int) $task->id);

        Carbon::setTestNow('2026-09-15 10:30:00');
        $entry = $this->timer->stop(self::COMPANY, self::USER);

        self::assertNull($entry->running_user_id);
        self::assertSame('2026-09-15 10:30:00', $entry->ended_at?->toDateTimeString());
        self::assertSame(90, $entry->duration_minutes);
        self::assertSame(6000, $entry->rate);
        self::assertSame(9000, $entry->amount);
        self::assertNull($this->timer->running(self::COMPANY, self::USER));
    }

    public function test_stopping_rounds_the_elapsed_time_to_the_company_increment(): void
    {
        $this->settings->putCompany(self::COMPANY, ModuleSettings::PREFIX.'rounding_minutes', 15);
        $task = $this->makeTask(self::COMPANY);

        Carbon::setTestNow('2026-09-15 09:00:00');
        $this->timer->start(self::COMPANY, self::USER, (int) $task->id);

        Carbon::setTestNow('2026-09-15 09:50:00');

        self::assertSame(45, $this->timer->stop(self::COMPANY, self::USER)->duration_minutes);
    }

    public function test_stopping_a_clock_that_is_not_running_is_refused(): void
    {
        $this->expectException(ModelNotFoundException::class);

        $this->timer->stop(self::COMPANY, self::USER);
    }

    public function test_discarding_throws_the_entry_away(): void
    {
        $task = $this->makeTask(self::COMPANY);
        $this->timer->start(self::COMPANY, self::USER, (int) $task->id);

        $this->timer->discard(self::COMPANY, self::USER);

        self::assertSame(0, TimeEntry::query()->forCompany(self::COMPANY)->count());
    }

    public function test_it_refuses_to_time_a_task_of_another_company(): void
    {
        $foreign = $this->makeTask(10);

        $this->expectException(ModelNotFoundException::class);

        $this->timer->start(self::COMPANY, self::USER, (int) $foreign->id);
    }
}
