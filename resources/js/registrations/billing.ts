import type { InvoiceShelfExtensionApi } from '@invoiceshelf/modules/frontend'
import { billingMessages } from '@/messages/billing'
import BillingPage from '@/pages/BillingPage.vue'
import { injectedPage } from '@/support/page'

const MODULE = 'tasks-projects'

/**
 * The task-to-invoice wizard.
 *
 * One file for the slice, the way the board and the time screens are
 * registered, so `init.ts` only ever gains a line per slice and two slices
 * never edit the same lines. The wizard is a single page: its four steps are
 * one screen's state rather than four routes, because a half-finished
 * selection is not something to leave in the address bar.
 */
export function registerBillingPages(extensions: InvoiceShelfExtensionApi): void {
  extensions.addMessages(billingMessages)

  extensions.registerPage({
    id: 'billing',
    module: MODULE,
    path: 'billing',
    component: injectedPage(extensions, BillingPage),
    meta: {
      ability: `${MODULE}:invoice-tasks`,
      title: 'tasks_projects.billing.title',
    },
  })
}
