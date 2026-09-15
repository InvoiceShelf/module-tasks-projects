<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { AxiosInstance } from 'axios'
import Sortable from 'sortablejs'
import type { SortableEvent } from 'sortablejs'
import { listMembers, listProjects } from '@/api'
import { fetchBoard, moveTask } from '@/api/board'
import TaskDrawer from '@/components/TaskDrawer.vue'
import type { TaskDefaults } from '@/components/TaskDrawer.vue'
import { customerName, ensureLoaded } from '@/stores/customers'
import { errorMessage } from '@/support/errors'
import { formatDate, initials, isOverdue } from '@/support/format'
import { useTranslate } from '@/support/i18n'
import type { Notify } from '@/support/page'
import type { BoardColumn, BoardParams, SelectOption } from '@/types/board'
import type { CompanyMember } from '@/types/member'
import type { Project } from '@/types/project'
import type { Task, TaskPriority } from '@/types/task'
import type { TaskStatus } from '@/types/task-status'

const props = defineProps<{
  client: AxiosInstance
  notify: Notify
}>()

const t = useTranslate()

const columns = ref<BoardColumn[]>([])
const members = ref<CompanyMember[]>([])
const projectRecords = ref<Project[]>([])
const loading = ref(true)
const projectFilter = ref<SelectOption | null>(null)
const assigneeFilter = ref<SelectOption | null>(null)
const drawerOpen = ref(false)
const editing = ref<Task | null>(null)
const defaults = ref<TaskDefaults>({})

/** Colours a priority the way the task list does, so both screens read alike. */
const PRIORITY_CLASS: Record<TaskPriority, string> = {
  LOW: 'bg-surface-tertiary text-muted',
  NORMAL: 'bg-primary-50 text-primary-500',
  HIGH: 'bg-alert-warning-bg text-alert-warning-text',
  URGENT: 'bg-alert-error-bg text-alert-error-text',
}

/**
 * One Sortable per column, keyed by status id.
 *
 * The column element is keyed by the same id in the template, so an instance
 * outlives every board refresh and is rebuilt only when its element really is
 * a new one.
 */
const sortables = new Map<number, Sortable>()
const columnElements = new Map<number, HTMLElement>()

/**
 * A drag ends with a click on the card that was dragged, which would open the
 * drawer on top of the move. The flag is cleared a tick after the drop, once
 * that click has been and gone.
 */
let dragging = false

const projectOptions = computed<SelectOption[]>(() =>
  projectRecords.value.map((project) => ({ id: project.id, label: project.name })),
)

const memberOptions = computed<SelectOption[]>(() =>
  members.value.map((member) => ({ id: member.id, label: member.name })),
)

const statuses = computed<TaskStatus[]>(() => columns.value.map((column) => column.status))

const isEmpty = computed(() => !loading.value && columns.value.length === 0)

watch([projectFilter, assigneeFilter], () => {
  void loadBoard()
})

onMounted(() => {
  void loadPickers()
  void loadBoard()
})

onBeforeUnmount(() => {
  for (const sortable of sortables.values()) {
    sortable.destroy()
  }

  sortables.clear()
  columnElements.clear()
})

async function loadPickers(): Promise<void> {
  try {
    const response = await listProjects(props.client, {
      limit: 100,
      status: 'ACTIVE',
      sort_by: 'name',
    })

    projectRecords.value = response.data
  } catch (error: unknown) {
    props.notify('error', errorMessage(error, t('tasks_projects.tasks.projects_failed')))
  }

  try {
    members.value = await listMembers(props.client)
  } catch (error: unknown) {
    props.notify('error', errorMessage(error, t('tasks_projects.tasks.members_failed')))
  }
}

async function loadBoard(): Promise<void> {
  const params: BoardParams = {}

  if (projectFilter.value) {
    params.project_id = projectFilter.value.id
  }

  if (assigneeFilter.value) {
    params.assignee_id = assigneeFilter.value.id
  }

  loading.value = true

  try {
    columns.value = await fetchBoard(props.client, params)

    // Only a board that shows a contact is worth one lookup of the address book.
    if (columns.value.some((column) => column.tasks.some((task) => task.customer_id !== null))) {
      void ensureLoaded(props.client)
    }
  } catch (error: unknown) {
    props.notify('error', errorMessage(error, t('tasks_projects.board.load_failed')))
  } finally {
    loading.value = false
  }
}

/**
 * Attach a Sortable to a column list, and let go of the one it replaces.
 *
 * Vue calls this on every render of the v-for, so the element is compared
 * before anything is torn down.
 */
function setColumnRef(statusId: number, element: unknown): void {
  const list = element instanceof HTMLElement ? element : null

  if (columnElements.get(statusId) === list) {
    return
  }

  sortables.get(statusId)?.destroy()
  sortables.delete(statusId)
  columnElements.delete(statusId)

  if (list === null) {
    return
  }

  columnElements.set(statusId, list)
  sortables.set(
    statusId,
    Sortable.create(list, {
      group: 'tasks',
      animation: 150,
      draggable: '[data-task-id]',
      ghostClass: 'opacity-40',
      onStart: (): void => {
        dragging = true
      },
      onEnd: (event: SortableEvent): void => {
        void onDrop(event)
        setTimeout(() => {
          dragging = false
        })
      },
    }),
  )
}

/**
 * Put the dragged card back where it started.
 *
 * Sortable moves the node itself, which would leave Vue's list out of step
 * with the DOM. Undoing the move first makes the model the only writer: the
 * splices below re-render the card in its new home.
 */
function restoreDom(event: SortableEvent): void {
  const item = event.item
  const oldIndex = event.oldIndex ?? 0

  item.parentNode?.removeChild(item)
  event.from.insertBefore(item, event.from.children[oldIndex] ?? null)
}

function columnFor(statusId: number): BoardColumn | undefined {
  return columns.value.find((column) => column.status.id === statusId)
}

async function onDrop(event: SortableEvent): Promise<void> {
  const fromId = Number((event.from as HTMLElement).dataset.statusId)
  const toId = Number((event.to as HTMLElement).dataset.statusId)
  const oldIndex = event.oldIndex ?? 0
  const newIndex = event.newIndex ?? 0

  restoreDom(event)

  if (Number.isNaN(fromId) || Number.isNaN(toId)) {
    return
  }

  if (fromId === toId && oldIndex === newIndex) {
    return
  }

  const from = columnFor(fromId)
  const to = columnFor(toId)

  if (!from || !to) {
    return
  }

  const previous = { from: [...from.tasks], to: [...to.tasks] }
  const [task] = from.tasks.splice(oldIndex, 1)

  if (!task) {
    from.tasks = previous.from

    return
  }

  to.tasks.splice(newIndex, 0, task)

  const before = to.tasks[newIndex - 1] ?? null
  const after = to.tasks[newIndex + 1] ?? null

  try {
    const moved = await moveTask(props.client, task.id, {
      task_status_id: toId,
      before_id: before?.id ?? null,
      after_id: after?.id ?? null,
    })

    Object.assign(task, moved)

    if (fromId !== toId) {
      props.notify(
        'success',
        t('tasks_projects.board.moved', { name: task.name, status: to.status.name }),
      )
    }
  } catch (error: unknown) {
    from.tasks = previous.from
    to.tasks = previous.to
    props.notify('error', errorMessage(error, t('tasks_projects.board.move_failed')))
  }
}

function openCreate(status: TaskStatus): void {
  editing.value = null
  defaults.value = {
    task_status_id: status.id,
    project_id: projectFilter.value?.id ?? null,
  }
  drawerOpen.value = true
}

function openEdit(task: Task): void {
  if (dragging) {
    return
  }

  editing.value = task
  defaults.value = {}
  drawerOpen.value = true
}

function onSaved(task: Task): void {
  const message = editing.value
    ? t('tasks_projects.tasks.updated', { name: task.name })
    : t('tasks_projects.tasks.created', { name: task.name })

  drawerOpen.value = false
  editing.value = null
  props.notify('success', message)
  void loadBoard()
}

function onDeleted(task: Task): void {
  drawerOpen.value = false
  editing.value = null
  props.notify('success', t('tasks_projects.tasks.deleted', { name: task.name }))
  void loadBoard()
}

function clearFilters(): void {
  projectFilter.value = null
  assigneeFilter.value = null
}

function projectIdentifier(task: Task): string | null {
  if (task.project_id === null) {
    return null
  }

  const project = projectRecords.value.find((record) => record.id === task.project_id)

  return project?.identifier || project?.name || null
}

/**
 * What the project badge says in full: the project, and the contact the work
 * is billed to when the module knows its name. The card itself stays short.
 */
function projectTooltip(task: Task): string {
  const project = projectRecords.value.find((record) => record.id === task.project_id)

  return [project?.name, customerName(task.customer_id)].filter(Boolean).join(' \u00b7 ')
}

function assigneeInitials(task: Task): string | null {
  if (task.assignee_id === null) {
    return null
  }

  const member = members.value.find((record) => record.id === task.assignee_id)

  return member ? initials(member.name) : `#${task.assignee_id}`
}

function assigneeName(task: Task): string {
  if (task.assignee_id === null) {
    return t('tasks_projects.tasks.unassigned')
  }

  return members.value.find((record) => record.id === task.assignee_id)?.name ?? `#${task.assignee_id}`
}

function priorityLabel(priority: TaskPriority): string {
  return t(`tasks_projects.tasks.priority.${priority.toLowerCase()}`)
}

function priorityClass(priority: TaskPriority): string {
  return PRIORITY_CLASS[priority]
}
</script>

<template>
  <BasePage>
    <BasePageHeader :title="t('tasks_projects.board.title')">
      <BaseBreadcrumb>
        <BaseBreadcrumbItem :title="t('tasks_projects.general.home')" to="/admin/dashboard" />
        <BaseBreadcrumbItem
          :title="t('tasks_projects.projects.title')"
          to="/admin/modules/tasks-projects"
        />
        <BaseBreadcrumbItem :title="t('tasks_projects.board.title')" to="#" active />
      </BaseBreadcrumb>

      <template #actions>
        <div class="flex items-center justify-end space-x-5">
          <router-link to="/admin/modules/tasks-projects">
            <BaseButton variant="white">
              <template #left="slotProps">
                <BaseIcon name="FolderIcon" :class="slotProps.class" />
              </template>
              {{ t('tasks_projects.projects.title') }}
            </BaseButton>
          </router-link>
        </div>
      </template>
    </BasePageHeader>

    <BaseFilterWrapper :show="true" class="mt-4" @clear="clearFilters">
      <BaseInputGroup :label="t('tasks_projects.board.filters.project')" class="mt-2 flex-1">
        <BaseSelectInput
          v-model="projectFilter"
          :options="projectOptions"
          :placeholder="t('tasks_projects.board.filters.all_projects')"
          label-key="label"
        />
      </BaseInputGroup>

      <BaseInputGroup :label="t('tasks_projects.board.filters.assignee')" class="mt-2 flex-1">
        <BaseSelectInput
          v-model="assigneeFilter"
          :options="memberOptions"
          :placeholder="t('tasks_projects.board.filters.all_assignees')"
          label-key="label"
        />
      </BaseInputGroup>
    </BaseFilterWrapper>

    <div v-if="loading && columns.length === 0" class="flex justify-center py-16">
      <BaseSpinner class="h-8 w-8 text-primary-500" />
    </div>

    <BaseEmptyPlaceholder
      v-else-if="isEmpty"
      :title="t('tasks_projects.task_statuses.none')"
      :description="t('tasks_projects.tasks.empty_description')"
    >
      <BaseIcon name="ViewColumnsIcon" class="mt-5 mb-4 h-16 w-16 text-subtle" />
    </BaseEmptyPlaceholder>

    <div v-else class="flex items-start gap-4 overflow-x-auto pb-4">
      <section
        v-for="column in columns"
        :key="column.status.id"
        class="w-72 shrink-0 rounded-xl border border-line-default bg-surface-secondary"
      >
        <header
          class="flex items-center justify-between border-b border-line-light px-3 py-2.5"
        >
          <div class="flex items-center">
            <span
              class="mr-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              :class="column.status.colour ? '' : 'bg-line-default'"
              :style="column.status.colour ? { backgroundColor: column.status.colour } : undefined"
            />
            <h3 class="text-sm font-semibold text-heading">{{ column.status.name }}</h3>
            <span class="ml-2 text-xs text-muted">{{ column.tasks.length }}</span>
          </div>

          <button
            type="button"
            class="rounded-md p-1 text-subtle hover:bg-hover hover:text-body"
            :aria-label="t('tasks_projects.tasks.new_task')"
            :title="t('tasks_projects.tasks.new_task')"
            @click="openCreate(column.status)"
          >
            <BaseIcon name="PlusIcon" class="h-4 w-4" />
          </button>
        </header>

        <div
          :ref="(element) => setColumnRef(column.status.id, element)"
          :data-status-id="column.status.id"
          class="min-h-[80px] space-y-2 px-3 pt-3"
        >
          <article
            v-for="task in column.tasks"
            :key="task.id"
            :data-task-id="task.id"
            class="cursor-pointer rounded-lg border border-line-default bg-surface p-3 shadow-sm hover:bg-hover"
            @click="openEdit(task)"
          >
            <div class="flex items-start justify-between gap-2">
              <p class="text-sm font-medium text-heading">{{ task.name }}</p>
              <span
                v-if="task.priority"
                class="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium"
                :class="priorityClass(task.priority)"
              >
                {{ priorityLabel(task.priority) }}
              </span>
            </div>

            <div class="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
              <span>#{{ task.number }}</span>
              <span
                v-if="projectIdentifier(task)"
                class="rounded-sm bg-surface-tertiary px-1.5 py-0.5 text-[11px] text-body"
                :title="projectTooltip(task)"
              >
                {{ projectIdentifier(task) }}
              </span>
              <span v-if="task.billable" class="inline-flex items-center text-body">
                <BaseIcon name="CurrencyDollarIcon" class="mr-0.5 h-3.5 w-3.5" />
                {{ t('tasks_projects.tasks.billable') }}
              </span>
            </div>

            <div class="mt-3 flex items-center justify-between">
              <span
                v-if="task.due_date"
                class="text-xs"
                :class="
                  isOverdue(task.due_date) && !task.closed_at
                    ? 'font-medium text-status-red'
                    : 'text-muted'
                "
              >
                {{ formatDate(task.due_date) }}
              </span>
              <span v-else class="text-xs text-subtle">-</span>

              <span
                v-if="assigneeInitials(task)"
                class="flex h-6 w-6 items-center justify-center rounded-full bg-primary-50 text-[11px] font-semibold text-primary-500"
                :title="assigneeName(task)"
              >
                {{ assigneeInitials(task) }}
              </span>
            </div>
          </article>
        </div>

        <p v-if="column.tasks.length === 0" class="px-3 pt-2 text-xs text-subtle">
          {{ t('tasks_projects.board.empty_column') }}
        </p>

        <div class="px-3 pt-2 pb-3">
          <button
            type="button"
            class="w-full rounded-md border border-dashed border-line-default py-1.5 text-xs text-muted hover:bg-hover hover:text-body"
            @click="openCreate(column.status)"
          >
            + {{ t('tasks_projects.tasks.new_task') }}
          </button>
        </div>
      </section>
    </div>

    <TaskDrawer
      :show="drawerOpen"
      :client="client"
      :notify="notify"
      :task="editing"
      :statuses="statuses"
      :members="members"
      :projects="projectOptions"
      :defaults="defaults"
      @close="drawerOpen = false"
      @saved="onSaved"
      @deleted="onDeleted"
    />
  </BasePage>
</template>
