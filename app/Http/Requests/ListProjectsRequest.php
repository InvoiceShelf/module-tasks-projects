<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Http\Requests;

use Modules\TasksProjects\Models\Project;

final class ListProjectsRequest extends ModuleRequest
{
    /** @return array<string, list<string>> */
    public function rules(): array
    {
        return [
            'status' => ['sometimes', 'string', 'in:'.Project::STATUS_ACTIVE.','.Project::STATUS_ARCHIVED],
            'customer_id' => ['sometimes', 'integer', 'min:1'],
            'member_id' => ['sometimes', 'integer', 'min:1'],
            'search' => ['sometimes', 'string', 'max:255'],
        ];
    }
}
