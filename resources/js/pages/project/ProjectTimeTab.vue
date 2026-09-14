<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { AxiosInstance } from 'axios'
import { listMembers } from '@/api'
import { listProjectTime, listTasks } from '@/api/board'
import { errorMessage } from '@/support/errors'
import { formatDate, formatMinutes } from '@/support/format'
import { useTranslate } from '@/support/i18n'
import type { Notify } from '@/support/page'
import type { CompanyMember } from '@/types/member'
import type { Project } from '@/types/project'
import type { Task } from '@/types/task'
import type { TimeEntry, TimeEntryListParams } from '@/types/time-entry'

interface TablePagination {
  totalPages: number
  currentPage: number
  totalCount: number
  limit: number
}

interface TableResult {
  data: TimeEntry[]
  pagination: TablePagination
}

const props = defineProps<{
  /** The route param, which arrives as a string. */
  id: string
  client: AxiosInstance
  notify: Notify
  project: Project | null
}>()

const PER_PAGE = 15

const t = useTranslate()

const members = ref<CompanyMember[]>([])
const tasks = ref<Task[]>([])

const projectId = computed(() => props.project?.id ?? Number(props.id))

const columns = computed(() => [
  { key: 'started_at', label: t('tasks_projects.project.time.columns.date'), sortable: false },
  { key: 'user', label: t('tasks_projects.project.time.columns.member'), sortable: false },
  { key: 'task', label: t('tasks_projects.project.time.columns.task'), sortable: false, thClass: 'extra' },
  { key: 'duration_minutes', label: t('tasks_projects.project.time.columns.minutes'), sortable: false },
  { key: 'billable', label: t('tasks_projects.project.time.columns.billable'), sortable: false },
  { key: 'amount', label: t('tasks_projects.project.time.columns.amount'), sortable: false, tdClass: 'text-right' },
])

onMounted(() => {
  void loadNames()
})

/** The member and task names the table shows beside every entry. */
async function loadNames(): Promise<void> {
  try {
    members.value = await listMembers(props.client)
  } catch (error: unknown) {
    props.notify('error', errorMessage(error, t('tasks_projects.tasks.members_failed')))
  }

  try {
    const response = await listTasks(props.client, { project_id: projectId.value, limit: 100 })

    tasks.value = response.data
  } catch (error: unknown) {
    props.notify('error', errorMessage(error, t('tasks_projects.tasks.load_failed')))
  }
}

async function fetchEntries({ page }: { page: number }): Promise<TableResult> {
  const params: TimeEntryListParams = { page, limit: PER_PAGE, project_id: projectId.value }

  try {
    const response = await listProjectTime(props.client, params)

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
    props.notify('error', errorMessage(error, t('tasks_projects.project.time.load_failed')))

    return {
      data: [],
      pagination: { totalPages: 1, currentPage: 1, totalCount: 0, limit: PER_PAGE },
    }
  }
}

function memberName(userId: number): string {
  return (
    members.value.find((member) => member.id === userId)?.name ??
    t('tasks_projects.project.time.removed_member')
  )
}

function taskName(taskId: number): string {
  return tasks.value.find((task) => task.id === taskId)?.name ?? `#${taskId}`
}
</script>

<template>
  <div class="relative py-4 table-container">
    <BaseTable :data="fetchEntries" :columns="columns">
      <template #cell-started_at="{ row }">
        {{ row.data.started_at ? formatDate(row.data.started_at) : '-' }}
      </template>

      <template #cell-user="{ row }">{{ memberName(row.data.user_id) }}</template>

      <template #cell-task="{ row }">
        <span class="font-medium text-heading">{{ taskName(row.data.task_id) }}</span>
        <span v-if="row.data.description" class="block text-xs text-muted">
          {{ row.data.description }}
        </span>
      </template>

      <template #cell-duration_minutes="{ row }">
        <span v-if="row.data.is_running" class="text-primary-500">
          {{ t('tasks_projects.project.time.running') }}
        </span>
        <span v-else>{{ formatMinutes(row.data.duration_minutes) }}</span>
      </template>

      <template #cell-billable="{ row }">
        <BaseIcon
          v-if="row.data.billable"
          name="CheckCircleIcon"
          class="h-5 w-5 text-status-green"
        />
        <span v-else class="text-subtle">-</span>
      </template>

      <template #cell-amount="{ row }">
        <BaseFormatMoney :amount="row.data.amount" />
      </template>
    </BaseTable>
  </div>
</template>
