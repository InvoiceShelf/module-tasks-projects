import { defineComponent, h } from 'vue'
import type { Component } from 'vue'
import type { InvoiceShelfExtensionApi } from '@invoiceshelf/modules/frontend'

export type NotifyType = 'success' | 'error' | 'warning' | 'info'

export type Notify = (type: NotifyType, message: string) => void

/**
 * Hand a page the host services it cannot reach on its own.
 *
 * A module bundle runs on the host's Vue instance but not on its Pinia or
 * router injections, so the client, the notifier and the router arrive as
 * props. Route params arrive as attrs, because the host registers module pages
 * with `props: true`, and a tab page also receives whatever its parent passes
 * through `<router-view>`.
 */
export function injectedPage(
  extensions: InvoiceShelfExtensionApi,
  page: Component,
): Component {
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
