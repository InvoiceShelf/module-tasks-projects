import type { TimeEntry } from './time-entry'

/**
 * The timer endpoint answers with the caller's running entry or with null, so
 * the payload is wrapped rather than a bare resource.
 */
export interface RunningTimer {
  data: TimeEntry | null
}

/** What `timer/start` accepts. */
export interface StartTimerInput {
  task_id: number
  description?: string | null
}
