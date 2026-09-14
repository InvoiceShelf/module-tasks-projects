/**
 * Logged time, as `TimeEntryResource` renders it. Durations are minutes,
 * `rate` is minor units per hour and `amount` is the frozen money on the
 * entry, also in minor units.
 */
export interface TimeEntry {
  id: number
  company_id: number
  task_id: number
  project_id: number | null
  user_id: number
  started_at: string | null
  ended_at: string | null
  duration_minutes: number
  description: string | null
  billable: boolean
  rate: number
  amount: number
  currency_id: number | null
  is_running: boolean
  invoice_id: number | null
  invoice_item_id: number | null
  invoiced_at: string | null
  created_at: string | null
  updated_at: string | null
}

export interface TimeEntryListParams {
  page?: number
  limit?: number
  project_id?: number
  task_id?: number
  user_id?: number
  from?: string
  to?: string
}
