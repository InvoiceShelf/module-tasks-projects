<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\TasksProjects\Application\TimerService;
use Modules\TasksProjects\Http\Requests\StartTimerRequest;
use Modules\TasksProjects\Http\Resources\TimeEntryResource;
use Modules\TasksProjects\Support\Abilities;
use Modules\TasksProjects\Support\Authorizes;

/**
 * The caller's own running timer, one per company.
 *
 * A second start is a conflict rather than a validation error, because the
 * first timer is still perfectly valid; the UI offers to stop it.
 */
final class TimerController extends Controller
{
    public function __construct(Authorizes $authorizes, private readonly TimerService $timer)
    {
        parent::__construct($authorizes);
    }

    /** The running entry, or a null payload when the clock is not running. */
    public function show(Request $request): JsonResponse
    {
        $context = $this->context($request);
        $this->authorize($context, Abilities::VIEW_OWN_TIME);

        $entry = $this->timer->running($context->companyId, $context->userId);

        return response()->json([
            'data' => $entry === null ? null : TimeEntryResource::make($entry)->resolve($request),
        ]);
    }

    public function start(StartTimerRequest $request): TimeEntryResource
    {
        $context = $this->context($request);
        $this->authorize($context, Abilities::VIEW_OWN_TIME);

        $validated = $request->validated();

        return new TimeEntryResource($this->timer->start(
            $context->companyId,
            $context->userId,
            (int) $validated['task_id'],
            $validated['description'] ?? null,
        ));
    }

    public function stop(Request $request): TimeEntryResource
    {
        $context = $this->context($request);
        $this->authorize($context, Abilities::VIEW_OWN_TIME);

        return new TimeEntryResource($this->timer->stop($context->companyId, $context->userId));
    }

    /** Throw the running entry away without recording any time. */
    public function destroy(Request $request): JsonResponse
    {
        $context = $this->context($request);
        $this->authorize($context, Abilities::VIEW_OWN_TIME);

        $this->timer->discard($context->companyId, $context->userId);

        return response()->json(['success' => true]);
    }
}
