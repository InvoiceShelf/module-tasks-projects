<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Http\Requests;

use Modules\TasksProjects\Application\BillingService;

final class PrepareInvoiceRequest extends ModuleRequest
{
    /** @return array<string, list<string>> */
    public function rules(): array
    {
        return [
            'entry_ids' => ['required', 'array', 'min:1'],
            'entry_ids.*' => ['integer', 'min:1'],
            'grouping' => ['required', 'string', 'in:'.implode(',', BillingService::GROUPINGS)],
        ];
    }
}
