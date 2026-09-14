<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Application\Exceptions;

use RuntimeException;

/** Base class for every domain rule the module refuses to break. */
abstract class TasksProjectsException extends RuntimeException {}
