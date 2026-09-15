<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Http\Requests;

/** Starting the clock from a task row: the task is the URL, the note is the body. */
final class StartTaskTimerRequest extends ModuleRequest
{
    /** @return array<string, list<string>> */
    public function rules(): array
    {
        return [
            'description' => ['sometimes', 'nullable', 'string'],
        ];
    }
}
