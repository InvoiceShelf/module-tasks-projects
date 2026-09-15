<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { AxiosInstance } from 'axios'
import type { Router } from 'vue-router'
import { searchTasks } from '@/api/time'
import { rememberTask, taskLabel } from '@/stores/tasks'
import { timerStore } from '@/stores/timer'
import { errorMessage } from '@/support/errors'
import { useTranslate } from '@/support/i18n'
import { formatClock, formatDuration } from '@/support/time'
import type { TaskSummary } from '@/types/task-summary'

type NotifyType = 'success' | 'error' | 'warning' | 'info'

/** The aria-label the AI assistant module puts on its own launcher button. */
const AI_ASSISTANT_SELECTOR = '[aria-label="Open AI Assistant"]'

/** Settings screens run long forms the launcher would sit on top of. */
const HIDDEN_PATH_PREFIX = '/admin/settings'

const props = defineProps<{
  client: AxiosInstance
  notify: (type: NotifyType, message: string) => void
  /** False in platform administration, where no company is active. */
  enabled: boolean
  /** The host router: a module bundle cannot call `useRouter()`. */
  router: Router
}>()

const emit = defineEmits<{
  (event: 'open-week'): void
}>()

const SEARCH_DEBOUNCE_MS = 300

const t = useTranslate()

const open = ref(false)
const search = ref('')
const results = ref<TaskSummary[]>([])
const searching = ref(false)
const picked = ref<TaskSummary | null>(null)
const description = ref('')

/** The current path, read from the host router and kept up to date on every navigation. */
const currentPath = ref(window.location.pathname)

/** Whether the AI assistant's launcher floats in the same corner as this one. */
const aiAssistantFloats = ref(false)

let searchTimer: ReturnType<typeof setTimeout> | undefined
let stopWatchingRoute: (() => void) | undefined

const feedback = computed(() => ({ notify: props.notify, t }))

const runningLabel = computed<string>(() => taskLabel(timerStore.running?.task_id ?? null))

const elapsed = computed<string>(() => formatClock(timerStore.elapsedSeconds))

/**
 * Long settings forms, such as the status editor, run the full height of the
 * page: a fixed launcher sitting on top of them hides the last rows and the
 * save button, so the launcher steps aside there rather than everywhere.
 */
const hiddenHere = computed<boolean>(() => currentPath.value.startsWith(HIDDEN_PATH_PREFIX))

/**
 * Clear the bottom of the AI assistant's own launcher when it floats in the
 * same corner, so the two buttons do not stack on top of each other.
 */
const wrapperClass = computed<string>(() => (aiAssistantFloats.value ? 'bottom-36' : 'bottom-20'))

/**
 * Look for a launcher that is actually in the way.
 *
 * The assistant ships its launcher either in the page header or as a bubble of
 * its own, and only the second one shares this corner, so the layout is asked
 * rather than the selector believed. The look is repeated on every navigation
 * because a module registers its header action from a script the host loads
 * alongside this one, which a single look at mount time can miss.
 */
function probeAiAssistant(): void {
  aiAssistantFloats.value = Array.from(document.querySelectorAll(AI_ASSISTANT_SELECTOR)).some(
    (launcher) => window.getComputedStyle(launcher).position === 'fixed',
  )
}

watch(
  () => props.enabled,
  (enabled) => {
    if (!enabled) {
      close()
    }
  },
)

onMounted(() => {
  currentPath.value = props.router.currentRoute.value.path
  stopWatchingRoute = props.router.afterEach((to) => {
    currentPath.value = to.path
    probeAiAssistant()
  })

  probeAiAssistant()
})

watch(open, (isOpen) => {
  if (isOpen && timerStore.running === null) {
    void runSearch()
  }
})

watch(search, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => void runSearch(), SEARCH_DEBOUNCE_MS)
})

onBeforeUnmount(() => {
  clearTimeout(searchTimer)
  stopWatchingRoute?.()
})

async function runSearch(): Promise<void> {
  searching.value = true

  try {
    const tasks = await searchTasks(props.client, search.value)

    results.value = tasks
    tasks.forEach(rememberTask)
  } catch (error: unknown) {
    results.value = []
    props.notify('error', errorMessage(error, t('tasks_projects.time.tasks_failed')))
  } finally {
    searching.value = false
  }
}

function pick(task: TaskSummary): void {
  picked.value = task
  rememberTask(task)
}

function close(): void {
  open.value = false
  search.value = ''
  results.value = []
  picked.value = null
  description.value = ''
}

async function start(): Promise<void> {
  const task = picked.value

  if (task === null) {
    return
  }

  const entry = await timerStore.start(
    props.client,
    task.id,
    description.value.trim() || null,
    feedback.value,
  )

  if (entry !== null) {
    props.notify('success', t('tasks_projects.timer.started', { name: task.name }))
    close()
  }
}

async function stop(): Promise<void> {
  const name = runningLabel.value
  const entry = await timerStore.stop(props.client, feedback.value)

  if (entry !== null) {
    props.notify(
      'success',
      t('tasks_projects.timer.stopped', {
        name,
        duration: formatDuration(entry.duration_minutes),
      }),
    )
    close()
  }
}

async function discard(): Promise<void> {
  if (!window.confirm(t('tasks_projects.timer.discard_confirm'))) {
    return
  }

  if (await timerStore.discard(props.client, feedback.value)) {
    props.notify('success', t('tasks_projects.timer.discarded'))
    close()
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="enabled && !hiddenHere"
      class="fixed right-6 z-40 flex flex-col items-end gap-3"
      :class="wrapperClass"
    >
      <section
        v-if="open"
        class="w-80 max-w-[calc(100vw-3rem)] rounded-xl border border-line-default bg-surface shadow-2xl"
        :aria-label="t('tasks_projects.timer.panel_title')"
        @keydown.esc="close"
      >
        <header class="flex items-center justify-between border-b border-line-default px-4 py-3">
          <h2 class="text-sm font-semibold text-heading">
            {{ t('tasks_projects.timer.panel_title') }}
          </h2>

          <button
            type="button"
            class="rounded p-1 text-subtle hover:bg-hover hover:text-heading"
            :aria-label="t('tasks_projects.timer.close')"
            @click="close"
          >
            <BaseIcon name="XMarkIcon" class="h-5 w-5" />
          </button>
        </header>

        <!-- Running: show what is on the clock and how to end it. -->
        <div v-if="timerStore.running !== null" class="space-y-4 px-4 py-4">
          <div>
            <p class="truncate text-sm font-medium text-heading">{{ runningLabel }}</p>
            <p class="mt-1 text-2xl font-semibold tabular-nums text-primary-500">{{ elapsed }}</p>
            <p v-if="timerStore.running.description" class="mt-1 text-xs text-muted">
              {{ timerStore.running.description }}
            </p>
          </div>

          <div class="flex items-center gap-2">
            <BaseButton variant="primary" :disabled="timerStore.busy" @click="stop">
              <template #left="slotProps">
                <BaseIcon name="StopIcon" :class="slotProps.class" />
              </template>
              {{ t('tasks_projects.timer.stop') }}
            </BaseButton>

            <BaseButton variant="primary-outline" :disabled="timerStore.busy" @click="discard">
              {{ t('tasks_projects.timer.discard') }}
            </BaseButton>
          </div>
        </div>

        <!-- Idle: pick a task and say what the time is for. -->
        <div v-else class="space-y-3 px-4 py-4">
          <label class="block">
            <span class="sr-only">{{ t('tasks_projects.timer.search_tasks') }}</span>
            <input
              v-model="search"
              type="search"
              autocomplete="off"
              class="w-full rounded-md border border-line-default bg-surface px-3 py-2 text-sm text-body outline-hidden focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
              :placeholder="t('tasks_projects.timer.search_tasks')"
            >
          </label>

          <p v-if="searching" class="text-xs text-muted">{{ t('tasks_projects.general.search') }}</p>

          <ul v-else-if="results.length > 0" class="max-h-48 space-y-1 overflow-y-auto">
            <li v-for="task in results" :key="task.id">
              <button
                type="button"
                class="w-full truncate rounded-md px-2 py-2 text-left text-sm hover:bg-hover"
                :class="picked?.id === task.id ? 'bg-hover-strong font-medium text-heading' : 'text-body'"
                @click="pick(task)"
              >
                {{ task.name }}
              </button>
            </li>
          </ul>

          <p v-else class="text-xs text-muted">{{ t('tasks_projects.timer.no_tasks') }}</p>

          <input
            v-model="description"
            type="text"
            class="w-full rounded-md border border-line-default bg-surface px-3 py-2 text-sm text-body outline-hidden focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
            :placeholder="t('tasks_projects.timer.description_placeholder')"
            :aria-label="t('tasks_projects.time.fields.description')"
          >

          <div class="flex items-center justify-between">
            <button
              type="button"
              class="text-xs text-primary-500 hover:underline"
              @click="emit('open-week')"
            >
              {{ t('tasks_projects.timer.open_timesheet') }}
            </button>

            <BaseButton
              variant="primary"
              :disabled="picked === null || timerStore.busy"
              @click="start"
            >
              <template #left="slotProps">
                <BaseIcon name="PlayIcon" :class="slotProps.class" />
              </template>
              {{ t('tasks_projects.timer.start') }}
            </BaseButton>
          </div>
        </div>
      </section>

      <button
        type="button"
        class="flex items-center gap-2 rounded-full bg-btn-primary px-4 py-3 text-sm font-medium text-white shadow-lg hover:bg-btn-primary-hover"
        :title="t('tasks_projects.timer.quick_start')"
        :aria-label="t('tasks_projects.timer.quick_start')"
        @click="open = !open"
      >
        <BaseIcon :name="timerStore.running === null ? 'ClockIcon' : 'StopIcon'" class="h-5 w-5 text-white" />
        <span v-if="timerStore.running !== null" class="tabular-nums">{{ elapsed }}</span>
      </button>
    </div>
  </Teleport>
</template>
