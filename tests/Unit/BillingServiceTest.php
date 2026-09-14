<?php

declare(strict_types=1);

namespace Modules\TasksProjects\Tests\Unit;

use Illuminate\Support\Carbon;
use InvalidArgumentException;
use Modules\TasksProjects\Application\BillingService;
use Modules\TasksProjects\Application\Exceptions\EntriesAlreadyInvoiced;
use Modules\TasksProjects\Application\Exceptions\MixedBillingSelection;
use Modules\TasksProjects\Application\Exceptions\NotBillable;
use Modules\TasksProjects\Application\Exceptions\UnknownTimeEntries;
use Modules\TasksProjects\Models\Project;
use Modules\TasksProjects\Models\Task;
use Modules\TasksProjects\Models\TimeEntry;
use Modules\TasksProjects\Tests\TestCase;

final class BillingServiceTest extends TestCase
{
    private const COMPANY = 9;

    private const CUSTOMER = 42;

    private const CURRENCY = 3;

    private const RATE = 6000;

    private BillingService $billing;

    private Project $website;

    private Project $mobile;

    private Task $landing;

    private Task $pricing;

    private Task $onboarding;

    private Task $adHoc;

    protected function setUp(): void
    {
        parent::setUp();

        $this->billing = new BillingService($this->companyData);
        $this->companyData->withMember(self::COMPANY, 7, 'Ada Lovelace')->withMember(self::COMPANY, 8, 'Grace Hopper');

        $this->website = $this->makeProject(self::COMPANY, ['name' => 'Website', 'customer_id' => self::CUSTOMER, 'currency_id' => self::CURRENCY]);
        $this->mobile = $this->makeProject(self::COMPANY, ['name' => 'Mobile app', 'customer_id' => self::CUSTOMER, 'currency_id' => self::CURRENCY]);

        $this->landing = $this->task('Landing page', $this->website);
        $this->pricing = $this->task('Pricing page', $this->website);
        $this->onboarding = $this->task('Onboarding flow', $this->mobile);
        $this->adHoc = $this->task('Ad hoc call', null);
    }

    public function test_unbilled_collects_the_customers_billable_time_per_currency(): void
    {
        $this->entries();

        $unbilled = $this->billing->unbilled(self::COMPANY, self::CUSTOMER);

        self::assertSame(345, $unbilled['minutes']);
        self::assertSame([['currency_id' => self::CURRENCY, 'minutes' => 345, 'amount' => 34500]], $unbilled['currencies']);
        self::assertSame(['Landing page', 'Pricing page', 'Onboarding flow', 'Ad hoc call'], array_column($unbilled['groups']['task'], 'label'));
        self::assertSame(['Website', 'Mobile app', 'No project'], array_column($unbilled['groups']['project'], 'label'));
        self::assertSame(['Ada Lovelace', 'Grace Hopper'], array_column($unbilled['groups']['member'], 'label'));
        self::assertSame([345], array_column($unbilled['groups']['summary'], 'minutes'));
    }

    public function test_unbilled_never_shows_non_billable_time_a_running_timer_or_another_customer(): void
    {
        $billable = $this->entry($this->landing, 7, 60, '2026-09-01');
        $this->entry($this->landing, 7, 60, '2026-09-02', ['billable' => false]);
        $this->entry($this->landing, 7, 0, '2026-09-03', ['running_user_id' => 7, 'ended_at' => null]);
        $otherCustomer = $this->task('Other customer', null, 43);
        $this->entry($otherCustomer, 7, 60, '2026-09-04');

        self::assertSame([(int) $billable->id], $this->billing->unbilled(self::COMPANY, self::CUSTOMER)['entry_ids']);
    }

    public function test_unbilled_never_shows_time_on_an_internal_project(): void
    {
        $internal = $this->makeProject(self::COMPANY, ['name' => 'Internal tooling', 'customer_id' => null]);
        $strayTask = $this->task('Stray', $internal);
        Task::query()->whereKey($strayTask->id)->update(['customer_id' => self::CUSTOMER]);
        $this->entry($strayTask, 7, 60, '2026-09-01', ['project_id' => $internal->id]);

        self::assertSame([], $this->billing->unbilled(self::COMPANY, self::CUSTOMER)['entry_ids']);
    }

    public function test_unbilled_drops_an_entry_whose_invoice_still_exists(): void
    {
        $open = $this->entry($this->landing, 7, 60, '2026-09-01');
        $this->entry($this->landing, 7, 60, '2026-09-02', ['invoice_id' => 77, 'invoice_item_id' => 5]);
        $this->companyData->withInvoices(self::COMPANY, 77);

        $unbilled = $this->billing->unbilled(self::COMPANY, self::CUSTOMER);

        self::assertSame([(int) $open->id], $unbilled['entry_ids']);
        self::assertSame([['company_id' => self::COMPANY, 'invoice_ids' => [77]]], $this->companyData->invoiceLookups);
    }

    public function test_an_entry_whose_invoice_vanished_from_the_host_becomes_unbilled_again(): void
    {
        $open = $this->entry($this->landing, 7, 60, '2026-09-01');
        $orphan = $this->entry($this->landing, 7, 60, '2026-09-02', ['invoice_id' => 88, 'invoice_item_id' => 5]);
        $this->companyData->withInvoices(self::COMPANY, 77);

        self::assertSame(
            [(int) $open->id, (int) $orphan->id],
            $this->billing->unbilled(self::COMPANY, self::CUSTOMER)['entry_ids'],
        );
    }

    public function test_unbilled_honours_the_date_range(): void
    {
        $this->entry($this->landing, 7, 60, '2026-09-01');
        $inside = $this->entry($this->landing, 7, 60, '2026-09-10');
        $this->entry($this->landing, 7, 60, '2026-09-20');

        self::assertSame(
            [(int) $inside->id],
            $this->billing->unbilled(self::COMPANY, self::CUSTOMER, '2026-09-05', '2026-09-15')['entry_ids'],
        );
    }

    public function test_prepare_builds_one_line_per_task(): void
    {
        Carbon::setTestNow('2026-09-15 08:00:00');
        $entries = $this->entries();

        $payload = $this->billing->prepare(self::COMPANY, $this->ids($entries), 'task');

        self::assertSame('2026-09-15', $payload['invoice_date']);
        self::assertSame(self::CUSTOMER, $payload['customer_id']);
        self::assertSame(self::CURRENCY, $payload['currency_id']);
        self::assertSame(0, $payload['discount']);
        self::assertSame('fixed', $payload['discount_type']);
        self::assertSame(0, $payload['discount_val']);
        self::assertSame(0, $payload['tax']);
        self::assertSame(34500, $payload['sub_total']);
        self::assertSame(34500, $payload['total']);

        self::assertSame([
            ['name' => 'Landing page', 'description' => null, 'quantity' => 1.5, 'price' => 6000, 'total' => 9000],
            ['name' => 'Pricing page', 'description' => null, 'quantity' => 1.5, 'price' => 6000, 'total' => 9000],
            ['name' => 'Onboarding flow', 'description' => null, 'quantity' => 2.0, 'price' => 6000, 'total' => 12000],
            ['name' => 'Ad hoc call', 'description' => null, 'quantity' => 0.75, 'price' => 6000, 'total' => 4500],
        ], $payload['items']);

        self::assertSame([
            ['entry_ids' => [(int) $entries[0]->id, (int) $entries[1]->id]],
            ['entry_ids' => [(int) $entries[2]->id]],
            ['entry_ids' => [(int) $entries[3]->id]],
            ['entry_ids' => [(int) $entries[4]->id]],
        ], $payload['groups']);
        self::assertCount(count($payload['items']), $payload['groups']);
    }

    public function test_prepare_builds_one_line_per_project(): void
    {
        $entries = $this->entries();

        $payload = $this->billing->prepare(self::COMPANY, $this->ids($entries), 'project');

        self::assertSame([
            ['name' => 'Website', 'description' => null, 'quantity' => 3.0, 'price' => 6000, 'total' => 18000],
            ['name' => 'Mobile app', 'description' => null, 'quantity' => 2.0, 'price' => 6000, 'total' => 12000],
            ['name' => 'No project', 'description' => null, 'quantity' => 0.75, 'price' => 6000, 'total' => 4500],
        ], $payload['items']);
        self::assertSame(34500, $payload['total']);
    }

    public function test_prepare_builds_one_line_per_member_and_names_a_leaver(): void
    {
        $entries = $this->entries();
        $entries[] = $this->entry($this->landing, 99, 60, '2026-09-06');

        $payload = $this->billing->prepare(self::COMPANY, $this->ids($entries), 'member');

        self::assertSame([
            ['name' => 'Ada Lovelace', 'description' => null, 'quantity' => 3.25, 'price' => 6000, 'total' => 19500],
            ['name' => 'Grace Hopper', 'description' => null, 'quantity' => 2.5, 'price' => 6000, 'total' => 15000],
            ['name' => 'Removed member', 'description' => null, 'quantity' => 1.0, 'price' => 6000, 'total' => 6000],
        ], $payload['items']);
    }

    public function test_prepare_collapses_everything_into_one_summary_line(): void
    {
        $entries = $this->entries();

        $payload = $this->billing->prepare(self::COMPANY, $this->ids($entries), 'summary');

        self::assertSame([
            ['name' => 'Time', 'description' => null, 'quantity' => 5.75, 'price' => 6000, 'total' => 34500],
        ], $payload['items']);
        self::assertSame([['entry_ids' => $this->ids($entries)]], $payload['groups']);
    }

    public function test_a_line_over_two_rates_bills_the_blended_rate(): void
    {
        $first = $this->entry($this->landing, 7, 60, '2026-09-01', ['rate' => 6000, 'amount' => 6000]);
        $second = $this->entry($this->landing, 7, 30, '2026-09-02', ['rate' => 12000, 'amount' => 6000]);

        $payload = $this->billing->prepare(self::COMPANY, $this->ids([$first, $second]), 'task');

        self::assertSame(
            [['name' => 'Landing page', 'description' => null, 'quantity' => 1.5, 'price' => 8000, 'total' => 12000]],
            $payload['items'],
        );
    }

    public function test_entry_descriptions_become_the_line_description(): void
    {
        $first = $this->entry($this->landing, 7, 60, '2026-09-01', ['description' => 'Hero section']);
        $second = $this->entry($this->landing, 7, 60, '2026-09-02', ['description' => 'Hero section']);
        $third = $this->entry($this->landing, 7, 60, '2026-09-03', ['description' => 'Footer']);

        $payload = $this->billing->prepare(self::COMPANY, $this->ids([$first, $second, $third]), 'task');

        self::assertSame("Hero section\nFooter", $payload['items'][0]['description']);
    }

    public function test_prepare_refuses_a_selection_spanning_two_customers(): void
    {
        $ours = $this->entry($this->landing, 7, 60, '2026-09-01');
        $theirs = $this->entry($this->task('Theirs', null, 43), 7, 60, '2026-09-02');

        $this->expectException(MixedBillingSelection::class);
        $this->expectExceptionMessage('more than one customer');

        $this->billing->prepare(self::COMPANY, $this->ids([$ours, $theirs]), 'task');
    }

    public function test_prepare_refuses_a_selection_spanning_two_currencies(): void
    {
        $euros = $this->entry($this->landing, 7, 60, '2026-09-01');
        $pounds = $this->entry($this->landing, 7, 60, '2026-09-02', ['currency_id' => 4]);

        $this->expectException(MixedBillingSelection::class);
        $this->expectExceptionMessage('more than one currency');

        $this->billing->prepare(self::COMPANY, $this->ids([$euros, $pounds]), 'task');
    }

    public function test_prepare_refuses_an_empty_selection(): void
    {
        $this->expectException(MixedBillingSelection::class);
        $this->expectExceptionMessage('No time entries were selected.');

        $this->billing->prepare(self::COMPANY, [], 'task');
    }

    public function test_prepare_refuses_an_entry_of_another_company(): void
    {
        $foreignTask = $this->makeTask(10, ['customer_id' => self::CUSTOMER]);
        $foreign = $this->makeEntry(10, (int) $foreignTask->id);

        $this->expectException(UnknownTimeEntries::class);
        $this->expectExceptionMessage("Time entries {$foreign->id} do not belong to this company.");

        $this->billing->prepare(self::COMPANY, [(int) $foreign->id], 'task');
    }

    public function test_prepare_refuses_non_billable_time(): void
    {
        $entry = $this->entry($this->landing, 7, 60, '2026-09-01', ['billable' => false]);

        $this->expectException(NotBillable::class);
        $this->expectExceptionMessage("Time entries {$entry->id} are not billable.");

        $this->billing->prepare(self::COMPANY, [(int) $entry->id], 'task');
    }

    public function test_prepare_refuses_a_timer_that_is_still_running(): void
    {
        $entry = $this->entry($this->landing, 7, 0, '2026-09-01', ['running_user_id' => 7, 'ended_at' => null]);

        $this->expectException(NotBillable::class);
        $this->expectExceptionMessage('still running');

        $this->billing->prepare(self::COMPANY, [(int) $entry->id], 'task');
    }

    public function test_prepare_refuses_time_that_is_already_on_a_live_invoice(): void
    {
        $entry = $this->entry($this->landing, 7, 60, '2026-09-01', ['invoice_id' => 77]);
        $this->companyData->withInvoices(self::COMPANY, 77);

        $this->expectException(EntriesAlreadyInvoiced::class);

        $this->billing->prepare(self::COMPANY, [(int) $entry->id], 'task');
    }

    public function test_prepare_re_bills_time_whose_invoice_vanished(): void
    {
        $entry = $this->entry($this->landing, 7, 60, '2026-09-01', ['invoice_id' => 88]);

        $payload = $this->billing->prepare(self::COMPANY, [(int) $entry->id], 'task');

        self::assertSame(6000, $payload['total']);
    }

    public function test_prepare_refuses_a_grouping_it_does_not_know(): void
    {
        $entry = $this->entry($this->landing, 7, 60, '2026-09-01');

        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage("Grouping 'weekday' is not one of task, project, member, summary.");

        $this->billing->prepare(self::COMPANY, [(int) $entry->id], 'weekday');
    }

    public function test_prepare_refuses_time_with_no_customer_to_bill(): void
    {
        $internal = $this->makeProject(self::COMPANY, ['name' => 'Internal', 'customer_id' => null]);
        $task = $this->task('Internal work', $internal);
        $entry = $this->entry($task, 7, 60, '2026-09-01', ['project_id' => $internal->id]);

        $this->expectException(NotBillable::class);
        $this->expectExceptionMessage('has no customer to bill');

        $this->billing->prepare(self::COMPANY, [(int) $entry->id], 'task');
    }

    public function test_confirm_stamps_every_entry_with_its_line(): void
    {
        Carbon::setTestNow('2026-09-15 08:00:00');
        $first = $this->entry($this->landing, 7, 60, '2026-09-01');
        $second = $this->entry($this->pricing, 7, 60, '2026-09-02');

        $stamped = $this->billing->confirm(self::COMPANY, 77, [
            ['invoice_item_id' => 101, 'entry_ids' => [(int) $first->id]],
            ['invoice_item_id' => 102, 'entry_ids' => [(int) $second->id]],
        ]);

        self::assertSame(2, $stamped);
        self::assertSame(77, $first->fresh()->invoice_id);
        self::assertSame(101, $first->fresh()->invoice_item_id);
        self::assertSame('2026-09-15 08:00:00', $first->fresh()->invoiced_at?->toDateTimeString());
        self::assertSame(102, $second->fresh()->invoice_item_id);
    }

    public function test_confirm_can_be_replayed_after_a_half_finished_round_trip(): void
    {
        $entry = $this->entry($this->landing, 7, 60, '2026-09-01');
        $items = [['invoice_item_id' => 101, 'entry_ids' => [(int) $entry->id]]];

        self::assertSame(1, $this->billing->confirm(self::COMPANY, 77, $items));
        self::assertSame(0, $this->billing->confirm(self::COMPANY, 77, $items));
        self::assertSame(77, $entry->fresh()->invoice_id);
    }

    public function test_confirm_refuses_an_entry_that_belongs_to_another_invoice(): void
    {
        $entry = $this->entry($this->landing, 7, 60, '2026-09-01', ['invoice_id' => 77, 'invoice_item_id' => 101]);

        $this->expectException(EntriesAlreadyInvoiced::class);
        $this->expectExceptionMessage("Time entry {$entry->id} is already stamped with invoice 77.");

        $this->billing->confirm(self::COMPANY, 78, [['invoice_item_id' => 201, 'entry_ids' => [(int) $entry->id]]]);
    }

    public function test_confirm_refuses_an_entry_of_another_company_and_stamps_nothing(): void
    {
        $ours = $this->entry($this->landing, 7, 60, '2026-09-01');
        $foreignTask = $this->makeTask(10);
        $foreign = $this->makeEntry(10, (int) $foreignTask->id);

        try {
            $this->billing->confirm(self::COMPANY, 77, [
                ['invoice_item_id' => 101, 'entry_ids' => [(int) $ours->id, (int) $foreign->id]],
            ]);
            self::fail('Expected the confirmation to be refused.');
        } catch (UnknownTimeEntries $exception) {
            self::assertSame("Time entries {$foreign->id} do not belong to this company.", $exception->getMessage());
        }

        self::assertNull($ours->fresh()->invoice_id);
    }

    private function task(string $name, ?Project $project, int $customerId = self::CUSTOMER): Task
    {
        return $this->makeTask(self::COMPANY, [
            'name' => $name,
            'project_id' => $project?->id,
            'customer_id' => $project === null ? $customerId : $project->customer_id,
        ]);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    private function entry(Task $task, int $userId, int $minutes, string $day, array $attributes = []): TimeEntry
    {
        return $this->makeEntry(self::COMPANY, (int) $task->id, $attributes + [
            'project_id' => $task->project_id,
            'user_id' => $userId,
            'started_at' => Carbon::parse($day.' 09:00:00'),
            'ended_at' => Carbon::parse($day.' 09:00:00')->addMinutes($minutes),
            'duration_minutes' => $minutes,
            'rate' => self::RATE,
            'amount' => (int) round($minutes / 60 * self::RATE),
            'currency_id' => self::CURRENCY,
        ]);
    }

    /** @return list<TimeEntry> */
    private function entries(): array
    {
        return [
            $this->entry($this->landing, 7, 60, '2026-09-01'),
            $this->entry($this->landing, 8, 30, '2026-09-02'),
            $this->entry($this->pricing, 7, 90, '2026-09-03'),
            $this->entry($this->onboarding, 8, 120, '2026-09-04'),
            $this->entry($this->adHoc, 7, 45, '2026-09-05'),
        ];
    }

    /**
     * @param  list<TimeEntry>  $entries
     * @return list<int>
     */
    private function ids(array $entries): array
    {
        return array_map(static fn (TimeEntry $entry): int => (int) $entry->id, $entries);
    }
}
