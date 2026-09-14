import type { AxiosInstance } from 'axios'
import type { Customer, Paginated, Wrapped } from '@/types/api'
import type { CompanyMember } from '@/types/member'
import type { ModuleSettings } from '@/types/settings'
import type { Project, ProjectInput, ProjectListParams } from '@/types/project'

/** Every module path hangs off the slug prefix, so a core route can never collide. */
export const BASE = '/api/v1/tasks-projects'

/** Every endpoint the module owns. */
export const TASKS_PROJECTS_API = {
  projects: `${BASE}/projects`,
  project: (id: number): string => `${BASE}/projects/${id}`,
  archiveProject: (id: number): string => `${BASE}/projects/${id}/archive`,
  unarchiveProject: (id: number): string => `${BASE}/projects/${id}/unarchive`,
  members: `${BASE}/members`,
  settings: `${BASE}/settings`,
} as const

/** Host endpoints the module reads through the same client. */
export const HOST_API = {
  customers: '/api/v1/customers',
} as const

export async function listProjects(
  client: AxiosInstance,
  params: ProjectListParams,
): Promise<Paginated<Project>> {
  const { data } = await client.get<Paginated<Project>>(TASKS_PROJECTS_API.projects, { params })

  return data
}

export async function createProject(client: AxiosInstance, input: ProjectInput): Promise<Project> {
  const { data } = await client.post<Wrapped<Project>>(TASKS_PROJECTS_API.projects, input)

  return data.data
}

export async function updateProject(
  client: AxiosInstance,
  id: number,
  input: ProjectInput,
): Promise<Project> {
  const { data } = await client.put<Wrapped<Project>>(TASKS_PROJECTS_API.project(id), input)

  return data.data
}

export async function archiveProject(client: AxiosInstance, id: number): Promise<Project> {
  const { data } = await client.post<Wrapped<Project>>(TASKS_PROJECTS_API.archiveProject(id))

  return data.data
}

export async function unarchiveProject(client: AxiosInstance, id: number): Promise<Project> {
  const { data } = await client.post<Wrapped<Project>>(TASKS_PROJECTS_API.unarchiveProject(id))

  return data.data
}

export async function deleteProject(client: AxiosInstance, id: number): Promise<void> {
  await client.delete(TASKS_PROJECTS_API.project(id))
}

/** The company's members, for the assignee and project member pickers. */
export async function listMembers(client: AxiosInstance): Promise<CompanyMember[]> {
  const { data } = await client.get<Wrapped<CompanyMember[]>>(TASKS_PROJECTS_API.members)

  return data.data
}

export async function fetchSettings(client: AxiosInstance): Promise<ModuleSettings> {
  const { data } = await client.get<Wrapped<ModuleSettings>>(TASKS_PROJECTS_API.settings)

  return data.data
}

/**
 * The company's contacts, for the project form's customer picker. This is a
 * host endpoint, scoped by the same `company` header the client already sends.
 */
export async function listCustomers(client: AxiosInstance, limit = 100): Promise<Customer[]> {
  const { data } = await client.get<Wrapped<Customer[]>>(HOST_API.customers, { params: { limit } })

  return data.data
}
