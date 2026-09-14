/** A task as `TaskResource` renders it. Money is integer minor units. */

export const TASK_PRIORITIES = ['LOW', 'NORMAL', 'HIGH', 'URGENT'] as const

export type TaskPriority = (typeof TASK_PRIORITIES)[number]

export interface Task {
  id: number
  company_id: number
  project_id: number | null
  /** Denormalised from the project, or set directly on a standalone task. */
  customer_id: number | null
  task_status_id: number
  /** A per-company sequence, for referring to a task in an email. */
  number: number
  name: string
  description: string | null
  assignee_id: number | null
  priority: TaskPriority | null
  due_date: string | null
  estimated_minutes: number | null
  billable: boolean
  /** Minor units per hour, overriding the member and project rates. */
  rate: number | null
  /** Fractional board order, kept as a string so no float rewrites it. */
  board_position: string
  closed_at: string | null
  creator_id: number | null
  created_at: string | null
  updated_at: string | null
}

/**
 * What the create and update endpoints accept.
 *
 * `task_status_id` is never null: the update rule takes an integer, and the
 * drawer always has a column selected.
 */
export interface TaskInput {
  name: string
  task_status_id: number
  project_id: number | null
  customer_id: number | null
  description: string | null
  assignee_id: number | null
  priority: TaskPriority | null
  due_date: string | null
  estimated_minutes: number | null
  billable: boolean
  rate: number | null
}

export interface TaskListParams {
  page?: number
  limit?: number
  project_id?: number
  assignee_id?: number
  task_status_id?: number
  customer_id?: number
  search?: string
}

/** Where a dragged card landed: its new column and the two tasks around it. */
export interface TaskMoveInput {
  task_status_id: number
  before_id: number | null
  after_id: number | null
}
