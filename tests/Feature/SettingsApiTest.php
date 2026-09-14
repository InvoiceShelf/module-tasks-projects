<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Tests\Feature;

use Modules\TasksProjects\Support\Abilities;
use Modules\TasksProjects\Support\Authorizes;
use Modules\TasksProjects\Support\ModuleSettings;
use Modules\TasksProjects\Tests\TestCase;

final class SettingsApiTest extends TestCase
{
    private const COMPANY = 9;

    public function test_a_company_that_has_never_saved_a_setting_gets_the_defaults(): void
    {
        $response = $this->asCompany(self::COMPANY)->getJson('/api/v1/tasks-projects/settings');

        $response->assertOk();
        $response->assertExactJson(['data' => [
            'default_rate' => 0,
            'rounding_minutes' => ModuleSettings::DEFAULT_ROUNDING_MINUTES,
            'week_start' => ModuleSettings::DEFAULT_WEEK_START,
            'members_see_all_time' => false,
            'rounding_increments' => ModuleSettings::ROUNDING_INCREMENTS,
        ]]);
    }

    public function test_stored_values_come_back_typed_whatever_the_host_wrote(): void
    {
        $this->settings->putCompany(self::COMPANY, ModuleSettings::PREFIX.'default_rate', '12000');
        $this->settings->putCompany(self::COMPANY, ModuleSettings::PREFIX.'rounding_minutes', '15');
        $this->settings->putCompany(self::COMPANY, ModuleSettings::PREFIX.'week_start', '0');
        $this->settings->putCompany(self::COMPANY, ModuleSettings::PREFIX.'members_see_all_time', 'YES');

        $response = $this->asCompany(self::COMPANY)->getJson('/api/v1/tasks-projects/settings');

        $response->assertOk();
        $response->assertJsonPath('data.default_rate', 12000);
        $response->assertJsonPath('data.rounding_minutes', 15);
        $response->assertJsonPath('data.week_start', 0);
        $response->assertJsonPath('data.members_see_all_time', true);
    }

    public function test_an_unusable_stored_value_falls_back_to_the_default(): void
    {
        $this->settings->putCompany(self::COMPANY, ModuleSettings::PREFIX.'rounding_minutes', 7);

        $this->asCompany(self::COMPANY)
            ->getJson('/api/v1/tasks-projects/settings')
            ->assertJsonPath('data.rounding_minutes', ModuleSettings::DEFAULT_ROUNDING_MINUTES);
    }

    public function test_settings_are_per_company(): void
    {
        $this->settings->putCompany(self::COMPANY, ModuleSettings::PREFIX.'default_rate', 12000);

        $this->asCompany(10)
            ->getJson('/api/v1/tasks-projects/settings')
            ->assertJsonPath('data.default_rate', 0);
    }

    public function test_reading_the_settings_needs_the_project_view_ability(): void
    {
        $this->authorization->deny(Authorizes::id(Abilities::VIEW_PROJECT));

        $this->asCompany(self::COMPANY)
            ->getJson('/api/v1/tasks-projects/settings')
            ->assertForbidden();
    }
}
