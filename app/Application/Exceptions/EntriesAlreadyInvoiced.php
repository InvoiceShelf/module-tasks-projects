<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Application\Exceptions;

/** Time entries that already carry an invoice can never be re-billed or deleted. */
final class EntriesAlreadyInvoiced extends TasksProjectsException
{
    /** @param list<int> $entryIds */
    public static function forEntries(array $entryIds): self
    {
        return new self('Time entries '.implode(', ', $entryIds).' are already on an invoice.');
    }

    public static function forEntry(int $entryId): self
    {
        return self::forEntries([$entryId]);
    }

    public static function forOtherInvoice(int $entryId, int $invoiceId): self
    {
        return new self("Time entry {$entryId} is already stamped with invoice {$invoiceId}.");
    }
}
