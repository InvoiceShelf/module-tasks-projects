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

        // TODO(sdk-3.4): register abilities via Registry::registerAbility once the
        // host ability catalogue is open to modules. Until then the module gates
        // through Contracts\Host\ModuleAuthorization against existing host
        // abilities; see Modules\TasksProjects\Support\Abilities.
    }
}
