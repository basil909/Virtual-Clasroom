'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import { api } from '@/lib/api'
import type { ChatMessage, ClassSession } from '@/lib/api'
import { useAuth } from '@/providers/AuthProvider'
import { getDashboardPath } from '@/lib/routes'

import { useClassroomMedia } from '../hooks/useClassroomMedia'
import ClassroomHeader from './ClassroomHeader'
import ParticipantGrid from './ParticipantGrid'
import MeetingControls from './MeetingControls'
import ChatPanel from './ChatPanel'

const CHAT_POLL_MS = 3000

export default function Classroom({ roomId }: { roomId: string }) {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const {
    videoRef,
    micEnabled,
    cameraEnabled,
    mediaError,
    toggleMic,
    toggleCamera,
    shareScreen,
    stopMedia,
  } = useClassroomMedia()

  const [session, setSession] = useState<ClassSession | null>(null)
  const [sessionError, setSessionError] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState('')
  const [chatError, setChatError] = useState('')
  const [showChat, setShowChat] = useState(false)

  const lastSeen = useRef<string | undefined>(undefined)

  // Open the chat by default only when there is room beside the video.
  useEffect(() => {
    if (window.matchMedia('(min-width: 1024px)').matches) setShowChat(true)
  }, [])

  // Require a signed-in user.
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(`/video-room/${roomId}`)}`)
    }
  }, [authLoading, user, router, roomId])

  // Load the session details.
  useEffect(() => {
    if (!user) return
    let cancelled = false

    api
      .getSession(roomId)
      .then(({ session }) => !cancelled && setSession(session))
      .catch((err) => {
        if (!cancelled) {
          setSessionError(err instanceof Error ? err.message : 'Unable to load this class.')
        }
      })

    return () => {
      cancelled = true
    }
  }, [user, roomId])

  const appendMessages = useCallback((incoming: ChatMessage[]) => {
    if (incoming.length === 0) return
    setMessages((prev) => {
      const known = new Set(prev.map((m) => m.id))
      const fresh = incoming.filter((m) => !known.has(m.id))
      return fresh.length ? [...prev, ...fresh] : prev
    })
    lastSeen.current = incoming[incoming.length - 1].createdAt
  }, [])

  // Poll for new chat messages.
  useEffect(() => {
    if (!user || sessionError) return
    let cancelled = false

    async function poll() {
      try {
        const { messages: incoming } = await api.sessionMessages(roomId, lastSeen.current)
        if (!cancelled) {
          appendMessages(incoming)
          setChatError('')
        }
      } catch (err) {
        if (!cancelled) {
          setChatError(err instanceof Error ? err.message : 'Chat is unavailable.')
        }
      }
    }

    poll()
    const timer = setInterval(poll, CHAT_POLL_MS)

    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [user, roomId, sessionError, appendMessages])

  async function sendMessage() {
    const text = chatInput.trim()
    if (!text) return

    setChatInput('')
    try {
      const { message } = await api.sendSessionMessage(roomId, text)
      appendMessages([message])
      setChatError('')
    } catch (err) {
      setChatInput(text)
      setChatError(err instanceof Error ? err.message : 'Message could not be sent.')
    }
  }

  function leaveMeeting() {
    stopMedia()
    router.push(user ? getDashboardPath(user.role) : '/')
  }

  if (authLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#202124] text-sm text-white/60">
        Joining classroom…
      </div>
    )
  }

  if (sessionError) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-[#202124] px-6 text-center text-white">
        <p className="text-lg font-semibold">This class could not be opened</p>
        <p className="text-sm text-white/60">{sessionError}</p>
        <button
          onClick={() => router.push(getDashboardPath(user.role))}
          className="rounded-full bg-[#8ab4f8] px-6 py-3 text-sm font-semibold text-black"
        >
          Back to dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-30 flex overflow-hidden bg-[#202124] text-white">
      <div className="relative flex min-w-0 flex-1 flex-col">
        <ClassroomHeader
          title={session?.title ?? 'Loading class…'}
          mediaError={mediaError}
        />
        <ParticipantGrid
          videoRef={videoRef}
          cameraEnabled={cameraEnabled}
          userName={user.name}
        />
        <MeetingControls
          micEnabled={micEnabled}
          cameraEnabled={cameraEnabled}
          onToggleMic={toggleMic}
          onToggleCamera={toggleCamera}
          onShareScreen={shareScreen}
          onToggleChat={() => setShowChat((prev) => !prev)}
          onLeave={leaveMeeting}
        />
      </div>

      {showChat && (
        <ChatPanel
          messages={messages}
          currentUserId={user.id}
          chatInput={chatInput}
          error={chatError}
          onChatInputChange={setChatInput}
          onSend={sendMessage}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  )
}
