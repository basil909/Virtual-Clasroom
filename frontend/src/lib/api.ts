const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

export type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'teacher' | 'student'
}

export type ClassSession = {
  id: string
  title: string
  description: string | null
  teacherId: string
  teacherEmail: string | null
  courseId?: string | null
  startTime: string
  endTime: string
  status?: string
  teamsMeetingId: string | null
  joinUrl: string | null
  createdAt: string
}

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
  progress?: number
}

export type Teacher = {
  id: string
  name: string
  subject: string | null
  students: number
  rating: number
  bio: string | null
}

export type Assignment = {
  id: string
  courseId: string
  courseTitle: string
  title: string
  description: string | null
  dueDate: string
  status?: string
  grade?: string | null
  submissionCount?: number
}

export type ChatMessage = {
  id: string
  userId: string
  user: string
  text: string
  createdAt: string
}

export type TeamsStatus = {
  connected: boolean
  accountEmail: string | null
  accountName: string | null
  serverConfigured: boolean
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('skillx_token')
}

async function request<T>(
  path: string,
  options?: RequestInit,
  revalidateSeconds?: number
): Promise<T> {
  const token = getToken()
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    ...(typeof window === 'undefined' && revalidateSeconds
      ? { next: { revalidate: revalidateSeconds } }
      : {}),
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error ?? `Request failed (${res.status})`)
  }
  return data as T
}

export const api = {
  health: () => request<{ status: string; teamsConfigured: boolean }>('/api/health'),

  login: (email: string, password: string) =>
    request<{ user: User; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string, role: User['role']) =>
    request<{ user: User; token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    }),

  me: () => request<{ user: User }>('/api/auth/me'),

  courses: () =>
    request<{ courses: Course[] }>('/api/courses', undefined, 60),
  teachers: () => request<{ teachers: Teacher[] }>('/api/teachers'),
  pricing: () =>
    request<{ plans: Array<{ id: string; name: string; price: string; period: string; description: string; features: string[]; highlighted: boolean }> }>('/api/pricing'),

  myCourses: () => request<{ courses: Course[] }>('/api/courses/enrolled/me'),
  instructorCourses: () => request<{ courses: Course[] }>('/api/courses/instructor/me'),
  myAssignments: () => request<{ assignments: Assignment[] }>('/api/assignments/me'),
  teacherAssignments: () => request<{ assignments: Assignment[] }>('/api/assignments/teacher'),
  createAssignment: (body: {
    courseId: string
    title: string
    description?: string
    dueDate: string
  }) =>
    request<{ id: string }>('/api/assignments', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  submitAssignment: (id: string) =>
    request<{ success: boolean }>(`/api/assignments/${encodeURIComponent(id)}/submit`, {
      method: 'POST',
    }),
  enroll: (courseId: string) =>
    request<{ success: boolean }>(`/api/courses/${encodeURIComponent(courseId)}/enroll`, {
      method: 'POST',
    }),

  adminStats: () =>
    request<{ stats: { students: number; teachers: number; courses: number; liveSessions: number; recordings: number } }>('/api/admin/stats'),
  adminUsers: () => request<{ users: User[] }>('/api/admin/users'),
  adminSessions: () => request<{ sessions: ClassSession[] }>('/api/admin/sessions'),
  adminCourses: () => request<{ courses: Course[] }>('/api/admin/courses'),

  teamsStatus: () => request<TeamsStatus>('/api/auth/microsoft/status'),

  teamsConnect: (returnUrl: string) =>
    request<{ url: string }>('/api/auth/microsoft/connect', {
      method: 'POST',
      body: JSON.stringify({ returnUrl }),
    }),

  teamsDisconnect: () =>
    request<{ success: boolean }>('/api/auth/microsoft/disconnect', {
      method: 'POST',
    }),

  sessionMessages: (sessionId: string, after?: string) =>
    request<{ messages: ChatMessage[] }>(
      `/api/sessions/${encodeURIComponent(sessionId)}/messages${
        after ? `?after=${encodeURIComponent(after)}` : ''
      }`
    ),

  sendSessionMessage: (sessionId: string, text: string) =>
    request<{ message: ChatMessage }>(
      `/api/sessions/${encodeURIComponent(sessionId)}/messages`,
      { method: 'POST', body: JSON.stringify({ text }) }
    ),

  getSession: (id: string) =>
    request<{ session: ClassSession }>(`/api/sessions/${encodeURIComponent(id)}`),

  listSessions: (teacherId?: string) => {
    const query = teacherId ? `?teacherId=${encodeURIComponent(teacherId)}` : ''
    return request<{ sessions: ClassSession[] }>(`/api/sessions${query}`)
  },

  createSession: (body: {
    title: string
    description?: string
    teacherId?: string
    teacherEmail?: string
    courseId?: string
    startTime: string
    endTime: string
    createTeamsMeeting?: boolean
  }) =>
    request<{ session: ClassSession }>('/api/sessions', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  deleteSession: (id: string) =>
    request<{ success: boolean }>(`/api/sessions/${id}`, { method: 'DELETE' }),
}

export { API_BASE }
