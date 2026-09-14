<?php

use Illuminate\Support\Facades\Route;

Route::prefix('api/v1/tasks-projects')->middleware(['api', 'auth:sanctum', 'company', 'bouncer'])->group(function (): void {
    // Routes are added in the backend milestone (M3). See specs/tasks-projects.md "API surface".
});
