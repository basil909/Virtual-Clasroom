import { z } from 'zod'

const PlatformEnum = z.enum(['video', 'teams'])

export const ClassSessionSchema = z.object({
  id: z.string(),
  title: z.string(),
  startTime: z.string(),
  status: z.string(),
  platform: PlatformEnum,
  joinUrl: z.string(),
  recordingUrl: z.string().optional(),
})

export const ClassSessionArray = z.array(ClassSessionSchema)

const UserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  role: z.union([z.literal('admin'), z.literal('teacher'), z.literal('student')]).optional(),
})

const safeRead = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback

  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback

    return JSON.parse(raw) as T
  } catch (err) {
    console.error('storage.safeRead parse error', key, err)
    return fallback
  }
}

const safeWrite = <T>(key: string, value: T) => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error('storage.safeWrite error', key, err)
  }
}

export const getClasses = () => {
  const raw = safeRead<unknown>('classes', [])

  const parsed = ClassSessionArray.safeParse(raw)

  if (!parsed.success) {
    console.warn('getClasses: invalid classes shape, resetting', parsed.error)
    safeWrite('classes', [])
    return [] as z.infer<typeof ClassSessionArray>
  }

  return parsed.data
}

export const saveClasses = (classes: z.infer<typeof ClassSessionArray>) => {
  safeWrite('classes', classes)
}

export const addClass = (cls: z.infer<typeof ClassSessionSchema>) => {
  const current = getClasses()
  const next = [cls, ...current]
  saveClasses(next)
  return next
}

export const completeClass = (joinUrlMatch: string, recordingUrl?: string) => {
  const current = getClasses()

  const updated = current.map((c) => {
    if (c.joinUrl && c.joinUrl.includes(joinUrlMatch)) {
      return {
        ...c,
        status: 'completed',
        recordingUrl: recordingUrl ?? c.recordingUrl,
      }
    }

    return c
  })

  saveClasses(updated)
  return updated
}

export const addRecording = (classId: string, recordingUrl: string) => {
  const current = getClasses()
  const updated = current.map((c) =>
    c.id === classId ? { ...c, recordingUrl, status: 'completed' } : c
  )

  saveClasses(updated)
  return updated
}

export const getUser = () => {
  const raw = safeRead<unknown>('user', null)

  if (!raw) return null

  const parsed = UserSchema.safeParse(raw)
  if (!parsed.success) {
    console.warn('getUser: invalid user shape, clearing')
    safeWrite('user', null)
    return null
  }

  return parsed.data
}

export default {
  getClasses,
  saveClasses,
  addClass,
  completeClass,
  addRecording,
  getUser,
}
