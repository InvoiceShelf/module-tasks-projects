/** One column of the board, as `TaskStatusResource` renders it. */
export interface TaskStatus {
  id: number
  name: string
  colour: string | null
  position: number
  is_default: boolean
  is_closed: boolean
}

/** What the create and update endpoints accept. */
export interface TaskStatusInput {
  name?: string
  colour?: string | null
  is_default?: boolean
  is_closed?: boolean
}
