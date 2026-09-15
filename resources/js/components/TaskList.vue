<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import type { AxiosInstance } from 'axios'
import { listMembers, listProjects, sortParams } from '@/api'
import type { SortParams, TableSort } from '@/api'
import { deleteTask, listTaskStatuses, listTasks } from '@/api/board'
import type { TaskSortKey } from '@/api/board'
import TaskDrawer from '@/components/TaskDrawer.vue'
import type { TaskDefaults } from '@/components/TaskDrawer.vue'
import { errorMessage } from '@/support/errors'
import { formatDate, isOverdue } from '@/support/format'
import { useTranslate } from '@/support/i18n'
import type { Notify } from '@/support/page'
import type { SelectOption } from '@/types/board'
import type { CompanyMember } from '@/types/member'
import type { Task, TaskListParams, TaskPriority } from '@/types/task'
import type { TaskStatus } from '@/types/task-status'

interface TablePagination {
  totalPages: number
  currentPage: number
  totalCount: number
  limit: number
}

interface TableResult {
  data: Task[]
  pagination: TablePagination
}

const props = defineProps<{
  client: AxiosInstance
  notify: Notify
  /** Set on a project page: the list is fixed to it and so is a new task. */
  projectId?: number | null
  /** Show the search, status and assignee filters above the table. */
  filterable?: boolean
}>()

const emit = defineEmits<{
  /** A task was created, changed or deleted, so any totals above are stale. */
  (event: 'changed'): void
}>()

const PER_PAGE = 10
const SEARCH_DEBOUNCE_MS = 350

/** Which API sort key each sortable column asks the endpoint for. */
const SORT_KEYS: Record<string, TaskSortKey> = {
  number: 'number',
  name: 'name',
  priority: 'priority',
  due_date: 'due_date',
}

const t = useTranslate()

const tableRef = ref<{ refresh: (preservePage?: boolean) => void } | null>(null)
const isFetching = ref(true)
const totalCount = ref(0)
const statuses = ref<TaskStatus[]>([])
const members = ref<CompanyMember[]>([])
const projects = ref<SelectOption[]>([])
const drawerOpen = ref(false)
const editing = ref<Task | null>(null)
const defaults = ref<TaskDefaults>({})
const busyId = ref<number | null>(null)

const filters = reactive<{ search: string; status: SelectOption | null; assignee: SelectOption | null }>({
  search: '',
  status: null,
  assignee: null,
})

const statusOptions = computed<SelectOption[]>(() =>
  statuses.value.map((status) => ({ id: status.id, label: status.name })),
)

const memberOptions = computed<SelectOption[]>(() =>
  members.value.map((member) => ({ id: member.id, label: member.name })),
)

const hasFilters = computed(
  () => filters.search.trim() !== '' || filters.status !== null || filters.assignee !== null,
)

const showEmptyScreen = computed(
  () => !isFetching.value && totalCount.value === 0 && !hasFilters.value,
)

const columns = computed(() => [
  { key: 'number', label: t('tasks_projects.tasks.columns.number'), sortable: true, sortBy: 'number', tdClass: 'text-muted' },
  { key: 'name', label: t('tasks_projects.tasks.columns.name'), sortable: true, sortBy: 'name', thClass: 'extra', tdClass: 'font-medium text-heading' },
  { key: 'status', label: t('tasks_projects.tasks.columns.status'), sortable: false },
  { key: 'assignee', label: t('tasks_projects.tasks.columns.assignee'), sortable: false },
  { key: 'priority', label: t('tasks_projects.tasks.columns.priority'), sortable: true, sortBy: 'priority' },
  { key: 'due_date', label: t('tasks_projects.tasks.columns.due_date'), sortable: true, sortBy: 'due_date' },
  { key: 'actions', label: t('tasks_projects.general.actions'), sortable: false, tdClass: 'text-right text-sm font-medium' },
])

/** Colours a priority the way the board does, so both screens read alike. */
const PRIORITY_CLASS: Record<TaskPriority, string> = {
  LOW: 'bg-surface-tertiary text-muted',
  NORMAL: 'bg-primary-50 text-primary-500',
  HIGH: 'bg-alert-warning-bg text-alert-warning-text',
  URGENT: 'bg-alert-error-bg text-alert-error-text',
}

let searchTimer: ReturnType<typeof setTimeout> | undefined

watch(
  () => filters.search,
  () => {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => refresh(), SEARCH_DEBOUNCE_MS)
  },
)

watch([() => filters.status, () => filters.assignee, () => props.projectId], () => refresh())

onMounted(() => {
  void loadPickers()
})

onBeforeUnmount(() => clearTimeout(searchTimer))

async function loadPickers(): Promise<void> {
  try {
    statuses.value = await listTaskStatuses(props.client)
  } catch (error: unknown) {
    props.notify('error', errorMessage(error, t('tasks_projects.task_statuses.load_failed')))
  }

  try {
    members.value = await listMembers(props.client)
  } catch (error: unknown) {
    props.notify('error', errorMessage(error, t('tasks_projects.tasks.members_failed')))
  }

  if (props.projectId) {
    return
  }

  try {
    const response = await listProjects(props.client, {
      limit: 100,
      status: 'ACTIVE',
      sort_by: 'name',
    })

    projects.value = response.data.map((project) => ({ id: project.id, label: project.name }))
  } catch (error: unknown) {
    props.notify('error', errorMessage(error, t('tasks_projects.tasks.projects_failed')))
  }
}

async function fetchTasks({ page, sort }: { page: number; sort?: TableSort }): Promise<TableResult> {
  const order: SortParams<TaskSortKey> = sortParams(sort, SORT_KEYS)
  const params: TaskListParams & SortParams<TaskSortKey> = { page, limit: PER_PAGE, ...order }

  if (props.projectId) {
    params.project_id = props.projectId
  }

  if (filters.status) {
    params.task_status_id = filters.status.id
  }

  if (filters.assignee) {
    params.assignee_id = filters.assignee.id
  }

  if (filters.search.trim() !== '') {
    params.search = filters.search.trim()
  }

  isFetching.value = true

  try {
    const response = await listTasks(props.client, params)

    totalCount.value = response.meta.total

    return {
      data: response.data,
      pagination: {
        totalPages: response.meta.last_page,
        currentPage: response.meta.current_page,
        totalCount: response.meta.total,
        limit: response.meta.per_page,
      },
    }
  } catch (error: unknown) {
    props.notify('error', errorMessage(error, t('tasks_projects.tasks.load_failed')))

    return {
      data: [],
      pagination: { totalPages: 1, currentPage: 1, totalCount: 0, limit: PER_PAGE },
    }
  } finally {
    isFetching.value = false
  }
}

function refresh(preservePage = false): void {
  tableRef.value?.refresh(preservePage)
}

function clearFilters(): void {
  filters.search = ''
  filters.status = null
  filters.assignee = null
}

function openCreate(): void {
  editing.value = null
  defaults.value = { project_id: props.projectId ?? null }
  drawerOpen.value = true
}

function openEdit(task: Task): void {
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
  refresh(true)
  emit('changed')
}

function onDeleted(task: Task): void {
  drawerOpen.value = false
  editing.value = null
  props.notify('success', t('tasks_projects.tasks.deleted', { name: task.name }))
  refresh(true)
  emit('changed')
}

function statusFor(task: Task): TaskStatus | null {
  return statuses.value.find((status) => status.id === task.task_status_id) ?? null
}

function assigneeName(task: Task): string {
  if (task.assignee_id === null) {
    return t('tasks_projects.tasks.unassigned')
  }

  const member = members.value.find((record) => record.id === task.assignee_id)

  return member?.name ?? `#${task.assignee_id}`
}

function priorityLabel(priority: TaskPriority): string {
  return t(`tasks_projects.tasks.priority.${priority.toLowerCase()}`)
}

function priorityClass(priority: TaskPriority): string {
  return PRIORITY_CLASS[priority]
}

async function onDelete(task: Task): Promise<void> {
  if (!window.confirm(t('tasks_projects.tasks.delete_confirm', { name: task.name }))) {
    return
  }

  busyId.value = task.id

  try {
    await deleteTask(props.client, task.id)
    props.notify('success', t('tasks_projects.tasks.deleted', { name: task.name }))
    refresh(true)
    emit('changed')
  } catch (error: unknown) {
    props.notify('error', errorMessage(error, t('tasks_projects.tasks.delete_failed')))
  } finally {
    busyId.value = null
  }
}

defineExpose({ openCreate, refresh })
</script>

<template>
  <div>
    <BaseFilterWrapper v-if="filterable" :show="true" class="mt-3" @clear="clearFilters">
      <BaseInputGroup :label="t('tasks_projects.general.search')" class="mt-2 flex-1">
        <BaseInput
          v-model="filters.search"
          type="text"
          name="search"
          autocomplete="off"
          :placeholder="t('tasks_projects.tasks.search_placeholder')"
        />
      </BaseInputGroup>

      <BaseInputGroup :label="t('tasks_projects.tasks.columns.status')" class="mt-2 flex-1">
        <BaseSelectInput
          v-model="filters.status"
          :options="statusOptions"
          :placeholder="t('tasks_projects.tasks.all_tasks')"
          label-key="label"
        />
      </BaseInputGroup>

      <BaseInputGroup :label="t('tasks_projects.tasks.columns.assignee')" class="mt-2 flex-1">
        <BaseSelectInput
          v-model="filters.assignee"
          :options="memberOptions"
          :placeholder="t('tasks_projects.board.filters.all_assignees')"
          label-key="label"
        />
      </BaseInputGroup>
    </BaseFilterWrapper>

    <BaseEmptyPlaceholder
      v-show="showEmptyScreen"
      :title="t('tasks_projects.tasks.empty_title')"
      :description="t('tasks_projects.tasks.empty_description')"
    >
      <BaseIcon name="ClipboardDocumentListIcon" class="mt-5 mb-4 h-16 w-16 text-subtle" />

      <template #actions>
        <BaseButton variant="primary" @click="openCreate">
          <template #left="slotProps">
            <BaseIcon name="PlusIcon" :class="slotProps.class" />
          </template>
          {{ t('tasks_projects.tasks.new_task') }}
        </BaseButton>
      </template>
    </BaseEmptyPlaceholder>

    <div v-show="!showEmptyScreen" class="relative table-container">
      <BaseTable ref="tableRef" :data="fetchTasks" :columns="columns" class="mt-3">
        <template #cell-number="{ row }">#{{ row.data.number }}</template>

        <template #cell-name="{ row }">
          <button type="button" class="text-left hover:text-primary-500" @click="openEdit(row.data)">
            {{ row.data.name }}
          </button>
        </template>

        <template #cell-status="{ row }">
          <span class="inline-flex items-center">
            <span
              class="mr-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              :class="statusFor(row.data)?.colour ? '' : 'bg-line-default'"
              :style="
                statusFor(row.data)?.colour
                  ? { backgroundColor: statusFor(row.data)?.colour }
                  : undefined
              "
            />
            {{ statusFor(row.data)?.name ?? '-' }}
          </span>
        </template>

        <template #cell-assignee="{ row }">
          <span :class="row.data.assignee_id === null ? 'text-subtle' : ''">
            {{ assigneeName(row.data) }}
          </span>
        </template>

        <template #cell-priority="{ row }">
          <span
            v-if="row.data.priority"
            class="rounded-full px-2 py-0.5 text-xs font-medium"
            :class="priorityClass(row.data.priority)"
          >
            {{ priorityLabel(row.data.priority) }}
          </span>
          <span v-else class="text-subtle">-</span>
        </template>

        <template #cell-due_date="{ row }">
          <span
            v-if="row.data.due_date"
            :class="
              isOverdue(row.data.due_date) && !row.data.closed_at ? 'font-medium text-status-red' : ''
            "
          >
            {{ formatDate(row.data.due_date) }}
          </span>
          <span v-else class="text-subtle">-</span>
        </template>

        <template #cell-actions="{ row }">
          <BaseDropdown :content-loading="busyId === row.data.id">
            <template #activator>
              <BaseIcon name="EllipsisHorizontalIcon" class="h-5 text-muted" />
            </template>

            <BaseDropdownItem @click="openEdit(row.data)">
              <BaseIcon name="PencilIcon" class="mr-3 h-5 w-5 text-subtle group-hover:text-muted" />
              {{ t('tasks_projects.general.edit') }}
            </BaseDropdownItem>

            <BaseDropdownItem @click="onDelete(row.data)">
              <BaseIcon name="TrashIcon" class="mr-3 h-5 w-5 text-subtle group-hover:text-muted" />
              {{ t('tasks_projects.general.delete') }}
            </BaseDropdownItem>
          </BaseDropdown>
        </template>
      </BaseTable>
    </div>

    <TaskDrawer
      :show="drawerOpen"
      :client="client"
      :notify="notify"
      :task="editing"
      :statuses="statuses"
      :members="members"
      :projects="projects"
      :defaults="defaults"
      :lock-project="Boolean(projectId)"
      @close="drawerOpen = false"
      @saved="onSaved"
      @deleted="onDeleted"
    />
  </div>
</template>
