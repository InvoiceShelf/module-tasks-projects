import type { AxiosInstance } from 'axios'
import { BASE, HOST_API, TASKS_PROJECTS_API } from '@/api'
import type { Customer, Paginated, Wrapped } from '@/types/api'
import type { BoardColumn, BoardParams } from '@/types/board'
import type { Project } from '@/types/project'
import type { ProjectMember, ProjectMemberInput } from '@/types/project-member'
import type { Task, TaskInput, TaskListParams, TaskMoveInput } from '@/types/task'
import type { TaskStatus } from '@/types/task-status'
import type { TimeEntry, TimeEntryListParams } from '@/types/time-entry'

/** The endpoints the board, the task lists and the project detail read. */
export const BOARD_API = {
  board: `${BASE}/board`,
  tasks: `${BASE}/tasks`,
  task: (id: number): string => `${BASE}/tasks/${id}`,
  moveTask: (id: number): string => `${BASE}/tasks/${id}/move`,
  taskStatuses: `${BASE}/task-statuses`,
  timeEntries: `${BASE}/time-entries`,
  projectMembers: (projectId: number): string => `${BASE}/projects/${projectId}/members`,
  projectMember: (projectId: number, userId: number): string =>
    `${BASE}/projects/${projectId}/members/${userId}`,
} as const

/** Every column of the company with its tasks, in one request. */
export async function fetchBoard(
  client: AxiosInstance,
  params: BoardParams,
): Promise<BoardColumn[]> {
  const { data } = await client.get<Wrapped<BoardColumn[]>>(BOARD_API.board, { params })

  return data.data
}

/** The board columns on their own, for the drawer's status picker. */
export async function listTaskStatuses(client: AxiosInstance): Promise<TaskStatus[]> {
  const { data } = await client.get<Wrapped<TaskStatus[]>>(BOARD_API.taskStatuses)

  return data.data
}

export async function listTasks(
  client: AxiosInstance,
  params: TaskListParams,
): Promise<Paginated<Task>> {
  const { data } = await client.get<Paginated<Task>>(BOARD_API.tasks, { params })

  return data
}

export async function createTask(client: AxiosInstance, input: TaskInput): Promise<Task> {
  const { data } = await client.post<Wrapped<Task>>(BOARD_API.tasks, input)

  return data.data
}

export async function updateTask(
  client: AxiosInstance,
  id: number,
  input: TaskInput,
): Promise<Task> {
  const { data } = await client.put<Wrapped<Task>>(BOARD_API.task(id), input)

  return data.data
}

export async function deleteTask(client: AxiosInstance, id: number): Promise<void> {
  await client.delete(BOARD_API.task(id))
}

/**
 * Drop a task between two neighbours of a column.
 *
 * The server owns the ordering: it returns the task with the `board_position`
 * it settled on, which the board applies rather than guessing one itself.
 */
export async function moveTask(
  client: AxiosInstance,
  id: number,
  input: TaskMoveInput,
): Promise<Task> {
  const { data } = await client.post<Wrapped<Task>>(BOARD_API.moveTask(id), input)

  return data.data
}

/** One project with the totals only the detail endpoint carries. */
export async function fetchProject(client: AxiosInstance, id: number): Promise<Project> {
  const { data } = await client.get<Wrapped<Project>>(TASKS_PROJECTS_API.project(id))

  return data.data
}

export async function listProjectMembers(
  client: AxiosInstance,
  projectId: number,
): Promise<ProjectMember[]> {
  const { data } = await client.get<Wrapped<ProjectMember[]>>(BOARD_API.projectMembers(projectId))

  return data.data
}

export async function attachProjectMember(
  client: AxiosInstance,
  projectId: number,
  input: ProjectMemberInput,
): Promise<ProjectMember> {
  const { data } = await client.post<Wrapped<ProjectMember>>(
    BOARD_API.projectMembers(projectId),
    input,
  )

  return data.data
}

export async function detachProjectMember(
  client: AxiosInstance,
  projectId: number,
  userId: number,
): Promise<void> {
  await client.delete(BOARD_API.projectMember(projectId, userId))
}

/** The time logged against one project, for the read-only detail tab. */
export async function listProjectTime(
  client: AxiosInstance,
  params: TimeEntryListParams,
): Promise<Paginated<TimeEntry>> {
  const { data } = await client.get<Paginated<TimeEntry>>(BOARD_API.timeEntries, { params })

  return data
}

/**
 * One host contact, for the name the project header shows.
 *
 * A project detail only ever knows the customer id, and the contact may have
 * been deleted since, so the caller falls back to `#id` on failure.
 */
export async function fetchCustomer(client: AxiosInstance, id: number): Promise<Customer> {
  const { data } = await client.get<Wrapped<Customer>>(`${HOST_API.customers}/${id}`)

  return data.data
}
