<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Modules\TasksProjects\Application\BillingService;
use Modules\TasksProjects\Http\Requests\ConfirmInvoiceRequest;
use Modules\TasksProjects\Http\Requests\PrepareInvoiceRequest;
use Modules\TasksProjects\Http\Requests\UnbilledCustomersRequest;
use Modules\TasksProjects\Http\Requests\UnbilledTimeRequest;
use Modules\TasksProjects\Support\Abilities;
use Modules\TasksProjects\Support\Authorizes;

/**
 * Turning unbilled time into invoice lines, in two steps.
 *
 * `prepare` returns the body the host invoice endpoint expects; the browser
 * posts it with the session's own client, so the module never writes to the
 * host invoice tables, and hands the ids back to `confirm`, which stamps the
 * entries and is safe to repeat.
 */
final class BillingController extends Controller
{
    public function __construct(Authorizes $authorizes, private readonly BillingService $billing)
    {
        parent::__construct($authorizes);
    }

    /**
     * Who has unbilled time, before the wizard asks for anyone's entries.
     *
     * One row per customer and currency, so the first step can be a list of
     * people worth invoicing rather than a customer picker over the whole
     * address book.
     */
    public function customers(UnbilledCustomersRequest $request): JsonResponse
    {
        $context = $this->context($request);
        $this->authorize($context, Abilities::INVOICE_TASKS);

        $filters = $request->validated();

        return response()->json(['data' => $this->billing->customers(
            $context->companyId,
            $filters['from'] ?? null,
            $filters['to'] ?? null,
        )]);
    }

    public function unbilled(UnbilledTimeRequest $request): JsonResponse
    {
        $context = $this->context($request);
        $this->authorize($context, Abilities::INVOICE_TASKS);

        $filters = $request->validated();

        return response()->json(['data' => $this->billing->unbilled(
            $context->companyId,
            (int) $filters['customer_id'],
            $filters['from'] ?? null,
            $filters['to'] ?? null,
        )]);
    }

    /**
     * The body the browser posts to the host invoice endpoint.
     *
     * Zero fractions are preserved so `quantity` stays the two-decimal number
     * of hours the preview showed, rather than collapsing to an integer on the
     * way out.
     */
    public function prepare(PrepareInvoiceRequest $request): JsonResponse
    {
        $context = $this->context($request);
        $this->authorize($context, Abilities::INVOICE_TASKS);

        $validated = $request->validated();

        $payload = $this->billing->prepare(
            $context->companyId,
            array_map(intval(...), $validated['entry_ids']),
            $validated['grouping'],
        );

        return response()->json(['data' => $payload], 200, [], JSON_PRESERVE_ZERO_FRACTION);
    }

    /** Stamp the entries with the invoice and line ids the host handed back. */
    public function confirm(ConfirmInvoiceRequest $request): JsonResponse
    {
        $context = $this->context($request);
        $this->authorize($context, Abilities::INVOICE_TASKS);

        $validated = $request->validated();

        $items = array_map(static fn (array $item): array => [
            'invoice_item_id' => (int) $item['invoice_item_id'],
            'entry_ids' => array_map(intval(...), $item['entry_ids']),
        ], $validated['items']);

        return response()->json([
            'stamped' => $this->billing->confirm($context->companyId, (int) $validated['invoice_id'], $items),
        ]);
    }
}
