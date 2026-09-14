<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Modules\TasksProjects\Application\BoardQuery;
use Modules\TasksProjects\Application\TaskStatusService;
use Modules\TasksProjects\Http\Requests\BoardRequest;
use Modules\TasksProjects\Http\Resources\TaskResource;
use Modules\TasksProjects\Http\Resources\TaskStatusResource;
use Modules\TasksProjects\Support\Abilities;
use Modules\TasksProjects\Support\Authorizes;

/**
 * The whole board in one response: every column of the company, each with its
 * tasks in board order.
 *
 * A company that has never opened the board has no columns yet, so the four
 * defaults are created before the first read.
 */
final class BoardController extends Controller
{
    public function __construct(
        Authorizes $authorizes,
        private readonly BoardQuery $board,
        private readonly TaskStatusService $statuses,
    ) {
        parent::__construct($authorizes);
    }

    public function __invoke(BoardRequest $request): JsonResponse
    {
        $context = $this->context($request);
        $this->authorize($context, Abilities::VIEW_TASK);

        $this->statuses->ensureDefaults($context->companyId);

        $filters = $request->validated();
        $columns = $this->board->columns(
            $context->companyId,
            isset($filters['project_id']) ? (int) $filters['project_id'] : null,
            isset($filters['assignee_id']) ? (int) $filters['assignee_id'] : null,
        );

        return response()->json(['data' => array_map(static fn (array $column): array => [
            'status' => TaskStatusResource::make($column['status'])->resolve($request),
            'tasks' => TaskResource::collection($column['tasks'])->resolve($request),
        ], $columns)]);
    }
}
