<script setup lang="ts">
import { computed } from 'vue'
import { formatMinutes } from '@/support/format'
import { useTranslate } from '@/support/i18n'
import type { Project, ProjectTotals } from '@/types/project'

const props = defineProps<{
  /** Handed down by the project detail page, which owns the fetch. */
  project: Project | null
}>()

const t = useTranslate()

const totals = computed<ProjectTotals | null>(() => props.project?.totals ?? null)

const budgetMinutes = computed(() => props.project?.budget_minutes ?? null)

/** How much of the budget the logged time has eaten, clamped for the bar. */
const budgetPercent = computed(() => {
  const budget = budgetMinutes.value
  const logged = totals.value?.logged_minutes ?? 0

  if (!budget) {
    return 0
  }

  return Math.min(100, Math.round((logged / budget) * 100))
})

const overBudgetMinutes = computed(() => {
  const budget = budgetMinutes.value
  const logged = totals.value?.logged_minutes ?? 0

  return budget && logged > budget ? logged - budget : 0
})
</script>

<template>
  <div v-if="project && totals" class="py-6">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-xl border border-line-default bg-surface p-5">
        <p class="text-xs font-medium tracking-wider text-muted uppercase">
          {{ t('tasks_projects.project.overview.tasks') }}
        </p>
        <p class="mt-2 text-2xl font-semibold text-heading">{{ totals.tasks.total }}</p>
        <p class="mt-1 text-xs text-muted">
          {{ t('tasks_projects.project.overview.open_tasks', { count: totals.tasks.open }) }}
          &middot;
          {{ t('tasks_projects.project.overview.closed_tasks', { count: totals.tasks.closed }) }}
        </p>
      </div>

      <div class="rounded-xl border border-line-default bg-surface p-5">
        <p class="text-xs font-medium tracking-wider text-muted uppercase">
          {{ t('tasks_projects.project.overview.logged') }}
        </p>
        <p class="mt-2 text-2xl font-semibold text-heading">
          {{ formatMinutes(totals.logged_minutes) }}
        </p>
        <p class="mt-1 text-xs text-muted">
          {{ t('tasks_projects.project.overview.billable') }}:
          {{ formatMinutes(totals.billable_minutes) }}
        </p>
      </div>

      <div class="rounded-xl border border-line-default bg-surface p-5">
        <p class="text-xs font-medium tracking-wider text-muted uppercase">
          {{ t('tasks_projects.project.overview.billable_amount') }}
        </p>
        <p class="mt-2 text-2xl font-semibold text-heading">
          <BaseFormatMoney :amount="totals.billable_amount" />
        </p>
      </div>

      <div class="rounded-xl border border-line-default bg-surface p-5">
        <p class="text-xs font-medium tracking-wider text-muted uppercase">
          {{ t('tasks_projects.project.overview.unbilled_amount') }}
        </p>
        <p class="mt-2 text-2xl font-semibold text-heading">
          <BaseFormatMoney :amount="totals.unbilled_amount" />
        </p>
      </div>
    </div>

    <div class="mt-4 rounded-xl border border-line-default bg-surface p-5">
      <p class="text-xs font-medium tracking-wider text-muted uppercase">
        {{ t('tasks_projects.project.overview.budget') }}
      </p>

      <template v-if="budgetMinutes">
        <p class="mt-2 text-sm text-body">
          {{
            t('tasks_projects.project.overview.budget_used', {
              used: formatMinutes(totals.logged_minutes),
              total: formatMinutes(budgetMinutes),
            })
          }}
        </p>

        <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-tertiary">
          <div
            class="h-2 rounded-full"
            :class="overBudgetMinutes > 0 ? 'bg-status-red' : 'bg-primary-500'"
            :style="{ width: `${budgetPercent}%` }"
          />
        </div>

        <p v-if="overBudgetMinutes > 0" class="mt-2 text-xs font-medium text-status-red">
          {{
            t('tasks_projects.project.overview.budget_over', {
              amount: formatMinutes(overBudgetMinutes),
            })
          }}
        </p>
      </template>

      <p v-else class="mt-2 text-sm text-subtle">
        {{ t('tasks_projects.project.overview.no_budget') }}
      </p>
    </div>

    <div class="mt-4 rounded-xl border border-line-default bg-surface p-5">
      <p class="text-xs font-medium tracking-wider text-muted uppercase">
        {{ t('tasks_projects.project.overview.description') }}
      </p>
      <p v-if="project.description" class="mt-2 text-sm whitespace-pre-line text-body">
        {{ project.description }}
      </p>
      <p v-else class="mt-2 text-sm text-subtle">
        {{ t('tasks_projects.project.overview.no_description') }}
      </p>
    </div>
  </div>

  <div v-else class="flex justify-center py-16">
    <BaseSpinner class="h-8 w-8 text-primary-500" />
  </div>
</template>
