import { reactive } from 'vue'
import type { AxiosInstance } from 'axios'
import {
  discardTimer,
  fetchTimer,
  startTimer,
  stopTimer,
} from '@/api/time'
import { errorMessage } from '@/support/errors'
import { isConflict } from '@/support/http'
import { secondsSince } from '@/support/time'
import type { Translate } from '@/support/i18n'
import type { TimeEntry } from '@/types/time-entry'
import { ensureTaskNames } from './tasks'

/**
 * The running timer, shared by the header chip, the quick-start launcher and
 * the timesheet.
 *
 * A module bundle has no Pinia, so this is a plain reactive singleton. The
 * elapsed time is recomputed from `started_at` on every tick rather than
 * counted up, so a throttled background tab, a sleeping laptop and a clock
 * correction all land on the right number at the next tick.
 *
 * Nothing here throws at a caller: a failed refresh leaves the chip hidden
 * rather than breaking the header it renders in.
 */

type NotifyType = 'success' | 'error' | 'warning' | 'info'

/**
 * How a caller wants failures reported. The translator comes from the calling
 * component, because a store cannot reach the host's i18n on its own.
 */
export interface TimerFeedback {
  notify: (type: NotifyType, message: string) => void
  t: Translate
}

interface TimerState {
  running: TimeEntry | null
  elapsedSeconds: number
  /** True while a start, stop or discard is in flight, to disable the buttons. */
  busy: boolean
}

const state = reactive<TimerState>({
  running: null,
  elapsedSeconds: 0,
  busy: false,
})

let ticker: ReturnType<typeof setInterval> | undefined

function tick(): void {
  state.elapsedSeconds = state.running === null ? 0 : secondsSince(state.running.started_at)
}

function startTicking(): void {
  tick()

  if (ticker === undefined) {
    ticker = setInterval(tick, 1000)
  }
}

function stopTicking(): void {
  if (ticker !== undefined) {
    clearInterval(ticker)
    ticker = undefined
  }

  state.elapsedSeconds = 0
}

/** Adopt a payload as the running entry, or clear the clock when it is null. */
function adopt(entry: TimeEntry | null, client?: AxiosInstance): void {
  state.running = entry && typeof entry.id === 'number' ? entry : null

  if (state.running === null) {
    stopTicking()

    return
  }

  startTicking()

  if (client && typeof state.running.task_id === 'number') {
    void ensureTaskNames(client, [state.running.task_id])
  }
}

function report(feedback: TimerFeedback | undefined, error: unknown, key: string): void {
  feedback?.notify('error', errorMessage(error, feedback.t(key)))
}

export const timerStore = {
  /** The running entry, or null when the clock is not running. */
  get running(): TimeEntry | null {
    return state.running
  },

  /** Seconds since the running entry started, recomputed every second. */
  get elapsedSeconds(): number {
    return state.elapsedSeconds
  },

  /** True while a timer request is in flight. */
  get busy(): boolean {
    return state.busy
  },

  /** Read the caller's running entry from the server. */
  async refresh(client: AxiosInstance): Promise<void> {
    try {
      adopt(await fetchTimer(client), client)
    } catch {
      // The header chip stays hidden rather than reporting a background read.
      adopt(null)
    }
  },

  /**
   * Start the clock on a task.
   *
   * A 409 means another tab got there first, which is not an error the user
   * caused: it is reported and the real running entry is read back.
   */
  async start(
    client: AxiosInstance,
    taskId: number,
    description: string | null = null,
    feedback?: TimerFeedback,
  ): Promise<TimeEntry | null> {
    if (state.busy) {
      return null
    }

    state.busy = true

    try {
      const entry = await startTimer(client, { task_id: taskId, description })

      adopt(entry, client)

      return entry
    } catch (error: unknown) {
      if (isConflict(error)) {
        feedback?.notify('warning', feedback.t('tasks_projects.timer.already_running'))
        await this.refresh(client)
      } else {
        report(feedback, error, 'tasks_projects.timer.start_failed')
      }

      return null
    } finally {
      state.busy = false
    }
  },

  /** Close the running entry and answer the completed one. */
  async stop(client: AxiosInstance, feedback?: TimerFeedback): Promise<TimeEntry | null> {
    if (state.busy || state.running === null) {
      return null
    }

    state.busy = true

    try {
      const entry = await stopTimer(client)

      adopt(null)

      return entry
    } catch (error: unknown) {
      report(feedback, error, 'tasks_projects.timer.stop_failed')
      await this.refresh(client)

      return null
    } finally {
      state.busy = false
    }
  },

  /** Throw the running entry away without recording any time. */
  async discard(client: AxiosInstance, feedback?: TimerFeedback): Promise<boolean> {
    if (state.busy || state.running === null) {
      return false
    }

    state.busy = true

    try {
      await discardTimer(client)
      adopt(null)

      return true
    } catch (error: unknown) {
      report(feedback, error, 'tasks_projects.timer.discard_failed')
      await this.refresh(client)

      return false
    } finally {
      state.busy = false
    }
  },

  /** Forget the clock, for a company switch or a sign-out. */
  reset(): void {
    state.busy = false
    adopt(null)
  },
}
