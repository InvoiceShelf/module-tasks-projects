<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\TasksProjects\Support\Abilities;
use Modules\TasksProjects\Support\Authorizes;
use Modules\TasksProjects\Support\ModuleSettings;

/**
 * The module's per-company settings, typed for the UI.
 *
 * Reading only. Writes go through the host's own module settings endpoint,
 * which validates against the schema the module registered, so there is no
 * second place where a setting can be written.
 */
final class SettingsController extends Controller
{
    public function __construct(Authorizes $authorizes, private readonly ModuleSettings $settings)
    {
        parent::__construct($authorizes);
    }

    public function __invoke(Request $request): JsonResponse
    {
        $context = $this->context($request);
        $this->authorize($context, Abilities::VIEW_PROJECT);

        return response()->json(['data' => [
            'default_rate' => $this->settings->defaultRate($context->companyId),
            'rounding_minutes' => $this->settings->roundingMinutes($context->companyId),
            'week_start' => $this->settings->weekStart($context->companyId),
            'members_see_all_time' => $this->settings->membersSeeAllTime($context->companyId),
            'rounding_increments' => ModuleSettings::ROUNDING_INCREMENTS,
        ]]);
    }
}
