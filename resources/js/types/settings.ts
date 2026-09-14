/** The module's per-company settings, as the settings endpoint renders them. */
export interface ModuleSettings {
  /** Minor units per hour. */
  default_rate: number
  rounding_minutes: number
  week_start: number
  members_see_all_time: boolean
  rounding_increments: number[]
}
