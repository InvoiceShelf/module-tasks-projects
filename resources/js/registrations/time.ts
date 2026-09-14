import { defineComponent, h } from 'vue'
import type { Component } from 'vue'
import type { InvoiceShelfExtensionApi } from '@invoiceshelf/modules/frontend'
import QuickStartOverlay from '@/components/QuickStartOverlay.vue'
import TimerChip from '@/components/TimerChip.vue'
import { timeMessages } from '@/messages/time'
import TimePage from '@/pages/TimePage.vue'
import TimeSettingsPage from '@/pages/TimeSettingsPage.vue'
import { refreshSession, resetSession, session, setAdminMode } from '@/stores/session'
import { resetTaskNames } from '@/stores/tasks'
import { timerStore } from '@/stores/timer'

type NotifyType = 'success' | 'error' | 'warning' | 'info'

const MODULE = 'tasks-projects'

/** Where `registerPage` mounts the timesheet, for the links that lead to it. */
const TIME_PATH = `/admin/modules/${MODULE}/time`

/**
 * Everything the time-tracking slice contributes to the host.
 *
 * Kept in one file so `init.ts` only ever gains a line per slice: the page, the
 * header chip, the quick-start launcher, the settings page and the lifecycle
 * wiring all start here.
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

  const openTimesheet = (): void => {
    void extensions.router.push(TIME_PATH)
  }

  extensions.registerPage({
    id: 'time',
    module: MODULE,
    path: 'time',
    component: injected(extensions, TimePage),
    meta: {
      ability: `${MODULE}:view-own-time`,
      title: 'tasks_projects.time.title',
    },
  })

  extensions.registerHeaderAction({
    id: `${MODULE}.timer-chip`,
    priority: 30,
    visible: (): boolean => timerStore.running !== null,
    component: defineComponent({
      setup: () => () =>
        h(TimerChip, {
          client: extensions.client,
          notify,
          onOpen: openTimesheet,
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
          onOpenTimesheet: openTimesheet,
        }),
    }),
  })

  extensions.registerCompanySettingsPage({
    id: `${MODULE}.settings`,
    title: 'tasks_projects.settings.title',
    icon: 'ClockIcon',
    path: MODULE,
    priority: 70,
    component: injected(extensions, TimeSettingsPage),
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

/**
 * Hand a page the host services it cannot reach on its own.
 *
 * The same wrapper `init.ts` uses for the projects page: a module bundle runs
 * on the host's Vue instance but not on its Pinia or router injections, so the
 * client, the notifier and the router arrive as props, and route params arrive
 * as attrs because the host registers module pages with `props: true`.
 */
function injected(extensions: InvoiceShelfExtensionApi, page: Component): Component {
  return defineComponent({
    setup: (_props, { attrs }) => () =>
      h(page, {
        ...attrs,
        client: extensions.client,
        notify: (type: NotifyType, message: string): void => {
          extensions.notify(type, message)
        },
        router: extensions.router,
      }),
  })
}
