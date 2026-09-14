import type { InvoiceShelfExtensionApi } from '@invoiceshelf/modules/frontend'
import { boardMessages } from '@/messages/board'
import BoardPage from '@/pages/BoardPage.vue'
import ProjectDetailPage from '@/pages/ProjectDetailPage.vue'
import ProjectMembersTab from '@/pages/project/ProjectMembersTab.vue'
import ProjectOverviewTab from '@/pages/project/ProjectOverviewTab.vue'
import ProjectTasksTab from '@/pages/project/ProjectTasksTab.vue'
import ProjectTimeTab from '@/pages/project/ProjectTimeTab.vue'
import TasksPage from '@/pages/TasksPage.vue'
import { injectedPage } from '@/support/page'

const MODULE = 'tasks-projects'

const ability = {
  viewProject: `${MODULE}:view-project`,
  editProject: `${MODULE}:edit-project`,
  viewTask: `${MODULE}:view-task`,
  viewOwnTime: `${MODULE}:view-own-time`,
} as const

/**
 * The board, the task screens and the project detail.
 *
 * They are registered from here rather than from `init.ts` so that a slice of
 * the module owns one file: adding a screen never means editing the same lines
 * another slice is editing. The strings come along for the ride, because the
 * host merges message bundles recursively.
 */
export function registerBoardPages(extensions: InvoiceShelfExtensionApi): void {
  extensions.addMessages(boardMessages)

  extensions.registerPage({
    id: 'board',
    module: MODULE,
    path: 'board',
    component: injectedPage(extensions, BoardPage),
    meta: {
      ability: ability.viewTask,
      title: 'tasks_projects.board.title',
    },
  })

  extensions.registerPage({
    id: 'tasks',
    module: MODULE,
    path: 'tasks',
    component: injectedPage(extensions, TasksPage),
    meta: {
      ability: ability.viewTask,
      title: 'tasks_projects.tasks.title',
    },
  })

  extensions.registerPage({
    id: 'project',
    module: MODULE,
    path: 'projects/:id',
    component: injectedPage(extensions, ProjectDetailPage),
    meta: {
      ability: ability.viewProject,
      title: 'tasks_projects.projects.title',
    },
    children: [
      {
        id: 'overview',
        path: '',
        component: injectedPage(extensions, ProjectOverviewTab),
        meta: {
          ability: ability.viewProject,
          title: 'tasks_projects.project.tabs.overview',
        },
      },
      {
        id: 'tasks',
        path: 'tasks',
        component: injectedPage(extensions, ProjectTasksTab),
        meta: {
          ability: ability.viewTask,
          title: 'tasks_projects.project.tabs.tasks',
        },
      },
      {
        id: 'time',
        path: 'time',
        component: injectedPage(extensions, ProjectTimeTab),
        meta: {
          ability: ability.viewOwnTime,
          title: 'tasks_projects.project.tabs.time',
        },
      },
      {
        id: 'members',
        path: 'members',
        component: injectedPage(extensions, ProjectMembersTab),
        meta: {
          ability: ability.editProject,
          title: 'tasks_projects.project.tabs.members',
        },
      },
    ],
  })
}
