<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Application;

use InvalidArgumentException;
use Modules\TasksProjects\Support\ModuleSettings;

/**
 * Billing increments, applied when a time entry is saved rather than when it is
 * invoiced, so what the user sees on the timesheet is what gets billed.
 */
final class Rounding
{
    /**
     * Round a duration to the nearest multiple of the increment.
     *
     * Zero stays zero, because an entry with no time is not worth an increment.
     * Anything above zero but below one increment rounds up: a two minute call
     * on a fifteen minute increment bills a quarter of an hour, never nothing.
     */
    public static function roundMinutes(int $minutes, int $increment): int
    {
        if (! in_array($increment, ModuleSettings::ROUNDING_INCREMENTS, true)) {
            throw new InvalidArgumentException(
                "Rounding increment {$increment} is not one of ".implode(', ', ModuleSettings::ROUNDING_INCREMENTS).'.',
            );
        }

        if ($minutes <= 0) {
            return 0;
        }

        if ($minutes < $increment) {
            return $increment;
        }

        return (int) round($minutes / $increment) * $increment;
    }
}
