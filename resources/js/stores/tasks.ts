import { reactive } from 'vue'
import type { AxiosInstance } from 'axios'
import { fetchTask } from '@/api/time'
import type { TaskSummary } from '@/types/task-summary'

/**
 * A name for every task id the time screens display.
 *
 * `TimeEntryResource` carries `task_id` and nothing else, so a timesheet row,
 * the header chip and the entry editor would all show a bare number. The cache
 * fills in the names, once per task per company session, and a task that
 * cannot be read keeps its id as the label rather than blanking the row.
 */

const names = reactive<Record<number, string>>({})
const pending = new Set<number>()

/** How many name lookups may be in flight at once. */
const BATCH_SIZE = 5

/** The cached name, or a stable `#id` placeholder to render meanwhile. */
export function taskLabel(id: number | null): string {
  if (id === null) {
    return ''
  }

  return names[id] ?? `#${id}`
}

/** Remember a task the caller already holds, so no lookup is needed. */
export function rememberTask(task: TaskSummary | null | undefined): void {
  if (task && typeof task.id === 'number' && typeof task.name === 'string') {
    names[task.id] = task.name
  }
}

/**
 * Make sure every id given has a name, fetching the ones that do not.
 *
 * Failures are swallowed on purpose: a missing name is cosmetic, and the
 * timesheet must render even when one task has been deleted under it.
 */
export async function ensureTaskNames(client: AxiosInstance, ids: number[]): Promise<void> {
  const wanted = [...new Set(ids)].filter(
    (id) => typeof id === 'number' && names[id] === undefined && !pending.has(id),
  )

  for (const id of wanted) {
    pending.add(id)
  }

  for (let index = 0; index < wanted.length; index += BATCH_SIZE) {
    await Promise.all(
      wanted.slice(index, index + BATCH_SIZE).map(async (id) => {
        try {
          rememberTask(await fetchTask(client, id))
        } catch {
          // A task that cannot be read keeps its id as its label.
        } finally {
          pending.delete(id)
        }
      }),
    )
  }
}

/** Drop everything: task ids belong to one company. */
export function resetTaskNames(): void {
  for (const key of Object.keys(names)) {
    delete names[Number(key)]
  }

  pending.clear()
}
