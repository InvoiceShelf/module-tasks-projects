import { defineComponent, h } from 'vue'
import type { InvoiceShelfExtensionApi } from '@invoiceshelf/modules/frontend'
import QuickStartOverlay from '@/components/QuickStartOverlay.vue'
import TimerChip from '@/components/TimerChip.vue'
import { timeMessages } from '@/messages/time'
import TimeSettingsPage from '@/pages/TimeSettingsPage.vue'
import { refreshSession, resetSession, session, setAdminMode } from '@/stores/session'
import { resetTaskNames } from '@/stores/tasks'
import { timerStore } from '@/stores/timer'
import { MODULE, PATHS, injectedPage } from '@/support/page'
import type { NotifyType } from '@/support/page'

/**
 * What the time-tracking slice contributes to the host.
 *
 * The timesheet itself is the Week view of the Tasks screen now, so this file
 * keeps what has no screen of its own: the header chip, the quick-start
 * launcher, the settings page and the lifecycle wiring.
 *
 * Nothing in this function talks to the network. Pinia is not installed when
 * the boot callback runs, so the first read waits for `bootstrap:completed`,
 * and every later company switch clears the previous company's answers before
 * asking again.
 */
export function registerTimeTracking(extensions: InvoiceShelfExtensionApi): void {
  extensions.addMessages(timeMessages)

  const notify = (type: NotifyType, message: string): void => {
    extensions.notify(type, message)
  }

  const openWeek = (): void => {
    void extensions.router.push(PATHS.week)
  }

  /**
   * The chip leads to the work, not to the timesheet.
   *
   * What someone wants when they look at a running clock is the thing it is
   * running on: the task, its time log and the stop button beside them. The
   * week grid is one click further, on the same screen's Week view.
   */
  const openRunningTask = (): void => {
    const taskId = timerStore.runningTaskId

    void extensions.router.push(taskId === null ? PATHS.week : PATHS.task(taskId))
  }

  extensions.registerHeaderAction({
    id: `${MODULE}.timer-chip`,
    priority: 30,
    visible: (): boolean => timerStore.running !== null,
    component: defineComponent({
      setup: () => () =>
        h(TimerChip, {
          client: extensions.client,
          notify,
          onOpen: openRunningTask,
        }),
    }),
  })

  extensions.registerCompanyLayoutOverlay({
    id: `${MODULE}.quick-start`,
    component: defineComponent({
      setup: () => () =>
        h(QuickStartOverlay, {
          // A company switch starts the launcher clean rather than carrying a
          // half-typed search from the workspace the user just left.
          key: session.companySession,
          client: extensions.client,
          notify,
          enabled: !session.adminMode,
          onOpenWeek: openWeek,
        }),
    }),
  })

  extensions.registerCompanySettingsPage({
    id: `${MODULE}.settings`,
    title: 'tasks_projects.settings.title',
    icon: 'ClockIcon',
    path: MODULE,
    priority: 70,
    component: injectedPage(extensions, TimeSettingsPage),
  })

  extensions.on('bootstrap:completed', ({ adminMode }) => {
    void enter(extensions, adminMode)
  })

  extensions.on('company:changing', () => {
    leave()
  })

  extensions.on('company:changed', ({ companyId }) => {
    void enter(extensions, companyId === null)
  })
}

/** Read the company's settings and the caller's running timer. */
async function enter(extensions: InvoiceShelfExtensionApi, adminMode: boolean): Promise<void> {
  setAdminMode(adminMode)

  if (adminMode) {
    leave()

    return
  }

  await refreshSession(extensions.client)
  await timerStore.refresh(extensions.client)
}

/** Forget the previous company: its timer, its task names and its settings. */
function leave(): void {
  timerStore.reset()
  resetTaskNames()
  resetSession()
}
