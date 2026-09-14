<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Support;

use InvoiceShelf\Modules\Contracts\Host\SettingsStore;

/**
 * Typed reader for the module's per-company settings.
 *
 * Values live in the host settings store under `module.tasks-projects.<key>`
 * and come back as whatever the host wrote, so every getter coerces and clamps
 * rather than trusting the stored type.
 */
final class ModuleSettings
{
    public const PREFIX = 'module.tasks-projects.';

    /** @var list<int> */
    public const ROUNDING_INCREMENTS = [1, 6, 15, 30];

    public const DEFAULT_ROUNDING_MINUTES = 1;

    public const DEFAULT_WEEK_START = 1;

    public function __construct(private readonly SettingsStore $settings) {}

    /** Company default hourly rate, in minor units per hour. */
    public function defaultRate(int $companyId): int
    {
        $rate = (int) $this->read($companyId, 'default_rate', 0);

        return max(0, $rate);
    }

    /** Billing increment applied when a time entry is saved. */
    public function roundingMinutes(int $companyId): int
    {
        $minutes = (int) $this->read($companyId, 'rounding_minutes', self::DEFAULT_ROUNDING_MINUTES);

        return in_array($minutes, self::ROUNDING_INCREMENTS, true) ? $minutes : self::DEFAULT_ROUNDING_MINUTES;
    }

    /** First day of the timesheet week, 0 (Sunday) through 6 (Saturday). */
    public function weekStart(int $companyId): int
    {
        $day = (int) $this->read($companyId, 'week_start', self::DEFAULT_WEEK_START);

        return $day >= 0 && $day <= 6 ? $day : self::DEFAULT_WEEK_START;
    }

    /** Whether members without the view-all-time ability still see other members' time. */
    public function membersSeeAllTime(int $companyId): bool
    {
        $value = $this->read($companyId, 'members_see_all_time', false);

        if (is_string($value)) {
            return in_array(strtoupper($value), ['YES', 'TRUE', '1'], true);
        }

        return (bool) $value;
    }

    private function read(int $companyId, string $key, mixed $default): mixed
    {
        $value = $this->settings->getCompany($companyId, self::PREFIX.$key, $default);

        return $value ?? $default;
    }
}
