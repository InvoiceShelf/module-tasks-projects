<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Application\Exceptions;

/** One invoice covers one customer in one currency. */
final class MixedBillingSelection extends TasksProjectsException
{
    /** @param list<int|string> $customerIds */
    public static function customers(array $customerIds): self
    {
        return new self('The selected time entries belong to more than one customer: '.implode(', ', $customerIds).'.');
    }

    /** @param list<int|string> $currencyIds */
    public static function currencies(array $currencyIds): self
    {
        return new self('The selected time entries use more than one currency: '.implode(', ', $currencyIds).'.');
    }

    public static function empty(): self
    {
        return new self('No time entries were selected.');
    }
}
