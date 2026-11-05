import { Suspense } from 'react'

import { api } from '@/lib/api'

import CoursesView from './CoursesView'

// Static page (revalidated every minute); the category filter runs client-side
// so navigating here is instant and can be prefetched.
export const revalidate = 60

export default async function CoursesPage() {
  let courses: Awaited<ReturnType<typeof api.courses>>['courses'] = []
  let coursesUnavailable = false

  try {
    courses = (await api.courses()).courses
  } catch {
    coursesUnavailable = true
  }

  return (
    <Suspense fallback={null}>
      <CoursesView courses={courses} coursesUnavailable={coursesUnavailable} />
    </Suspense>
  )
}
