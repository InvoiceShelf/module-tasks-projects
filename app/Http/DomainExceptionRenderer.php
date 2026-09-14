<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Http;

use Illuminate\Foundation\Exceptions\Handler;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Modules\TasksProjects\Application\Exceptions\TasksProjectsException;
use Modules\TasksProjects\Application\Exceptions\TimerAlreadyRunning;
use Symfony\Component\HttpFoundation\Response;

/**
 * One place where a broken domain rule becomes an HTTP response.
 *
 * Every rule the services refuse to break extends TasksProjectsException, so a
 * single renderable covers all of them and no controller needs a try/catch. The
 * body carries the human message and a stable snake_case key derived from the
 * exception class, which is what the UI switches on.
 */
final class DomainExceptionRenderer
{
    /** Statuses that are not the 422 default. */
    private const STATUSES = [
        TimerAlreadyRunning::class => Response::HTTP_CONFLICT,
    ];

    public static function register(Handler $handler): void
    {
        $handler->renderable(static fn (TasksProjectsException $exception): JsonResponse => self::render($exception));
    }

    public static function render(TasksProjectsException $exception): JsonResponse
    {
        return new JsonResponse([
            'message' => $exception->getMessage(),
            'error' => self::errorKey($exception),
        ], self::STATUSES[$exception::class] ?? Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /** `TimerAlreadyRunning` becomes `timer_already_running`. */
    public static function errorKey(TasksProjectsException $exception): string
    {
        return Str::snake(class_basename($exception));
    }
}
