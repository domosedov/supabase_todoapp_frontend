export class ApiError extends Error {
  constructor(message?: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }

  status?: number
}

export class PostgrestError extends Error {
  constructor(message?: string, details?: string, hint?: string, code?: string) {
    super(message)
    this.name = 'PostgrestError'
    this.details = details
    this.hint = hint
    this.code = code
  }

  details?: string
  hint?: string
  code?: string
}

export function isApiError(error: Error): error is ApiError {
  return error instanceof ApiError
}

export function isPostgrestError(error: Error): error is PostgrestError {
  return error instanceof PostgrestError
}
