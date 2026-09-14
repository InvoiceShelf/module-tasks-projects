<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Tests;

use Illuminate\Support\Carbon;
use InvoiceShelf\Modules\Contracts\Host\CompanyDataReader;
use InvoiceShelf\Modules\Contracts\Host\ModuleAuthorization;
use InvoiceShelf\Modules\Contracts\Host\SettingsStore;
use InvoiceShelf\Modules\InvoiceShelfModulesServiceProvider;
use InvoiceShelf\Modules\Registry;
use Modules\TasksProjects\Models\Project;
use Modules\TasksProjects\Models\ProjectMember;
use Modules\TasksProjects\Models\Task;
use Modules\TasksProjects\Models\TaskStatus;
use Modules\TasksProjects\Models\TimeEntry;
use Modules\TasksProjects\Support\ModuleSettings;
use Modules\TasksProjects\Tests\Support\MemoryCompanyDataReader;
use Modules\TasksProjects\Tests\Support\MemorySettingsStore;
use Modules\TasksProjects\Tests\Support\RecordingAuthorization;
use Orchestra\Testbench\TestCase as Orchestra;

abstract class TestCase extends Orchestra
{
    protected MemorySettingsStore $settings;

    protected MemoryCompanyDataReader $companyData;

    protected RecordingAuthorization $authorization;

    protected function setUp(): void
    {
        parent::setUp();

        $this->settings = new MemorySettingsStore;
        $this->companyData = new MemoryCompanyDataReader;
        $this->authorization = new RecordingAuthorization;

        $this->app->instance(SettingsStore::class, $this->settings);
        $this->app->instance(CompanyDataReader::class, $this->companyData);
        $this->app->instance(ModuleAuthorization::class, $this->authorization);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        Registry::flush();

        parent::tearDown();
    }

    /** @return list<class-string> */
    protected function getPackageProviders($app): array
    {
        return [InvoiceShelfModulesServiceProvider::class];
    }

    protected function getEnvironmentSetUp($app): void
    {
        $app['config']->set('app.key', 'base64:'.base64_encode(str_repeat('a', 32)));
        $app['config']->set('database.default', 'testing');
        $app['config']->set('database.connections.testing', [
            'driver' => 'sqlite',
            'database' => ':memory:',
            'prefix' => '',
            'foreign_key_constraints' => true,
        ]);
    }

    protected function defineDatabaseMigrations(): void
    {
        $this->loadMigrationsFrom(dirname(__DIR__).'/database/migrations');
    }

    protected function moduleSettings(): ModuleSettings
    {
        return new ModuleSettings($this->settings);
    }

    /** @param array<string, mixed> $attributes */
    protected function makeStatus(int $companyId, array $attributes = []): TaskStatus
    {
        return TaskStatus::query()->create($attributes + [
            'company_id' => $companyId,
            'name' => 'Backlog',
            'position' => 1,
            'is_default' => true,
            'is_closed' => false,
        ]);
    }

    /** @param array<string, mixed> $attributes */
    protected function makeProject(int $companyId, array $attributes = []): Project
    {
        return Project::query()->create($attributes + [
            'company_id' => $companyId,
            'name' => 'Website redesign',
            'status' => Project::STATUS_ACTIVE,
        ]);
    }

    protected function makeMember(int $companyId, int $projectId, int $userId, ?int $rate = null): ProjectMember
    {
        return ProjectMember::query()->create([
            'company_id' => $companyId,
            'project_id' => $projectId,
            'user_id' => $userId,
            'rate' => $rate,
        ]);
    }

    /** @param array<string, mixed> $attributes */
    protected function makeTask(int $companyId, array $attributes = []): Task
    {
        $statusId = $attributes['task_status_id'] ?? $this->makeStatus($companyId)->id;
        unset($attributes['task_status_id']);

        return Task::query()->create($attributes + [
            'company_id' => $companyId,
            'task_status_id' => $statusId,
            'number' => (int) Task::query()->forCompany($companyId)->max('number') + 1,
            'name' => 'Build the landing page',
            'billable' => true,
            'board_position' => '1024.0000000000',
        ]);
    }

    /** @param array<string, mixed> $attributes */
    protected function makeEntry(int $companyId, int $taskId, array $attributes = []): TimeEntry
    {
        return TimeEntry::query()->create($attributes + [
            'company_id' => $companyId,
            'task_id' => $taskId,
            'user_id' => 7,
            'started_at' => Carbon::parse('2026-09-01 09:00:00'),
            'ended_at' => Carbon::parse('2026-09-01 10:00:00'),
            'duration_minutes' => 60,
            'billable' => true,
            'rate' => 10000,
            'amount' => 10000,
        ]);
    }
}
