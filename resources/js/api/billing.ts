import type { AxiosInstance } from 'axios'
import type { Wrapped } from '@/types/api'
import type {
  BillingCustomer,
  BillingGrouping,
  CompanyInvoiceDefaults,
  ConfirmItem,
  CreatedInvoice,
  CurrencyFormat,
  InvoicePayload,
  InvoiceTemplate,
  PreparedInvoice,
  UnbilledCustomer,
  UnbilledTime,
} from '@/types/billing'

const BASE = '/api/v1/tasks-projects'

/** The module endpoints the wizard talks to. */
export const BILLING_API = {
  customers: `${BASE}/billing/customers`,
  unbilled: `${BASE}/billing/unbilled`,
  prepare: `${BASE}/billing/prepare`,
  confirm: `${BASE}/billing/confirm`,
} as const

/**
 * Host endpoints, reached through the same session client.
 *
 * The invoice itself is written by the host's own endpoint rather than by the
 * module, which is what keeps the module out of the invoice tables: same
 * session, same permission checks, same validation and same numbering.
 */
export const HOST_BILLING_API = {
  bootstrap: '/api/v1/bootstrap',
  customers: '/api/v1/customers',
  invoices: '/api/v1/invoices',
  invoiceTemplates: '/api/v1/invoices/templates',
  nextNumber: '/api/v1/next-number',
  exchangeRate: (currencyId: number): string => `/api/v1/currencies/${currencyId}/exchange-rate`,
} as const

/** How many contacts the name lookup asks for. */
export const CUSTOMER_LOOKUP_LIMIT = 200

export interface UnbilledRange {
  /** `Y-m-d`, inclusive. */
  from?: string
  /** `Y-m-d`, inclusive. */
  to?: string
}

/** Who has billable time waiting, and how much of it. */
export async function listUnbilledCustomers(
  client: AxiosInstance,
  range: UnbilledRange = {},
): Promise<UnbilledCustomer[]> {
  const { data } = await client.get<Wrapped<UnbilledCustomer[]>>(BILLING_API.customers, {
    params: range,
  })

  return data.data ?? []
}

/** One customer's unbilled entries, with the four grouped views over them. */
export async function fetchUnbilledTime(
  client: AxiosInstance,
  customerId: number,
  range: UnbilledRange = {},
): Promise<UnbilledTime> {
  const { data } = await client.get<Wrapped<UnbilledTime>>(BILLING_API.unbilled, {
    params: { customer_id: customerId, ...range },
  })

  return data.data
}

/** The invoice body for a selection, plus the entries behind each line. */
export async function prepareInvoice(
  client: AxiosInstance,
  entryIds: number[],
  grouping: BillingGrouping,
): Promise<PreparedInvoice> {
  const { data } = await client.post<Wrapped<PreparedInvoice>>(BILLING_API.prepare, {
    entry_ids: entryIds,
    grouping,
  })

  return data.data
}

/**
 * Stamp the entries with the ids the host handed back.
 *
 * Idempotent, so a wizard that created the invoice and then lost the stamp can
 * offer the same call again rather than a second invoice.
 */
export async function confirmInvoice(
  client: AxiosInstance,
  invoiceId: number,
  items: ConfirmItem[],
): Promise<number> {
  const { data } = await client.post<{ stamped?: number }>(BILLING_API.confirm, {
    invoice_id: invoiceId,
    items,
  })

  return data?.stamped ?? 0
}

/** The company's contacts, for turning a customer id into a name. */
export async function listBillingCustomers(
  client: AxiosInstance,
  limit = CUSTOMER_LOOKUP_LIMIT,
): Promise<BillingCustomer[]> {
  const { data } = await client.get<Wrapped<BillingCustomer[]>>(HOST_BILLING_API.customers, {
    params: { limit },
  })

  return data.data ?? []
}

/** Create the draft invoice with the session's own client. */
export async function createInvoice(
  client: AxiosInstance,
  payload: InvoicePayload,
): Promise<CreatedInvoice> {
  const { data } = await client.post<Wrapped<CreatedInvoice>>(HOST_BILLING_API.invoices, payload)

  return data.data
}

export async function listInvoiceTemplates(client: AxiosInstance): Promise<InvoiceTemplate[]> {
  const { data } = await client.get<{ invoiceTemplates?: InvoiceTemplate[] }>(
    HOST_BILLING_API.invoiceTemplates,
  )

  return data?.invoiceTemplates ?? []
}

/**
 * The number the next invoice would carry.
 *
 * The customer goes along as `userId`, which is what the host's serial
 * numbering calls it, so a per-customer number format resolves the same way it
 * does on the host's own form.
 */
export async function fetchNextInvoiceNumber(
  client: AxiosInstance,
  customerId?: number,
): Promise<string | null> {
  const params: Record<string, string | number> = { key: 'invoice' }

  if (customerId !== undefined) {
    params.userId = customerId
  }

  const { data } = await client.get<{ success?: boolean; nextNumber?: string }>(
    HOST_BILLING_API.nextNumber,
    { params },
  )

  return data?.success && typeof data.nextNumber === 'string' ? data.nextNumber : null
}

/**
 * The rate from a customer's currency into the company's own.
 *
 * The endpoint answers a bare number, a one-element array or an error object
 * depending on whether a live provider, a logged rate or nothing at all
 * supplied it, so all three are read here and anything else becomes null.
 */
export async function fetchExchangeRate(
  client: AxiosInstance,
  currencyId: number,
): Promise<number | null> {
  const { data } = await client.get<{ exchangeRate?: unknown }>(
    HOST_BILLING_API.exchangeRate(currencyId),
  )
  const rate = Array.isArray(data?.exchangeRate) ? data.exchangeRate[0] : data?.exchangeRate
  const value = Number(rate)

  return Number.isFinite(value) && value > 0 ? value : null
}

/** The company's invoice defaults, read from the host bootstrap payload. */
export async function fetchCompanyInvoiceDefaults(
  client: AxiosInstance,
): Promise<CompanyInvoiceDefaults> {
  const { data } = await client.get<{
    current_company_settings?: Record<string, string | null>
    current_company_currency?: CurrencyFormat | null
    current_user_settings?: Record<string, string | null>
  }>(HOST_BILLING_API.bootstrap)

  const settings = data?.current_company_settings ?? {}
  const userSettings = data?.current_user_settings ?? {}
  const days = Number(settings.invoice_due_date_days)
  const template = userSettings.default_invoice_template

  return {
    currency: data?.current_company_currency ?? null,
    dueDateDays: Number.isFinite(days) && days >= 0 ? days : 0,
    setDueDateAutomatically: settings.invoice_set_due_date_automatically === 'YES',
    // Anything but an explicit NO leaves the host numbering the invoice, which
    // is what an older company with no stored value expects.
    autoGenerateNumber: settings.invoice_auto_generate !== 'NO',
    defaultTemplate: typeof template === 'string' && template !== '' ? template : null,
  }
}
