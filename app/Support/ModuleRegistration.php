<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Support;

use InvoiceShelf\Modules\Registry;

final class ModuleRegistration
{
    public static function register(string $modulePath): void
    {
        Registry::registerScript('tasks-projects', $modulePath.'/dist/init.js');
        Registry::registerStyle('tasks-projects', $modulePath.'/dist/style.css');

        Registry::registerMenu('tasks-projects', [
            'title' => 'tasksprojects::menu.title',
            'link' => '/admin/modules/tasks-projects',
            'icon' => 'ClipboardDocumentListIcon',
            // Lower sorts first within the sidebar group; official modules use 10, 20, ...
            'priority' => 10,
        ]);

        Registry::registerSettings('tasks-projects', [
            'sections' => [
                [
                    'title' => 'tasksprojects::settings.general_section',
                    'fields' => [
                        [
                            'key' => 'default_rate',
                            'type' => 'number',
                            'label' => 'tasksprojects::settings.default_rate',
                            'default' => 0,
                            'rules' => ['integer', 'min:0'],
                        ],
                        [
                            'key' => 'rounding_minutes',
                            'type' => 'select',
                            'label' => 'tasksprojects::settings.rounding_minutes',
                            'default' => 1,
                            'options' => [
                                1 => '1',
                                6 => '6',
                                15 => '15',
                                30 => '30',
                            ],
                        ],
                        [
                            'key' => 'week_start',
                            'type' => 'select',
                            'label' => 'tasksprojects::settings.week_start',
                            'default' => 1,
                            'options' => [
                                0 => 'Sunday',
                                1 => 'Monday',
                                2 => 'Tuesday',
                                3 => 'Wednesday',
                                4 => 'Thursday',
                                5 => 'Friday',
                                6 => 'Saturday',
                            ],
                        ],
                        [
                            'key' => 'members_see_all_time',
                            'type' => 'switch',
                            'label' => 'tasksprojects::settings.members_see_all_time',
                            'default' => false,
                        ],
                    ],
                ],
            ],
        ]);

        self::registerAbilities();
    }

    /**
     * Contribute the module's ability catalogue to the host role editor.
     *
     * The registry namespaces every name as `tasks-projects:{ability}`, so the
     * ids below can never collide with a host ability. Dependencies on a host
     * ability stay bare; dependencies on a module ability are namespaced with
     * Registry::abilityId(). See specs/tasks-projects.md "Authorization".
     */
    private static function registerAbilities(): void
    {
        $viewProject = Registry::abilityId(Abilities::SLUG, Abilities::VIEW_PROJECT);
        $viewTask = Registry::abilityId(Abilities::SLUG, Abilities::VIEW_TASK);
        $viewOwnTime = Registry::abilityId(Abilities::SLUG, Abilities::VIEW_OWN_TIME);
        $viewAllTime = Registry::abilityId(Abilities::SLUG, Abilities::VIEW_ALL_TIME);

        $abilities = [
            [Abilities::VIEW_PROJECT, 'View projects', []],
            [Abilities::CREATE_PROJECT, 'Create projects', [$viewProject, Abilities::HOST_VIEW_CUSTOMER]],
            [Abilities::EDIT_PROJECT, 'Edit projects', [$viewProject, Abilities::HOST_VIEW_CUSTOMER]],
            [Abilities::DELETE_PROJECT, 'Delete projects', [$viewProject]],
            [Abilities::VIEW_TASK, 'View tasks', [$viewProject]],
            [Abilities::CREATE_TASK, 'Create tasks', [$viewTask]],
            [Abilities::EDIT_TASK, 'Edit tasks', [$viewTask]],
            [Abilities::DELETE_TASK, 'Delete tasks', [$viewTask]],
            [Abilities::MANAGE_TASK_STATUS, 'Manage task statuses', [$viewTask]],
            [Abilities::VIEW_OWN_TIME, 'View own time', []],
            [Abilities::VIEW_ALL_TIME, 'View all time', [$viewOwnTime]],
            [Abilities::EDIT_ALL_TIME, 'Edit all time', [$viewAllTime]],
            [Abilities::INVOICE_TASKS, 'Invoice tasks', [$viewAllTime, Abilities::HOST_CREATE_INVOICE]],
        ];

        foreach ($abilities as [$ability, $name, $dependsOn]) {
            Registry::registerAbility(Abilities::SLUG, [
                'ability' => $ability,
                'name' => $name,
                'depends_on' => $dependsOn,
            ]);
        }
    }
}
