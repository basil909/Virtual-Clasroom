'use client'

import { Suspense } from 'react'
import TeamsClassroomPanel from '../../../../components/teams/TeamsClassroomPanel'

export default function TeacherClassesPage() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900">My Classes</h1>
      <p className="mt-2 text-slate-500">
        Schedule live virtual classes powered by Microsoft Teams integration.
      </p>

      <div className="mt-8">
        <Suspense fallback={<p className="text-sm text-slate-500">Loading Teams...</p>}>
          <TeamsClassroomPanel />
        </Suspense>
      </div>
    </div>
  )
}
