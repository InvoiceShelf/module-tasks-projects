/**
 * The status of a failed request, read structurally.
 *
 * The module bundle runs on the host's axios instance and never imports axios
 * at runtime, so the error is inspected rather than narrowed with
 * `axios.isAxiosError`. A missing or unparseable response answers null, which
 * callers treat as "some other failure".
 */
export function errorStatus(error: unknown): number | null {
  if (typeof error !== 'object' || error === null) {
    return null
  }

  const status = (error as { response?: { status?: unknown } }).response?.status

  return typeof status === 'number' ? status : null
}

/** A 409 from `timer/start`: someone else's tab already started the clock. */
export function isConflict(error: unknown): boolean {
  return errorStatus(error) === 409
}

/** A 403: the caller lacks the ability the endpoint asks for. */
export function isForbidden(error: unknown): boolean {
  return errorStatus(error) === 403
}
