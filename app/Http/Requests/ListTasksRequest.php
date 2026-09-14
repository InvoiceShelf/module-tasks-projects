<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Http\Requests;

final class ListTasksRequest extends ModuleRequest
{
    /** @return array<string, list<string>> */
    public function rules(): array
    {
        return [
            'project_id' => ['sometimes', 'integer', 'min:1'],
            'assignee_id' => ['sometimes', 'integer', 'min:1'],
            'task_status_id' => ['sometimes', 'integer', 'min:1'],
            'customer_id' => ['sometimes', 'integer', 'min:1'],
            'due_before' => ['sometimes', 'date'],
            'due_after' => ['sometimes', 'date'],
            'search' => ['sometimes', 'string', 'max:255'],
        ];
    }
}
