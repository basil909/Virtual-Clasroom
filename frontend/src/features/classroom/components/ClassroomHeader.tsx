'use client'

import { useEffect, useState } from 'react'

export default function ClassroomHeader({
  title,
  mediaError,
}: {
  title: string
  mediaError: string | null
}) {
  const [now, setNow] = useState<string>('')

  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString())
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4">
      <div className="min-w-0">
        <h1 className="truncate text-xl font-semibold text-white">{title}</h1>
        <p className="mt-1 text-sm text-gray-400">Live virtual classroom</p>
        {mediaError && <p className="mt-2 text-sm text-red-400">{mediaError}</p>}
      </div>

      <div className="shrink-0 text-sm text-gray-400">{now}</div>
    </div>
  )
}
