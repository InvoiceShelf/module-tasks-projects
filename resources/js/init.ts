import { defineComponent, h } from 'vue'
import type { Component } from 'vue'
import type { InvoiceShelfExtensionApi } from '@invoiceshelf/modules/frontend'
import '../css/module.css'
import { messages } from './messages'
import ProjectsIndexPage from './pages/ProjectsIndexPage.vue'
import { registerTimeTracking } from './registrations/time'
import { registerBoardPages } from './registrations/board'
import { registerBillingPages } from './registrations/billing'

const MODULE = 'tasks-projects'

window.InvoiceShelf.booting((_app, _router, extensions) => {
  extensions.addMessages(messages)

  extensions.registerPage({
    id: 'projects',
    module: MODULE,
    path: '',
    component: injected(extensions, ProjectsIndexPage),
    meta: {
      ability: `${MODULE}:view-project`,
      title: 'tasks_projects.projects.title',
    },
  })

  registerTimeTracking(extensions)
  registerBoardPages(extensions)
  registerBillingPages(extensions)
})

/**
 * Hand a page the host services it cannot reach on its own.
 *
 * A module bundle runs on the host's Vue instance but not on its Pinia or
 * router injections, so the client, the notifier and the router arrive as
 * props. Route params arrive as attrs, because the host registers module
 * pages with `props: true`.
 */
function injected(extensions: InvoiceShelfExtensionApi, page: Component): Component {
  return defineComponent({
    setup: (_props, { attrs }) => () =>
      h(page, {
        ...attrs,
        client: extensions.client,
        notify: (type: 'success' | 'error' | 'warning' | 'info', message: string): void => {
          extensions.notify(type, message)
        },
        router: extensions.router,
      }),
  })
}
