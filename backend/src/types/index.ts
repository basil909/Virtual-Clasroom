export type UserRole = 'admin' | 'teacher' | 'student'

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  subject: string | null
  bio: string | null
  rating: number | null
  createdAt: string
}

export type UserWithPassword = User & { passwordHash: string }

export type Course = {
  id: string
  title: string
  description: string | null
  instructorId: string
  instructorName: string
  level: string
  duration: string
  rating: number
  studentCount: number
}

export type Assignment = {
  id: string
  courseId: string
  courseTitle: string
  title: string
  description: string | null
  dueDate: string
  createdBy: string
  status?: 'pending' | 'submitted' | 'graded'
  grade?: string | null
}

export type ClassSession = {
  id: string
  title: string
  description: string | null
  teacherId: string
  teacherEmail: string | null
  courseId: string | null
  startTime: string
  endTime: string
  status: 'scheduled' | 'live' | 'ended'
  teamsMeetingId: string | null
  joinUrl: string | null
  createdAt: string
}

export type MicrosoftTokenRecord = {
  userId: string
  accessToken: string
  tokenCache: string
  expiresAt: number
  accountEmail: string | null
  accountName: string | null
}

export type TeamsMeeting = {
  id: string
  subject: string
  startDateTime: string
  endDateTime: string
  joinWebUrl?: string
}

export type PricingPlan = {
  id: string
  name: string
  price: string
  period: string
  description: string
  features: string[]
  highlighted: boolean
}

export type AdminStats = {
  students: number
  teachers: number
  courses: number
  liveSessions: number
  recordings: number
}

export type JwtPayload = {
  sub: string
  email: string
  role: UserRole
}
