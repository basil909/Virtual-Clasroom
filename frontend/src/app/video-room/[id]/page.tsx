"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import storage from '../../../lib/storage'

type Message = {
  user: string
  text: string
}

export default function VideoRoomPage({
  params,
}: {
  params: { id: string }
}) {
  const roomId = params.id

  const router = useRouter()

  const videoRef = useRef<HTMLVideoElement | null>(null)

  const [stream, setStream] = useState<MediaStream | null>(null)

  const [micEnabled, setMicEnabled] = useState(true)
  const [cameraEnabled, setCameraEnabled] = useState(true)

  const [messages, setMessages] = useState<Message[]>([
    {
      user: 'Instructor',
      text: 'Welcome to the live class 👋',
    },
    {
      user: 'Student A',
      text: 'Hello everyone!',
    },
  ])

  const [chatInput, setChatInput] = useState('')

  const [showChat, setShowChat] = useState(true)
  const [mediaError, setMediaError] = useState<string | null>(null)

  useEffect(() => {
    // Keep a local reference so cleanup always stops the exact stream we created
    let localStream: MediaStream | undefined

    const handleBeforeUnload = () => {
      try {
        localStream?.getTracks().forEach((t) => t.stop())
      } catch (e) {
        // ignore
      }
    }

    // attempt to start camera on mount
    ;(async () => {
      try {
        const s = await startCamera()
        localStream = s
      } catch (err) {
        // startCamera already sets mediaError; swallow here
      }
    })()

    // ensure tracks are stopped on page unload (tab close / refresh)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      try {
        localStream?.getTracks().forEach((track) => track.stop())
      } catch (e) {
        // ignore
      }

      try {
        if (videoRef.current) videoRef.current.srcObject = null
      } catch (e) {
        // ignore
      }

      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  // returns the created stream (or undefined) so callers can track it for cleanup
  const startCamera = async (): Promise<MediaStream | undefined> => {
    setMediaError(null)

    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const msg = 'Browser does not support camera/microphone access (navigator.mediaDevices missing).'
      console.error(msg)
      setMediaError(msg)
      return undefined
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      setStream(mediaStream)

      if (videoRef.current) {
        // assign directly to avoid race with state
        videoRef.current.srcObject = mediaStream
      }

      return mediaStream
    } catch (err: any) {
      console.error('getUserMedia error', err)

      let message = 'Could not access webcam/microphone.'

      if (err && err.name) {
        switch (err.name) {
          case 'NotAllowedError':
          case 'PermissionDeniedError':
            message = 'Permission denied. Please allow camera and microphone access in your browser.'
            break
          case 'NotFoundError':
          case 'DevicesNotFoundError':
            message = 'No camera or microphone found. Please connect a device and try again.'
            break
          case 'NotReadableError':
            message = 'Camera or microphone is already in use by another application.'
            break
          case 'OverconstrainedError':
            message = 'Requested camera constraints cannot be satisfied by available devices.'
            break
          case 'SecurityError':
            message = 'getUserMedia can only be used in secure contexts (HTTPS) or on localhost.'
            break
          default:
            message = err.message || message
        }
      }

      setMediaError(message)
      return undefined
    }
  }

  const toggleMic = () => {
    if (!stream) return

    stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled
    })

    setMicEnabled((prev) => !prev)
  }

  const toggleCamera = () => {
    if (!stream) return

    stream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled
    })

    setCameraEnabled((prev) => !prev)
  }

  const shareScreen = async () => {
    try {
      const screenStream =
        await navigator.mediaDevices.getDisplayMedia({
          video: true,
        })

      if (videoRef.current) {
        videoRef.current.srcObject = screenStream
      }

      const screenTrack =
        screenStream.getVideoTracks()[0]

      screenTrack.onended = () => {
        if (videoRef.current && stream) {
          videoRef.current.srcObject = stream
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const sendMessage = () => {
    if (!chatInput.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        user: 'You',
        text: chatInput,
      },
    ])

    setChatInput('')
  }

  const leaveMeeting = () => {
    // stop and clear local media
    stream?.getTracks().forEach((track) => track.stop())
    if (videoRef.current) {
      try {
        videoRef.current.srcObject = null
      } catch (err) {
        // ignore
      }
    }

    // Mark class completed and attach a demo recording URL in localStorage
    try {
      const user = storage.getUser()

      // Only allow teacher role to persist recordings in this prototype
      if (user?.role === 'teacher') {
        storage.completeClass(roomId, '/demo-recordings/react-class.mp4')
      }
    } catch (err) {
      console.error('Failed to update class recording', err)
    }

    // Navigate back to admin classes
    router.push('/dashboard/admin/classes')
  }

  const participants = [
    'Student A',
    'Student B',
    'Student C',
  ]

  return (
    <div className="relative flex h-screen overflow-hidden bg-[#202124] text-white">
      {/* MAIN AREA */}

      <div className="flex flex-1 flex-col">
        {/* TOP BAR */}

        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold">
              Classroom — {roomId}
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Live virtual classroom
            </p>
          </div>

          <div className="text-sm text-gray-400">
            {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* VIDEO GRID */}

        <div className="flex flex-1 items-center justify-center px-6 pb-28">
          <div className="grid w-full max-w-7xl grid-cols-2 gap-5">
            {/* YOUR VIDEO */}

            <div className="relative overflow-hidden rounded-3xl bg-black shadow-2xl">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="h-[320px] w-full object-cover"
              />

              <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1 text-sm">
                You
              </div>

              {!cameraEnabled && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#3c4043]">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#5f6368] text-3xl font-bold">
                    Y
                  </div>
                </div>
              )}
            </div>

            {/* PARTICIPANTS */}

            {participants.map((participant, index) => (
              <div
                key={participant}
                className={`relative flex h-[320px] items-center justify-center overflow-hidden rounded-3xl bg-[#3c4043] shadow-xl ${
                  index === 0
                    ? 'ring-4 ring-green-400'
                    : ''
                }`}
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#5f6368] text-3xl font-bold">
                  {participant.charAt(0)}
                </div>

                <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1 text-sm">
                  {participant}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CONTROLS */}

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-full bg-[#2d2e30] px-6 py-4 shadow-2xl">
          {/* MIC */}

          <button
            onClick={toggleMic}
            className={`flex h-14 w-14 items-center justify-center rounded-full text-xl transition ${
              micEnabled
                ? 'bg-[#3c4043]'
                : 'bg-red-500'
            }`}
          >
            🎤
          </button>

          {/* CAMERA */}

          <button
            onClick={toggleCamera}
            className={`flex h-14 w-14 items-center justify-center rounded-full text-xl transition ${
              cameraEnabled
                ? 'bg-[#3c4043]'
                : 'bg-red-500'
            }`}
          >
            📷
          </button>

          {/* SCREEN SHARE */}

          <button
            onClick={shareScreen}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3c4043] text-xl"
          >
            🖥️
          </button>

          {/* CHAT */}

          <button
            onClick={() => setShowChat((prev) => !prev)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3c4043] text-xl"
          >
            💬
          </button>

          {/* PARTICIPANTS */}

          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3c4043] text-xl">
            👥
          </button>

          {/* LEAVE */}

          <button
            onClick={leaveMeeting}
            className="flex h-14 w-24 items-center justify-center rounded-full bg-red-500 text-sm font-semibold transition hover:bg-red-600"
          >
            Leave
          </button>
        </div>
      </div>

      {/* CHAT SIDEBAR */}

      {showChat && (
        <aside className="hidden w-[360px] flex-col border-l border-[#3c4043] bg-[#2d2e30] lg:flex">
          {/* HEADER */}

          <div className="border-b border-[#3c4043] p-5">
            <h2 className="text-lg font-semibold">
              In-call messages
            </h2>
          </div>

          {/* MESSAGES */}

          <div className="flex-1 space-y-4 overflow-auto p-5">
            {messages.map((msg, index) => (
              <div key={index}>
                <div className="text-sm font-semibold">
                  {msg.user}
                </div>

                <div className="mt-1 rounded-2xl bg-[#3c4043] px-4 py-3 text-sm">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* CHAT INPUT */}

          <div className="border-t border-[#3c4043] p-4">
            <div className="flex gap-2">
              <input
                value={chatInput}
                onChange={(e) =>
                  setChatInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage()
                  }
                }}
                placeholder="Send a message"
                className="flex-1 rounded-full border border-[#5f6368] bg-[#3c4043] px-4 py-3 text-sm outline-none"
              />

              <button
                onClick={sendMessage}
                className="rounded-full bg-[#8ab4f8] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Send
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}