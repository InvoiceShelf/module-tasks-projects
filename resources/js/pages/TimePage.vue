<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { AxiosInstance } from 'axios'
import type { Router } from 'vue-router'
import { listProjects } from '@/api'
import { deleteTimeEntry, listTimeEntries, listTimeMembers } from '@/api/time'
import AllTimeTable from '@/components/AllTimeTable.vue'
import TimeEntryModal from '@/components/TimeEntryModal.vue'
import WeekTimesheet from '@/components/WeekTimesheet.vue'
import { refreshSession, session } from '@/stores/session'
import { timerStore } from '@/stores/timer'
import { errorMessage } from '@/support/errors'
import { useTranslate } from '@/support/i18n'
import { formatLocalDate } from '@/support/time'
import type { CompanyMember } from '@/types/member'
import type { Project } from '@/types/project'
import type { TimeEntry } from '@/types/time-entry'

type NotifyType = 'success' | 'error' | 'warning' | 'info'
type TimeTab = 'MINE' | 'ALL'

const props = defineProps<{
  client: AxiosInstance
  notify: (type: NotifyType, message: string) => void
  /** The host router, for links out of the module. */
  router: Router
}>()

/** How many rows the "can I see other members" probe asks for. */
const PROBE_LIMIT = 5

const t = useTranslate()

const tab = ref<TimeTab>('MINE')
const canSeeAll = ref(false)
const members = ref<CompanyMember[]>([])
const projects = ref<Project[]>([])
const modalOpen = ref(false)
const editing = ref<TimeEntry | null>(null)
const modalDate = ref(formatLocalDate(new Date()))
const reloadToken = ref(0)

const weekStart = computed<number>(() => session.settings.week_start)

const userId = computed<number | null>(() => session.userId)

onMounted(() => void load())

async function load(): Promise<void> {
  if (session.userId === null) {
    await refreshSession(props.client)
  }

  canSeeAll.value = session.settings.members_see_all_time || (await seesOtherMembers())

  if (canSeeAll.value) {
    await Promise.all([loadMembers(), loadProjects()])
  }
}

/**
 * Whether the "All time" tab is worth showing.
 *
 * The API narrows the list to the caller's own rows when they may not see more,
 * so asking for a page without a `user_id` filter and finding someone else's
 * entry is the honest answer. It needs no extra endpoint and cannot lie the
 * other way: a tab is only offered when rows really do come back.
 */
async function seesOtherMembers(): Promise<boolean> {
  try {
    const response = await listTimeEntries(props.client, { limit: PROBE_LIMIT })

    return (response.data ?? []).some((entry) => entry.user_id !== session.userId)
  } catch {
    return false
  }
}

async function loadMembers(): Promise<void> {
  try {
    members.value = await listTimeMembers(props.client)
  } catch {
    // The member filter falls back to ids; reading members needs view-project.
    members.value = []
  }
}

async function loadProjects(): Promise<void> {
  try {
    const response = await listProjects(props.client, { limit: 100 })

    projects.value = response.data ?? []
  } catch {
    projects.value = []
  }
}

function openCreate(date?: string): void {
  editing.value = null
  modalDate.value = date ?? formatLocalDate(new Date())
  modalOpen.value = true
}

function openEdit(entry: TimeEntry): void {
  editing.value = entry
  modalOpen.value = true
}

function onSaved(): void {
  const message = editing.value
    ? t('tasks_projects.time.updated')
    : t('tasks_projects.time.created')

  modalOpen.value = false
  editing.value = null
  props.notify('success', message)
  reloadToken.value += 1
}

function onDeleted(): void {
  modalOpen.value = false
  editing.value = null
  props.notify('success', t('tasks_projects.time.deleted'))
  reloadToken.value += 1
}

async function removeEntry(entry: TimeEntry): Promise<void> {
  if (!window.confirm(t('tasks_projects.time.delete_confirm'))) {
    return
  }

  try {
    await deleteTimeEntry(props.client, entry.id)
    props.notify('success', t('tasks_projects.time.deleted'))
    reloadToken.value += 1
  } catch (error: unknown) {
    props.notify('error', errorMessage(error, t('tasks_projects.time.delete_failed')))
  }
}

function tabClass(value: TimeTab): string {
  return tab.value === value
    ? 'border-primary-500 text-primary-500'
    : 'border-transparent text-muted hover:border-line-strong hover:text-heading'
}
</script>

<template>
  <BasePage>
    <BasePageHeader :title="t('tasks_projects.time.title')">
      <BaseBreadcrumb>
        <BaseBreadcrumbItem :title="t('tasks_projects.general.home')" to="/admin/dashboard" />
        <BaseBreadcrumbItem
          :title="t('tasks_projects.projects.title')"
          to="/admin/modules/tasks-projects"
        />
        <BaseBreadcrumbItem :title="t('tasks_projects.time.title')" to="#" active />
      </BaseBreadcrumb>

      <template #actions>
        <div class="flex items-center justify-end space-x-5">
          <span
            v-if="timerStore.running !== null"
            class="hidden items-center gap-2 text-sm text-muted sm:flex"
          >
            <BaseIcon name="ClockIcon" class="h-4 w-4 text-primary-500" />
            {{ t('tasks_projects.timer.running') }}
          </span>

          <router-link to="/admin/modules/tasks-projects/billing">
            <BaseButton variant="white">
              <template #left="slotProps">
                <BaseIcon name="BanknotesIcon" :class="slotProps.class" />
              </template>
              {{ t('tasks_projects.billing.invoice_time') }}
            </BaseButton>
          </router-link>

          <BaseButton variant="primary" @click="openCreate()">
            <template #left="slotProps">
              <BaseIcon name="PlusIcon" :class="slotProps.class" />
            </template>
            {{ t('tasks_projects.time.add_entry') }}
          </BaseButton>
        </div>
      </template>
    </BasePageHeader>

    <nav v-if="canSeeAll" class="mt-4 flex gap-6 border-b border-line-default">
      <button
        type="button"
        class="-mb-px border-b-2 px-1 pb-3 text-sm font-medium"
        :class="tabClass('MINE')"
        @click="tab = 'MINE'"
      >
        {{ t('tasks_projects.time.my_time') }}
      </button>

      <button
        type="button"
        class="-mb-px border-b-2 px-1 pb-3 text-sm font-medium"
        :class="tabClass('ALL')"
        @click="tab = 'ALL'"
      >
        {{ t('tasks_projects.time.all_time') }}
      </button>
    </nav>

    <WeekTimesheet
      v-if="tab === 'MINE'"
      :client="client"
      :notify="notify"
      :user-id="userId"
      :week-start="weekStart"
      :reload-token="reloadToken"
      @add="openCreate"
      @edit="openEdit"
    />

    <AllTimeTable
      v-else
      :client="client"
      :notify="notify"
      :members="members"
      :projects="projects"
      :reload-token="reloadToken"
      @edit="openEdit"
      @delete="removeEntry"
    />

    <TimeEntryModal
      :show="modalOpen"
      :client="client"
      :notify="notify"
      :entry="editing"
      :default-date="modalDate"
      @close="modalOpen = false"
      @saved="onSaved"
      @deleted="onDeleted"
    />
  </BasePage>
</template>
