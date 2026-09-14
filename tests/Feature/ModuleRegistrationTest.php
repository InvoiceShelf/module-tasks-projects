<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Tests\Feature;

use InvoiceShelf\Modules\Contracts\Host\SettingsStore;
use InvoiceShelf\Modules\Registry;
use Modules\TasksProjects\Lifecycle\DataCleanup;
use Modules\TasksProjects\Support\Abilities;
use Modules\TasksProjects\Support\ModuleRegistration;
use Modules\TasksProjects\Tests\TestCase;

final class ModuleRegistrationTest extends TestCase
{
    public function test_it_registers_a_local_script_style_sidebar_entry_and_settings_schema(): void
    {
        $modulePath = dirname(__DIR__, 2);

        ModuleRegistration::register($modulePath);

        self::assertSame(realpath($modulePath.'/dist/init.js'), Registry::scriptFor('tasks-projects'));
        self::assertSame(realpath($modulePath.'/dist/style.css'), Registry::styleFor('tasks-projects'));

        self::assertSame([
            'group' => 'modules',
            'group_label' => 'navigation.modules',
            'priority' => 100,
            'title' => 'tasksprojects::menu.title',
            'link' => '/admin/modules/tasks-projects',
            'icon' => 'ClipboardDocumentListIcon',
        ], Registry::menuFor('tasks-projects'));

        $settings = Registry::settingsFor('tasks-projects');

        self::assertNotNull($settings);
        self::assertSame(
            ['default_rate', 'rounding_minutes', 'week_start', 'members_see_all_time'],
            array_column($settings->fields(), 'key'),
        );
        self::assertSame(0, $settings->fields()[0]['default']);
        self::assertSame(1, $settings->fields()[1]['default']);
        self::assertSame(['1' => '1', '6' => '6', '15' => '15', '30' => '30'], $settings->fields()[1]['options']);
        self::assertSame(1, $settings->fields()[2]['default']);
        self::assertFalse($settings->fields()[3]['default']);
    }

    public function test_it_contributes_the_whole_ability_catalogue_namespaced_by_slug(): void
    {
        ModuleRegistration::register(dirname(__DIR__, 2));

        $abilities = Registry::abilitiesFor(Abilities::SLUG);

        self::assertSame([
            'tasks-projects:view-project',
            'tasks-projects:create-project',
            'tasks-projects:edit-project',
            'tasks-projects:delete-project',
            'tasks-projects:view-task',
            'tasks-projects:create-task',
            'tasks-projects:edit-task',
            'tasks-projects:delete-task',
            'tasks-projects:manage-task-status',
            'tasks-projects:view-own-time',
            'tasks-projects:view-all-time',
            'tasks-projects:edit-all-time',
            'tasks-projects:invoice-tasks',
        ], array_column($abilities, 'ability'));

        self::assertSame([
            'View projects',
            'Create projects',
            'Edit projects',
            'Delete projects',
            'View tasks',
            'Create tasks',
            'Edit tasks',
            'Delete tasks',
            'Manage task statuses',
            'View own time',
            'View all time',
            'Edit all time',
            'Invoice tasks',
        ], array_column($abilities, 'name'));
    }

    public function test_billing_depends_on_seeing_all_time_and_on_the_host_invoice_ability(): void
    {
        ModuleRegistration::register(dirname(__DIR__, 2));

        $abilities = array_column(Registry::abilitiesFor(Abilities::SLUG), 'depends_on', 'ability');

        self::assertSame(
            ['tasks-projects:view-all-time', 'create-invoice'],
            $abilities['tasks-projects:invoice-tasks'],
        );
        self::assertSame(
            ['tasks-projects:view-project', 'view-customer'],
            $abilities['tasks-projects:create-project'],
        );
        self::assertSame([], $abilities['tasks-projects:view-project']);
    }

    public function test_its_data_cleanup_deletes_every_company_setting_and_is_safe_to_repeat(): void
    {
        $settings = new class implements SettingsStore
        {
            /** @var list<string> */
            public array $removedCompanyKeys = [];

            public function getGlobal(string $key, mixed $default = null): mixed
            {
                return $default;
            }

            public function putGlobal(string $key, mixed $value): void {}

            public function deleteGlobal(string $key): void {}

            public function getCompany(int $companyId, string $key, mixed $default = null): mixed
            {
                return $default;
            }

            public function putCompany(int $companyId, string $key, mixed $value): void {}

            public function deleteCompany(int $companyId, string $key): void {}

            public function deleteCompanyForAll(string $key): void
            {
                $this->removedCompanyKeys[] = $key;
            }
        };

        $cleanup = new DataCleanup($settings);

        $cleanup->cleanup();
        $cleanup->cleanup();

        self::assertSame([
            'module.tasks-projects.default_rate',
            'module.tasks-projects.rounding_minutes',
            'module.tasks-projects.week_start',
            'module.tasks-projects.members_see_all_time',
            'module.tasks-projects.default_rate',
            'module.tasks-projects.rounding_minutes',
            'module.tasks-projects.week_start',
            'module.tasks-projects.members_see_all_time',
        ], $settings->removedCompanyKeys);
    }
}
