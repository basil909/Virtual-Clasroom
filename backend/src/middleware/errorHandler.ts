import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err)

  if (err instanceof ZodError) {
    res.status(400).json({ error: err.errors[0]?.message ?? 'Validation failed.' })
    return
  }

  const message = err instanceof Error ? err.message : 'Internal server error'
  const status =
    message.includes('not configured') ||
    message.includes('not connected') ||
    message.includes('not linked') ||
    message.includes('not found') ||
    message.includes('Invalid') ||
    message.includes('already exists') ||
    message.includes('required') ||
    message.includes('permission')
      ? message.includes('not found')
        ? 404
        : 400
      : message.includes('permission')
        ? 403
        : 500

  res.status(status).json({ error: message })
}
