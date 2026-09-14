<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Tests;

use InvoiceShelf\Modules\InvoiceShelfModulesServiceProvider;
use InvoiceShelf\Modules\Registry;
use Orchestra\Testbench\TestCase as Orchestra;

abstract class TestCase extends Orchestra
{
    /** @return list<class-string> */
    protected function getPackageProviders($app): array
    {
        return [InvoiceShelfModulesServiceProvider::class];
    }

    protected function tearDown(): void
    {
        Registry::flush();

        parent::tearDown();
    }
}
