<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Providers;

use Illuminate\Contracts\Foundation\Application;
use InvoiceShelf\Modules\Contracts\DataCleanup;
use InvoiceShelf\Modules\Contracts\Host\SettingsStore;
use InvoiceShelf\Modules\Support\ModuleServiceProvider;
use Modules\TasksProjects\Lifecycle\DataCleanup as TasksProjectsDataCleanup;
use Modules\TasksProjects\Support\ModuleRegistration;

/**
 * Official Tasks, Projects and Time Tracking module for InvoiceShelf.
 */
class TasksProjectsServiceProvider extends ModuleServiceProvider
{
    protected string $name = 'TasksProjects';

    protected string $nameLower = 'tasksprojects';

    public function register(): void
    {
        parent::register();

        $this->app->bind(DataCleanup::class, fn (Application $app): DataCleanup => new TasksProjectsDataCleanup(
            $app->make(SettingsStore::class),
        ));
    }

    public function boot(): void
    {
        parent::boot();

        $modulePath = module_path($this->name);

        ModuleRegistration::register($modulePath);

        $this->loadRoutesFrom($modulePath.'/routes/api.php');
    }
}
