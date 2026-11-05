import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
  }
}

function statusFromMessage(message: string): number {
  if (message === 'Invalid email or password.') return 401
  if (message.includes('not found')) return 404
  if (message.includes('already exists')) return 409
  if (message.includes('permission')) return 403
  if (
    message.includes('not configured') ||
    message.includes('not connected') ||
    message.includes('not linked') ||
    message.includes('Invalid') ||
    message.includes('required')
  ) {
    return 400
  }
  return 500
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    const issue = err.errors[0]
    const field = issue?.path.join('.')
    res.status(400).json({
      error: issue ? `${field ? `${field}: ` : ''}${issue.message}` : 'Validation failed.',
    })
    return
  }

  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message })
    return
  }

  // Errors from express/body-parser (malformed JSON, payload too large, ...)
  const httpStatus = (err as { status?: number } | null)?.status
  if (typeof httpStatus === 'number' && httpStatus >= 400 && httpStatus < 500) {
    res.status(httpStatus).json({
      error: httpStatus === 400 ? 'Malformed request body.' : 'Request could not be processed.',
    })
    return
  }

  const message = err instanceof Error ? err.message : 'Internal server error'
  const status = statusFromMessage(message)

  if (status === 500) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error.' })
    return
  }

  res.status(status).json({ error: message })
}
