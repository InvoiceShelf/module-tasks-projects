<script setup lang="ts">
import type { AxiosInstance } from 'axios'
import type { Router } from 'vue-router'
import TaskStatusEditor from '@/components/TaskStatusEditor.vue'
import { useTranslate } from '@/support/i18n'

type NotifyType = 'success' | 'error' | 'warning' | 'info'

defineProps<{
  client: AxiosInstance
  notify: (type: NotifyType, message: string) => void
  /**
   * The host router, handed to every module page by the registration wrapper.
   * This page navigates with `router-link`, which resolves against the host's
   * own router, but the prop stays declared so it is not rendered as an
   * attribute on the root element.
   */
  router: Router
}>()

/**
 * Where the host keeps the generic module settings form. The four scalar
 * settings are declared in the module's PHP settings schema and edited there,
 * so this page links to it rather than mirroring the form and giving the
 * company two places to write the same value.
 */
const MODULE_SETTINGS_PATH = '/admin/settings/modules'

const t = useTranslate()
</script>

<template>
  <div class="space-y-6">
    <BaseSettingCard
      :title="t('tasks_projects.settings.general_title')"
      :description="t('tasks_projects.settings.general_description')"
    >
      <template #action>
        <router-link :to="MODULE_SETTINGS_PATH">
          <BaseButton variant="primary-outline" size="sm">
            <template #right="slotProps">
              <BaseIcon name="ArrowTopRightOnSquareIcon" :class="slotProps.class" />
            </template>
            {{ t('tasks_projects.settings.open_module_settings') }}
          </BaseButton>
        </router-link>
      </template>
    </BaseSettingCard>

    <BaseSettingCard
      :title="t('tasks_projects.settings.statuses_title')"
      :description="t('tasks_projects.settings.statuses_description')"
    >
      <TaskStatusEditor :client="client" :notify="notify" />
    </BaseSettingCard>
  </div>
</template>
