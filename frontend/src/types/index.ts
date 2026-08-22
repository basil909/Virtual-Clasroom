export type UserRole = 'admin' | 'teacher' | 'student'

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
}

export type Feature = {
  id: number
  title: string
  description: string
}
