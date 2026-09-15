<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import type { AxiosInstance } from 'axios'
import type { Router } from 'vue-router'
import {
  confirmInvoice,
  createInvoice,
  fetchCompanyInvoiceDefaults,
  fetchExchangeRate,
  fetchNextInvoiceNumber,
  fetchUnbilledTime,
  listBillingCustomers,
  listInvoiceTemplates,
  listUnbilledCustomers,
  prepareInvoice,
} from '@/api/billing'
import type { UnbilledRange } from '@/api/billing'
import { errorMessage, fieldErrors } from '@/support/errors'
import { errorStatus } from '@/support/http'
import { formatDate, formatMinutes, toDateString } from '@/support/format'
import { useTranslate } from '@/support/i18n'
import { PATHS } from '@/support/page'
import type { Notify } from '@/support/page'
import type {
  BillingGrouping,
  CompanyInvoiceDefaults,
  ConfirmItem,
  CreatedInvoice,
  CurrencyFormat,
  InvoicePayload,
  InvoiceTemplate,
  PreparedInvoice,
  UnbilledCustomer,
  UnbilledEntry,
  UnbilledGroup,
  UnbilledTime,
} from '@/types/billing'

interface GroupingOption {
  id: BillingGrouping
  label: string
}

interface TemplateOption {
  name: string
}

const props = defineProps<{
  client: AxiosInstance
  notify: Notify
  /** The host router: the preselected customer arrives on its query. */
  router: Router
}>()

/** Where the host mounts the invoice detail page. */
const INVOICE_VIEW = '/admin/invoices'

const GROUPINGS: BillingGrouping[] = ['task', 'project', 'member', 'summary']

const t = useTranslate()

const step = ref(1)
const loading = ref(true)

// Step 1: who has time waiting.
const customers = ref<UnbilledCustomer[]>([])
const contacts = ref<Record<number, BillingCustomer>>({})
const range = reactive<{ from: string; to: string }>({ from: '', to: '' })
const chosen = ref<UnbilledCustomer | null>(null)

// Step 2: which entries.
const unbilled = ref<UnbilledTime | null>(null)
const grouping = ref<BillingGrouping>('task')
const selected = ref<number[]>([])
const loadingEntries = ref(false)

// Step 3: what the invoice will say.
const defaults = ref<CompanyInvoiceDefaults | null>(null)
const templates = ref<InvoiceTemplate[]>([])
const prepared = ref<PreparedInvoice | null>(null)
const preparing = ref(false)
const form = reactive<{
  invoiceDate: string
  dueDate: string
  invoiceNumber: string
  templateName: string
  exchangeRate: string
}>({ invoiceDate: '', dueDate: '', invoiceNumber: '', templateName: '', exchangeRate: '' })
const errors = ref<Record<string, string>>({})
const rejected = ref(false)

// Step 4: what came back.
const creating = ref(false)
const created = ref<CreatedInvoice | null>(null)
const stamped = ref<number | null>(null)
const stampFailed = ref(false)
const stamping = ref(false)

const steps = computed(() => [
  t('tasks_projects.billing.steps.customer'),
  t('tasks_projects.billing.steps.entries'),
  t('tasks_projects.billing.steps.preview'),
  t('tasks_projects.billing.steps.create'),
])

const groupingOptions = computed<GroupingOption[]>(() =>
  GROUPINGS.map((id) => ({ id, label: t(`tasks_projects.billing.entries.group_by.${id}`) })),
)

const groupingOption = computed<GroupingOption>({
  get: () =>
    groupingOptions.value.find((option) => option.id === grouping.value) ?? groupingOptions.value[0],
  set: (option: GroupingOption) => {
    grouping.value = option.id
  },
})

const templateOptions = computed<TemplateOption[]>(() =>
  templates.value.map((template) => ({ name: template.name })),
)

const templateOption = computed<TemplateOption>({
  get: () =>
    templateOptions.value.find((option) => option.name === form.templateName) ?? {
      name: form.templateName,
    },
  set: (option: TemplateOption) => {
    form.templateName = option.name
  },
})

/**
 * The entries this step is about.
 *
 * A card names a customer *and* a currency, because money in two denominations
 * cannot be added up and an invoice is written in one. So the step narrows to
 * the currency that was clicked; the grouped rows already arrive split the same
 * way, which is what keeps the selection something `prepare` will accept.
 */
const visibleEntries = computed<UnbilledEntry[]>(() =>
  (unbilled.value?.entries ?? []).filter(
    (entry) => entry.currency_id === (chosen.value?.currency_id ?? null),
  ),
)

const entryById = computed<Record<number, UnbilledEntry>>(() => {
  const map: Record<number, UnbilledEntry> = {}

  for (const entry of visibleEntries.value) {
    map[entry.id] = entry
  }

  return map
})

const groups = computed<UnbilledGroup[]>(() =>
  (unbilled.value?.groups[grouping.value] ?? []).filter(
    (group) => group.currency_id === (chosen.value?.currency_id ?? null),
  ),
)

const totalEntries = computed<number>(() => visibleEntries.value.length)

const allSelected = computed<boolean>(
  () => totalEntries.value > 0 && selected.value.length === totalEntries.value,
)

const selectedMinutes = computed<number>(() =>
  selected.value.reduce((sum, id) => sum + (entryById.value[id]?.minutes ?? 0), 0),
)

const selectedAmount = computed<number>(() =>
  selected.value.reduce((sum, id) => sum + (entryById.value[id]?.amount ?? 0), 0),
)

/** How the amounts on the chosen customer's screens are rendered. */
const currency = computed<CurrencyFormat | null>(() =>
  chosen.value === null
    ? null
    : currencyFormat(chosen.value.customer_id, chosen.value.currency_id),
)

/**
 * Whether the host will demand an exchange rate.
 *
 * Its own rule, mirrored: the invoice endpoint compares the *contact's*
 * currency with the company setting, not the currency the time was logged in,
 * so the field appears exactly when the post would be refused without it.
 */
const foreignCurrency = computed<boolean>(() => {
  const home = defaults.value?.currency?.id ?? null

  if (home === null || chosen.value === null) {
    return false
  }

  return customerCurrencyId(chosen.value.customer_id) !== home
})

/**
 * Whether the number is the user's to type.
 *
 * A company that numbers its invoices itself gets the field it expects; one
 * that lets the host generate them sees what it will be. Either way a host
 * refusal, such as a number already taken, unlocks the field so the wizard is
 * never a dead end.
 */
const numberEditable = computed<boolean>(
  () => defaults.value?.autoGenerateNumber !== true || errors.value.invoice_number !== undefined,
)

const rangeParams = computed<UnbilledRange>(() => {
  const params: UnbilledRange = {}

  if (range.from !== '') {
    params.from = range.from
  }

  if (range.to !== '') {
    params.to = range.to
  }

  return params
})

watch(() => [range.from, range.to], () => void loadCustomers())

onMounted(() => void load())

async function load(): Promise<void> {
  loading.value = true

  await Promise.all([loadDefaults(), loadCustomers(), loadNames(), loadTemplates()])

  loading.value = false

  const preselected = customerIdFromQuery()

  if (preselected !== null) {
    const row = customers.value.find((customer) => customer.customer_id === preselected)

    if (row) {
      await openCustomer(row)
    }
  }
}

/**
 * The customer the entry points ask for.
 *
 * A module page is registered with `props: true`, which carries route params
 * and not the query, so the query is read off the injected router, with the
 * address bar as the fallback for a page opened cold.
 */
function customerIdFromQuery(): number | null {
  const fromRouter = props.router.currentRoute.value.query.customer_id
  const raw = Array.isArray(fromRouter)
    ? fromRouter[0]
    : (fromRouter ?? new URLSearchParams(window.location.search).get('customer_id'))
  const id = Number(raw)

  return Number.isInteger(id) && id > 0 ? id : null
}

async function loadDefaults(): Promise<void> {
  try {
    defaults.value = await fetchCompanyInvoiceDefaults(props.client)
  } catch {
    // The wizard still works without them: the due date is left blank and the
    // number field stays editable.
    defaults.value = null
  }
}

async function loadCustomers(): Promise<void> {
  try {
    customers.value = await listUnbilledCustomers(props.client, rangeParams.value)
  } catch (error: unknown) {
    customers.value = []
    props.notify('error', errorMessage(error, t('tasks_projects.billing.customer.load_failed')))
  }
}

async function loadNames(): Promise<void> {
  try {
    const found: Record<number, BillingCustomer> = {}

    for (const contact of await listBillingCustomers(props.client)) {
      found[contact.id] = contact
    }

    contacts.value = found
  } catch {
    // Ids still identify the row; the label falls back to "Customer #id".
    contacts.value = {}
  }
}

async function loadTemplates(): Promise<void> {
  try {
    templates.value = await listInvoiceTemplates(props.client)
  } catch (error: unknown) {
    templates.value = []
    props.notify('error', errorMessage(error, t('tasks_projects.billing.preview.templates_failed')))
  }
}

function customerName(customerId: number): string {
  const contact = contacts.value[customerId]
  const label = contact?.display_name ?? contact?.name

  return label && label !== ''
    ? label
    : t('tasks_projects.billing.customer.unnamed', { id: customerId })
}

/** The currency the host says this contact settles in. */
function customerCurrencyId(customerId: number): number | null {
  const contact = contacts.value[customerId]

  return contact?.currency_id ?? contact?.currency?.id ?? null
}

/**
 * How to render an amount denominated in this currency.
 *
 * The contact's own currency when the money is in it, the company's when it is
 * in that, and otherwise null, which leaves the host component to fall back to
 * the company currency rather than label the amount with a symbol that is not
 * the one it is in.
 */
function currencyFormat(customerId: number, currencyId: number | null): CurrencyFormat | null {
  if (currencyId === null) {
    return null
  }

  const contact = contacts.value[customerId]

  if (contact?.currency && contact.currency.id === currencyId) {
    return contact.currency
  }

  const home = defaults.value?.currency ?? null

  return home !== null && home.id === currencyId ? home : null
}

function clearRange(): void {
  range.from = ''
  range.to = ''
}

function onFrom(value: string | Date): void {
  range.from = value ? toDateString(value) : ''
}

function onTo(value: string | Date): void {
  range.to = value ? toDateString(value) : ''
}

async function openCustomer(customer: UnbilledCustomer): Promise<void> {
  chosen.value = customer
  step.value = 2
  loadingEntries.value = true
  unbilled.value = null
  selected.value = []

  try {
    unbilled.value = await fetchUnbilledTime(props.client, customer.customer_id, rangeParams.value)
    selected.value = visibleEntries.value.map((entry) => entry.id)
  } catch (error: unknown) {
    props.notify('error', errorMessage(error, t('tasks_projects.billing.entries.load_failed')))
  } finally {
    loadingEntries.value = false
  }
}

function isSelected(entryId: number): boolean {
  return selected.value.includes(entryId)
}

function toggleEntry(entryId: number): void {
  selected.value = isSelected(entryId)
    ? selected.value.filter((id) => id !== entryId)
    : [...selected.value, entryId]
}

function toggleAll(): void {
  selected.value = allSelected.value ? [] : visibleEntries.value.map((entry) => entry.id)
}

function groupSelected(group: UnbilledGroup): boolean {
  return group.entry_ids.length > 0 && group.entry_ids.every((id) => isSelected(id))
}

function toggleGroup(group: UnbilledGroup): void {
  if (groupSelected(group)) {
    selected.value = selected.value.filter((id) => !group.entry_ids.includes(id))

    return
  }

  const missing = group.entry_ids.filter((id) => !isSelected(id))
  selected.value = [...selected.value, ...missing]
}

/** Entries in the order the group lists them, for the rows under its header. */
function groupEntries(group: UnbilledGroup): UnbilledEntry[] {
  return group.entry_ids
    .map((id) => entryById.value[id])
    .filter((entry): entry is UnbilledEntry => entry !== undefined)
}

async function goToPreview(): Promise<void> {
  if (selected.value.length === 0) {
    props.notify('warning', t('tasks_projects.billing.entries.none_selected'))

    return
  }

  step.value = 3
  preparing.value = true
  prepared.value = null
  errors.value = {}
  rejected.value = false

  try {
    const payload = await prepareInvoice(props.client, selected.value, grouping.value)

    prepared.value = payload
    await fillForm(payload)
  } catch (error: unknown) {
    props.notify('error', errorMessage(error, t('tasks_projects.billing.preview.prepare_failed')))
    step.value = 2
  } finally {
    preparing.value = false
  }
}

/**
 * The fields the host's own create form would have filled in.
 *
 * The number, the template and the rate all come from the same endpoints the
 * host form reads, so a company that numbers its invoices by hand, defaults to
 * a custom template or bills in a second currency gets the same answer here.
 */
async function fillForm(payload: PreparedInvoice): Promise<void> {
  form.invoiceDate = payload.invoice_date
  form.dueDate = defaultDueDate(payload.invoice_date)
  form.templateName =
    defaults.value?.defaultTemplate ?? templates.value[0]?.name ?? ''

  const [number, rate] = await Promise.all([
    fetchNextInvoiceNumber(props.client, payload.customer_id).catch((): null => null),
    foreignCurrency.value && chosen.value?.currency_id
      ? fetchExchangeRate(props.client, chosen.value.currency_id).catch((): null => null)
      : Promise.resolve(null),
  ])

  form.invoiceNumber = number ?? ''

  if (number === null) {
    props.notify('warning', t('tasks_projects.billing.preview.number_failed'))
  }

  if (foreignCurrency.value) {
    form.exchangeRate = rate === null ? '' : String(rate)

    if (rate === null) {
      props.notify('warning', t('tasks_projects.billing.preview.rate_failed'))
    }
  } else {
    form.exchangeRate = ''
  }
}

function defaultDueDate(invoiceDate: string): string {
  const settings = defaults.value

  if (settings === null || !settings.setDueDateAutomatically) {
    return ''
  }

  const due = new Date(`${invoiceDate}T00:00:00`)

  if (Number.isNaN(due.getTime())) {
    return ''
  }

  due.setDate(due.getDate() + settings.dueDateDays)

  return toDateString(due)
}

function onInvoiceDate(value: string | Date): void {
  form.invoiceDate = value ? toDateString(value) : ''
  form.dueDate = defaultDueDate(form.invoiceDate)
}

function onDueDate(value: string | Date): void {
  form.dueDate = value ? toDateString(value) : ''
}

/**
 * The body the host invoice endpoint takes.
 *
 * Only the keys it validates or stores: the lines arrive with their zeroed
 * discount and tax fields so the host's item writer never reaches for a
 * missing index, and the totals are the preview's arithmetic, which the host
 * recomputes from the same lines before it saves anything.
 */
function invoicePayload(payload: PreparedInvoice): InvoicePayload {
  return {
    invoice_date: form.invoiceDate,
    due_date: form.dueDate === '' ? null : form.dueDate,
    customer_id: payload.customer_id,
    invoice_number: form.invoiceNumber,
    // The host stores the contact's currency whatever is sent, and reads this
    // only to decide whether the rate applies, so the contact's is what goes.
    currency_id: customerCurrencyId(payload.customer_id) ?? payload.currency_id,
    exchange_rate: foreignCurrency.value && form.exchangeRate !== '' ? Number(form.exchangeRate) : null,
    discount: payload.discount,
    discount_type: payload.discount_type,
    discount_val: payload.discount_val,
    tax: payload.tax,
    sub_total: payload.sub_total,
    total: payload.total,
    tax_included: false,
    notes: payload.notes,
    template_name: form.templateName,
    items: payload.items.map((item) => ({ ...item })),
    taxes: [],
  }
}

async function create(): Promise<void> {
  const payload = prepared.value

  if (payload === null || creating.value) {
    return
  }

  step.value = 4
  creating.value = true
  errors.value = {}
  rejected.value = false
  created.value = null
  stamped.value = null
  stampFailed.value = false

  try {
    const invoice = await createInvoice(props.client, invoicePayload(payload))

    created.value = invoice
    await stamp(invoice, payload)
  } catch (error: unknown) {
    if (errorStatus(error) === 422) {
      errors.value = fieldErrors(error)
      rejected.value = true
      step.value = 3
      props.notify('error', errorMessage(error, t('tasks_projects.billing.preview.invalid')))
    } else {
      step.value = 3
      props.notify('error', errorMessage(error, t('tasks_projects.billing.create.failed')))
    }
  } finally {
    creating.value = false
  }
}

/**
 * Hand the created line ids back to the module.
 *
 * `groups[i]` was produced alongside `items[i]`, and the host writes the lines
 * in the order they were posted, so zipping them positionally pairs each line
 * with the entries behind it. A failure here leaves a live invoice and unbilled
 * time, which the banner offers to fix: the call is idempotent.
 */
async function stamp(invoice: CreatedInvoice, payload: PreparedInvoice): Promise<void> {
  const lines = invoice.items ?? []
  const items: ConfirmItem[] = []

  payload.groups.forEach((group, index) => {
    const line = lines[index]

    if (line) {
      items.push({ invoice_item_id: line.id, entry_ids: group.entry_ids })
    }
  })

  if (items.length === 0) {
    stampFailed.value = true

    return
  }

  stamping.value = true

  try {
    stamped.value = await confirmInvoice(props.client, invoice.id, items)
    stampFailed.value = false
  } catch (error: unknown) {
    stampFailed.value = true
    props.notify('error', errorMessage(error, t('tasks_projects.billing.create.stamp_failed_title')))
  } finally {
    stamping.value = false
  }
}

async function retryStamp(): Promise<void> {
  const invoice = created.value
  const payload = prepared.value

  if (invoice === null || payload === null || stamping.value) {
    return
  }

  await stamp(invoice, payload)

  if (!stampFailed.value) {
    props.notify('success', t('tasks_projects.billing.create.stamped'))
  }
}

/** Back to a clean first step, with the customer list read again. */
async function startOver(): Promise<void> {
  step.value = 1
  chosen.value = null
  unbilled.value = null
  prepared.value = null
  created.value = null
  stamped.value = null
  stampFailed.value = false
  selected.value = []
  errors.value = {}
  rejected.value = false

  await loadCustomers()
}

function stepClass(index: number): string {
  if (step.value > index) {
    return 'border-primary-500 bg-primary-500 text-white'
  }

  return step.value === index
    ? 'border-primary-500 text-primary-500'
    : 'border-line-default text-subtle'
}

</script>

<template>
  <BasePage>
    <BasePageHeader :title="t('tasks_projects.billing.title')">
      <BaseBreadcrumb>
        <BaseBreadcrumbItem :title="t('tasks_projects.general.home')" to="/admin/dashboard" />
        <BaseBreadcrumbItem :title="t('tasks_projects.tasks.title')" :to="PATHS.tasks" />
        <BaseBreadcrumbItem :title="t('tasks_projects.billing.title')" to="#" active />
      </BaseBreadcrumb>

      <template #actions>
        <div class="flex items-center justify-end space-x-5">
          <router-link :to="PATHS.week">
            <BaseButton variant="white">
              <template #left="slotProps">
                <BaseIcon name="ClockIcon" :class="slotProps.class" />
              </template>
              {{ t('tasks_projects.time.title') }}
            </BaseButton>
          </router-link>
        </div>
      </template>
    </BasePageHeader>

    <ol class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
      <li v-for="(label, index) in steps" :key="label" class="flex items-center gap-2">
        <span
          class="flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold"
          :class="stepClass(index + 1)"
        >
          {{ index + 1 }}
        </span>
        <span
          class="text-sm font-medium"
          :class="step === index + 1 ? 'text-heading' : 'text-muted'"
        >
          {{ label }}
        </span>
      </li>
    </ol>

    <div v-if="loading" class="flex justify-center py-16">
      <BaseSpinner class="h-8 w-8 text-primary-500" />
    </div>

    <!-- Step 1: who has time waiting -->
    <section v-else-if="step === 1" class="mt-6">
      <h2 class="text-base font-semibold text-heading">
        {{ t('tasks_projects.billing.customer.title') }}
      </h2>
      <p class="mt-1 text-sm text-muted">
        {{ t('tasks_projects.billing.customer.description') }}
      </p>

      <div class="mt-4 flex flex-wrap items-end gap-4">
        <BaseInputGroup :label="t('tasks_projects.billing.customer.from')" class="w-full sm:w-48">
          <BaseDatePicker :model-value="range.from" @update:model-value="onFrom" />
        </BaseInputGroup>

        <BaseInputGroup :label="t('tasks_projects.billing.customer.to')" class="w-full sm:w-48">
          <BaseDatePicker :model-value="range.to" @update:model-value="onTo" />
        </BaseInputGroup>

        <BaseButton
          v-if="range.from !== '' || range.to !== ''"
          variant="primary-outline"
          @click="clearRange"
        >
          {{ t('tasks_projects.billing.customer.clear_range') }}
        </BaseButton>
      </div>

      <div v-if="customers.length > 0" class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <button
          v-for="row in customers"
          :key="`${row.customer_id}-${row.currency_id ?? 'none'}`"
          type="button"
          class="rounded-xl border border-line-default bg-surface p-5 text-left transition hover:border-primary-500"
          @click="openCustomer(row)"
        >
          <p class="text-sm font-semibold text-heading">{{ customerName(row.customer_id) }}</p>
          <p class="mt-1 text-xs text-muted">
            {{ t('tasks_projects.billing.customer.entries', { count: row.entries }) }}
            &middot;
            {{ formatMinutes(row.minutes) }}
          </p>
          <p class="mt-3 text-xl font-semibold text-heading">
            <BaseFormatMoney
              :amount="row.amount"
              :currency="currencyFormat(row.customer_id, row.currency_id)"
            />
          </p>
        </button>
      </div>

      <BaseEmptyPlaceholder
        v-else
        :title="t('tasks_projects.billing.customer.empty_title')"
        :description="t('tasks_projects.billing.customer.empty_description')"
      >
        <BaseIcon name="BanknotesIcon" class="mt-5 mb-4 h-16 w-16 text-subtle" />
      </BaseEmptyPlaceholder>
    </section>

    <!-- Step 2: which entries -->
    <section v-else-if="step === 2" class="mt-6">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 class="text-base font-semibold text-heading">
            {{ t('tasks_projects.billing.entries.title') }}
          </h2>
          <p class="mt-1 text-sm text-muted">
            {{ chosen ? customerName(chosen.customer_id) : '' }}
          </p>
        </div>

        <BaseInputGroup
          :label="t('tasks_projects.billing.entries.grouping')"
          class="w-full sm:w-56"
        >
          <BaseSelectInput v-model="groupingOption" :options="groupingOptions" label-key="label" />
        </BaseInputGroup>
      </div>

      <div v-if="loadingEntries" class="flex justify-center py-16">
        <BaseSpinner class="h-8 w-8 text-primary-500" />
      </div>

      <template v-else-if="totalEntries > 0">
        <div
          class="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line-default bg-surface-secondary px-4 py-3"
        >
          <label class="flex cursor-pointer items-center gap-2 text-sm font-medium text-heading">
            <input
              type="checkbox"
              class="h-4 w-4 cursor-pointer rounded border-line-strong"
              :checked="allSelected"
              @change="toggleAll"
            >
            {{ t('tasks_projects.billing.entries.select_all') }}
          </label>

          <p class="text-sm text-muted">
            {{
              t('tasks_projects.billing.entries.selected', {
                count: selected.length,
                total: totalEntries,
              })
            }}
          </p>
        </div>

        <div
          v-for="group in groups"
          :key="`${group.label}-${group.key ?? 'none'}-${group.currency_id ?? 'none'}`"
          class="mt-4 overflow-hidden rounded-xl border border-line-default"
        >
          <div class="flex flex-wrap items-center justify-between gap-3 bg-surface-secondary px-4 py-3">
            <label class="flex cursor-pointer items-center gap-2 text-sm font-semibold text-heading">
              <input
                type="checkbox"
                class="h-4 w-4 cursor-pointer rounded border-line-strong"
                :checked="groupSelected(group)"
                @change="toggleGroup(group)"
              >
              {{ group.label }}
            </label>

            <p class="text-sm text-muted">
              {{ formatMinutes(group.minutes) }}
              &middot;
              <BaseFormatMoney :amount="group.amount" :currency="currency" />
            </p>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full table-auto">
              <thead class="bg-surface text-xs tracking-wider text-muted uppercase">
                <tr>
                  <th class="w-10" />
                  <th class="px-4 py-2 text-left font-medium">
                    {{ t('tasks_projects.billing.entries.columns.date') }}
                  </th>
                  <th class="px-4 py-2 text-left font-medium">
                    {{ t('tasks_projects.billing.entries.columns.task') }}
                  </th>
                  <th class="px-4 py-2 text-left font-medium">
                    {{ t('tasks_projects.billing.entries.columns.project') }}
                  </th>
                  <th class="px-4 py-2 text-left font-medium">
                    {{ t('tasks_projects.billing.entries.columns.member') }}
                  </th>
                  <th class="px-4 py-2 text-right font-medium">
                    {{ t('tasks_projects.billing.entries.columns.duration') }}
                  </th>
                  <th class="px-4 py-2 text-right font-medium">
                    {{ t('tasks_projects.billing.entries.columns.amount') }}
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-line-default bg-surface text-sm">
                <tr v-for="entry in groupEntries(group)" :key="entry.id">
                  <td class="pl-4">
                    <input
                      type="checkbox"
                      class="h-4 w-4 cursor-pointer rounded border-line-strong"
                      :checked="isSelected(entry.id)"
                      @change="toggleEntry(entry.id)"
                    >
                  </td>
                  <td class="px-4 py-2 whitespace-nowrap text-muted">
                    {{ formatDate(entry.date) }}
                  </td>
                  <td class="px-4 py-2">
                    <span class="text-heading">{{ entry.task_name }}</span>
                    <span class="block text-xs text-subtle">
                      {{ entry.description || t('tasks_projects.billing.entries.no_description') }}
                    </span>
                  </td>
                  <td class="px-4 py-2 text-muted">
                    {{ entry.project_name ?? '-' }}
                  </td>
                  <td class="px-4 py-2 text-muted">{{ entry.user_name }}</td>
                  <td class="px-4 py-2 text-right whitespace-nowrap text-muted">
                    {{ formatMinutes(entry.minutes) }}
                  </td>
                  <td class="px-4 py-2 text-right whitespace-nowrap text-heading">
                    <BaseFormatMoney :amount="entry.amount" :currency="currency" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p class="text-sm font-medium text-heading">
            {{
              t('tasks_projects.billing.entries.selected_total', {
                hours: formatMinutes(selectedMinutes),
              })
            }}
            &middot;
            <BaseFormatMoney :amount="selectedAmount" :currency="currency" />
          </p>

          <div class="flex items-center gap-3">
            <BaseButton variant="primary-outline" @click="startOver">
              {{ t('tasks_projects.billing.back') }}
            </BaseButton>

            <BaseButton variant="primary" :disabled="selected.length === 0" @click="goToPreview">
              {{ t('tasks_projects.billing.next') }}
            </BaseButton>
          </div>
        </div>
      </template>

      <template v-else>
        <BaseEmptyPlaceholder
          :title="t('tasks_projects.billing.entries.empty_title')"
          :description="t('tasks_projects.billing.entries.empty_description')"
        >
          <BaseIcon name="ClockIcon" class="mt-5 mb-4 h-16 w-16 text-subtle" />

          <template #actions>
            <BaseButton variant="primary" @click="startOver">
              {{ t('tasks_projects.billing.back') }}
            </BaseButton>
          </template>
        </BaseEmptyPlaceholder>
      </template>
    </section>

    <!-- Step 3: check the invoice -->
    <section v-else-if="step === 3" class="mt-6">
      <h2 class="text-base font-semibold text-heading">
        {{ t('tasks_projects.billing.preview.title') }}
      </h2>

      <div v-if="preparing || prepared === null" class="flex justify-center py-16">
        <BaseSpinner class="h-8 w-8 text-primary-500" />
      </div>

      <template v-else>
        <div
          v-if="rejected"
          class="mt-4 rounded-lg border border-status-red bg-surface px-4 py-3 text-sm text-status-red"
        >
          {{ t('tasks_projects.billing.preview.invalid') }}
        </div>

        <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <BaseInputGroup
            :label="t('tasks_projects.billing.preview.invoice_date')"
            :error="errors.invoice_date"
            required
          >
            <BaseDatePicker :model-value="form.invoiceDate" @update:model-value="onInvoiceDate" />
          </BaseInputGroup>

          <BaseInputGroup
            :label="t('tasks_projects.billing.preview.due_date')"
            :error="errors.due_date"
          >
            <BaseDatePicker :model-value="form.dueDate" @update:model-value="onDueDate" />
          </BaseInputGroup>

          <BaseInputGroup
            :label="t('tasks_projects.billing.preview.invoice_number')"
            :error="errors.invoice_number"
            required
          >
            <BaseInput
              v-model="form.invoiceNumber"
              type="text"
              name="invoice_number"
              :disabled="!numberEditable"
            />
            <span v-if="!numberEditable" class="mt-1 block text-xs text-subtle">
              {{ t('tasks_projects.billing.preview.invoice_number_auto') }}
            </span>
          </BaseInputGroup>

          <BaseInputGroup
            :label="t('tasks_projects.billing.preview.template')"
            :error="errors.template_name"
            required
          >
            <BaseSelectInput
              v-model="templateOption"
              :options="templateOptions"
              label-key="name"
            />
          </BaseInputGroup>

          <BaseInputGroup
            v-if="foreignCurrency"
            :label="t('tasks_projects.billing.preview.exchange_rate')"
            :error="errors.exchange_rate"
            required
          >
            <BaseInput v-model="form.exchangeRate" type="text" name="exchange_rate" />
            <span class="mt-1 block text-xs text-subtle">
              {{
                t('tasks_projects.billing.preview.exchange_rate_help', {
                  currency: currency?.code ?? '',
                })
              }}
            </span>
          </BaseInputGroup>
        </div>

        <div class="mt-5 overflow-hidden rounded-xl border border-line-default">
          <div class="overflow-x-auto">
            <table class="w-full table-auto">
              <thead class="bg-surface-secondary text-xs tracking-wider text-muted uppercase">
                <tr>
                  <th class="px-4 py-2 text-left font-medium">
                    {{ t('tasks_projects.billing.preview.columns.description') }}
                  </th>
                  <th class="px-4 py-2 text-right font-medium">
                    {{ t('tasks_projects.billing.preview.columns.quantity') }}
                  </th>
                  <th class="px-4 py-2 text-right font-medium">
                    {{ t('tasks_projects.billing.preview.columns.price') }}
                  </th>
                  <th class="px-4 py-2 text-right font-medium">
                    {{ t('tasks_projects.billing.preview.columns.total') }}
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-line-default bg-surface text-sm">
                <tr v-for="(item, index) in prepared.items" :key="`${item.name}-${index}`">
                  <td class="px-4 py-3">
                    <span class="font-medium text-heading">{{ item.name }}</span>
                    <span v-if="item.description" class="mt-1 block text-xs whitespace-pre-line text-subtle">
                      {{ item.description }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right whitespace-nowrap text-muted">
                    {{ item.quantity }}
                  </td>
                  <td class="px-4 py-3 text-right whitespace-nowrap text-muted">
                    <BaseFormatMoney :amount="item.price" :currency="currency" />
                  </td>
                  <td class="px-4 py-3 text-right whitespace-nowrap font-medium text-heading">
                    <BaseFormatMoney :amount="item.total" :currency="currency" />
                  </td>
                </tr>
              </tbody>

              <tfoot class="bg-surface-secondary text-sm">
                <tr>
                  <td class="px-4 py-2 text-right text-muted" colspan="3">
                    {{ t('tasks_projects.billing.preview.sub_total') }}
                  </td>
                  <td class="px-4 py-2 text-right whitespace-nowrap text-heading">
                    <BaseFormatMoney :amount="prepared.sub_total" :currency="currency" />
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-2 text-right font-semibold text-heading" colspan="3">
                    {{ t('tasks_projects.billing.preview.total') }}
                  </td>
                  <td class="px-4 py-2 text-right whitespace-nowrap font-semibold text-heading">
                    <BaseFormatMoney :amount="prepared.total" :currency="currency" />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div class="mt-5 flex items-center justify-end gap-3">
          <BaseButton variant="primary-outline" @click="step = 2">
            {{ t('tasks_projects.billing.back') }}
          </BaseButton>

          <BaseButton variant="primary" :loading="creating" :disabled="creating" @click="create">
            <template #left="slotProps">
              <BaseIcon v-if="!creating" name="DocumentPlusIcon" :class="slotProps.class" />
            </template>
            {{ t('tasks_projects.billing.preview.create') }}
          </BaseButton>
        </div>
      </template>
    </section>

    <!-- Step 4: what came back -->
    <section v-else class="mt-6">
      <div v-if="creating || stamping" class="flex flex-col items-center gap-3 py-16">
        <BaseSpinner class="h-8 w-8 text-primary-500" />
        <p class="text-sm text-muted">
          {{
            creating
              ? t('tasks_projects.billing.create.creating')
              : t('tasks_projects.billing.create.stamping')
          }}
        </p>
      </div>

      <template v-else-if="created">
        <div
          v-if="stampFailed"
          class="rounded-xl border border-status-yellow bg-surface p-5"
        >
          <p class="text-sm font-semibold text-heading">
            {{ t('tasks_projects.billing.create.stamp_failed_title') }}
          </p>
          <p class="mt-1 text-sm text-muted">
            {{
              t('tasks_projects.billing.create.stamp_failed_description', {
                number: created.invoice_number,
              })
            }}
          </p>

          <div class="mt-4 flex flex-wrap items-center gap-3">
            <BaseButton variant="primary" :loading="stamping" @click="retryStamp">
              {{ t('tasks_projects.billing.create.retry_stamp') }}
            </BaseButton>

            <router-link :to="`${INVOICE_VIEW}/${created.id}/view`">
              <BaseButton variant="white">
                {{ t('tasks_projects.billing.create.view_invoice') }}
              </BaseButton>
            </router-link>
          </div>
        </div>

        <div v-else class="rounded-xl border border-line-default bg-surface p-6 text-center">
          <BaseIcon name="CheckCircleIcon" class="mx-auto h-12 w-12 text-primary-500" />

          <p class="mt-3 text-base font-semibold text-heading">
            {{
              t('tasks_projects.billing.create.created_title', { number: created.invoice_number })
            }}
          </p>
          <p class="mt-1 text-sm text-muted">
            {{ t('tasks_projects.billing.create.created_description', { count: stamped ?? 0 }) }}
          </p>
          <p class="mt-3 text-2xl font-semibold text-heading">
            <BaseFormatMoney :amount="created.total" :currency="currency" />
          </p>

          <div class="mt-5 flex flex-wrap items-center justify-center gap-3">
            <router-link :to="`${INVOICE_VIEW}/${created.id}/view`">
              <BaseButton variant="primary">
                {{ t('tasks_projects.billing.create.view_invoice') }}
              </BaseButton>
            </router-link>

            <BaseButton variant="white" @click="startOver">
              {{ t('tasks_projects.billing.create.invoice_more') }}
            </BaseButton>
          </div>
        </div>
      </template>

      <div v-else class="flex justify-center py-16">
        <BaseButton variant="primary-outline" @click="step = 3">
          {{ t('tasks_projects.billing.back') }}
        </BaseButton>
      </div>
    </section>
  </BasePage>
</template>
