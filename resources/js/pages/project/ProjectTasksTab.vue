<script setup lang="ts">
import { computed, ref } from 'vue'
import type { AxiosInstance } from 'axios'
import TaskList from '@/components/TaskList.vue'
import { useTranslate } from '@/support/i18n'
import type { Notify } from '@/support/page'
import type { Project } from '@/types/project'

const props = defineProps<{
  /** The route param, which arrives as a string. */
  id: string
  client: AxiosInstance
  notify: Notify
  project: Project | null
}>()

const emit = defineEmits<{ (event: 'refresh'): void }>()

const t = useTranslate()

const listRef = ref<{ openCreate: () => void } | null>(null)

const projectId = computed(() => props.project?.id ?? Number(props.id))

/** A new or deleted task changes the counts the overview shows. */
function onChanged(): void {
  emit('refresh')
}
</script>

<template>
  <div class="py-4">
    <div class="flex justify-end">
      <BaseButton variant="primary" @click="listRef?.openCreate()">
        <template #left="slotProps">
          <BaseIcon name="PlusIcon" :class="slotProps.class" />
        </template>
        {{ t('tasks_projects.tasks.new_task') }}
      </BaseButton>
    </div>

    <TaskList
      ref="listRef"
      :client="client"
      :notify="notify"
      :project-id="projectId"
      filterable
      @changed="onChanged"
    />
  </div>
</template>
