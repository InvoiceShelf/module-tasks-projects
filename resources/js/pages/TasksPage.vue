<script setup lang="ts">
import { ref } from 'vue'
import type { AxiosInstance } from 'axios'
import TaskList from '@/components/TaskList.vue'
import { useTranslate } from '@/support/i18n'
import type { Notify } from '@/support/page'

defineProps<{
  client: AxiosInstance
  notify: Notify
}>()

const t = useTranslate()

const listRef = ref<{ openCreate: () => void } | null>(null)
</script>

<template>
  <BasePage>
    <BasePageHeader :title="t('tasks_projects.tasks.title')">
      <BaseBreadcrumb>
        <BaseBreadcrumbItem :title="t('tasks_projects.general.home')" to="/admin/dashboard" />
        <BaseBreadcrumbItem
          :title="t('tasks_projects.projects.title')"
          to="/admin/modules/tasks-projects"
        />
        <BaseBreadcrumbItem :title="t('tasks_projects.tasks.title')" to="#" active />
      </BaseBreadcrumb>

      <template #actions>
        <div class="flex items-center justify-end space-x-5">
          <router-link to="/admin/modules/tasks-projects/board">
            <BaseButton variant="white">
              <template #left="slotProps">
                <BaseIcon name="ViewColumnsIcon" :class="slotProps.class" />
              </template>
              {{ t('tasks_projects.board.title') }}
            </BaseButton>
          </router-link>

          <BaseButton variant="primary" @click="listRef?.openCreate()">
            <template #left="slotProps">
              <BaseIcon name="PlusIcon" :class="slotProps.class" />
            </template>
            {{ t('tasks_projects.tasks.new_task') }}
          </BaseButton>
        </div>
      </template>
    </BasePageHeader>

    <TaskList ref="listRef" :client="client" :notify="notify" filterable />
  </BasePage>
</template>
