<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Modules\TasksProjects\Application\TaskService;
use Modules\TasksProjects\Http\Requests\ListTasksRequest;
use Modules\TasksProjects\Http\Requests\MoveTaskRequest;
use Modules\TasksProjects\Http\Requests\StoreTaskRequest;
use Modules\TasksProjects\Http\Requests\UpdateTaskRequest;
use Modules\TasksProjects\Http\Resources\TaskResource;
use Modules\TasksProjects\Support\Abilities;
use Modules\TasksProjects\Support\Authorizes;

final class TasksController extends Controller
{
    public function __construct(Authorizes $authorizes, private readonly TaskService $tasks)
    {
        parent::__construct($authorizes);
    }

    public function index(ListTasksRequest $request): AnonymousResourceCollection
    {
        $context = $this->context($request);
        $this->authorize($context, Abilities::VIEW_TASK);

        $filters = $request->validated();
        $tasks = $this->tasks->listFor($context->companyId, array_filter([
            'project_id' => isset($filters['project_id']) ? (int) $filters['project_id'] : null,
            'assignee_id' => isset($filters['assignee_id']) ? (int) $filters['assignee_id'] : null,
            'task_status_id' => isset($filters['task_status_id']) ? (int) $filters['task_status_id'] : null,
            'customer_id' => isset($filters['customer_id']) ? (int) $filters['customer_id'] : null,
            'due_before' => $filters['due_before'] ?? null,
            'due_after' => $filters['due_after'] ?? null,
            'search' => $filters['search'] ?? null,
        ], static fn (mixed $value): bool => $value !== null));

        return TaskResource::collection($this->paginate($tasks, $request));
    }

    public function store(StoreTaskRequest $request): TaskResource
    {
        $context = $this->context($request);
        $this->authorize($context, Abilities::CREATE_TASK);

        return new TaskResource($this->tasks->create(
            $context->companyId,
            $request->validated() + ['creator_id' => $context->userId],
        ));
    }

    public function show(Request $request, int $id): TaskResource
    {
        $context = $this->context($request);
        $this->authorize($context, Abilities::VIEW_TASK);

        return new TaskResource($this->tasks->findForCompany($context->companyId, $id));
    }

    public function update(UpdateTaskRequest $request, int $id): TaskResource
    {
        $context = $this->context($request);
        $this->authorize($context, Abilities::EDIT_TASK);

        return new TaskResource($this->tasks->update($context->companyId, $id, $request->validated()));
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $context = $this->context($request);
        $this->authorize($context, Abilities::DELETE_TASK);

        $this->tasks->delete($context->companyId, $id);

        return response()->json(['success' => true]);
    }

    /** Drop a task between two neighbours of the target column. */
    public function move(MoveTaskRequest $request, int $id): TaskResource
    {
        $context = $this->context($request);
        $this->authorize($context, Abilities::EDIT_TASK);

        $validated = $request->validated();

        return new TaskResource($this->tasks->move(
            $context->companyId,
            $id,
            (int) $validated['task_status_id'],
            isset($validated['before_id']) ? (int) $validated['before_id'] : null,
            isset($validated['after_id']) ? (int) $validated['after_id'] : null,
        ));
    }
}
