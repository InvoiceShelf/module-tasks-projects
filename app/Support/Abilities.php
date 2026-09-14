<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Support;

/**
 * Namespaced ability identifiers for the Tasks and Projects module.
 *
 * These are not yet registered with the host's ability catalogue: v1 gates
 * through `InvoiceShelf\Modules\Contracts\Host\ModuleAuthorization` against
 * existing host abilities (`view`/`create` on `customer` and `invoice`).
 * These constants document the intended catalogue for when
 * `Registry::registerAbility()` lands. See module-tasks-projects.md
 * "Authorization".
 */
final class Abilities
{
    public const SLUG = 'tasks-projects';

    public const VIEW_PROJECT = 'tasks-projects:view-project';

    public const CREATE_PROJECT = 'tasks-projects:create-project';

    public const EDIT_PROJECT = 'tasks-projects:edit-project';

    public const DELETE_PROJECT = 'tasks-projects:delete-project';

    public const VIEW_TASK = 'tasks-projects:view-task';

    public const CREATE_TASK = 'tasks-projects:create-task';

    public const EDIT_TASK = 'tasks-projects:edit-task';

    public const DELETE_TASK = 'tasks-projects:delete-task';

    public const MANAGE_TASK_STATUS = 'tasks-projects:manage-task-status';

    public const VIEW_OWN_TIME = 'tasks-projects:view-own-time';

    public const VIEW_ALL_TIME = 'tasks-projects:view-all-time';

    public const EDIT_ALL_TIME = 'tasks-projects:edit-all-time';

    public const INVOICE_TASKS = 'tasks-projects:invoice-tasks';
}
