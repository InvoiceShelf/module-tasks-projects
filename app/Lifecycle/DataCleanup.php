<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Lifecycle;

use InvoiceShelf\Modules\Contracts\DataCleanup as DataCleanupContract;
use InvoiceShelf\Modules\Contracts\Host\SettingsStore;

/** Removes the module's per-company settings when the host asks to remove module data. */
final class DataCleanup implements DataCleanupContract
{
    /** Keys stored under `module.tasks-projects.<key>` for each company. */
    private const SETTING_KEYS = [
        'default_rate',
        'rounding_minutes',
        'week_start',
        'members_see_all_time',
    ];

    public function __construct(private readonly SettingsStore $settings) {}

    public function cleanup(): void
    {
        foreach (self::SETTING_KEYS as $key) {
            $this->settings->deleteCompanyForAll('module.tasks-projects.'.$key);
        }
    }
}
