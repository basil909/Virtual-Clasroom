'use client'

import { useEffect, useRef } from 'react'
import type { ChatMessage } from '@/lib/api'

export default function ChatPanel({
  messages,
  currentUserId,
  chatInput,
  error,
  onChatInputChange,
  onSend,
  onClose,
}: {
  messages: ChatMessage[]
  currentUserId: string
  chatInput: string
  error?: string
  onChatInputChange: (value: string) => void
  onSend: () => void
  onClose: () => void
}) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [messages.length])

  return (
    <aside className="absolute inset-y-0 right-0 z-20 flex w-full max-w-[360px] flex-col border-l border-[#3c4043] bg-[#2d2e30] lg:static lg:w-[360px]">
      <div className="flex items-center justify-between border-b border-[#3c4043] p-5">
        <h2 className="text-lg font-semibold text-white">In-call messages</h2>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="text-xl leading-none text-white/60 hover:text-white lg:hidden"
        >
          ×
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-auto p-5">
        {messages.length === 0 && (
          <p className="text-sm text-white/40">No messages yet. Say hello!</p>
        )}

        {messages.map((msg) => (
          <div key={msg.id}>
            <div className="text-sm font-semibold">
              {msg.userId === currentUserId ? 'You' : msg.user}
              <span className="ml-2 text-xs font-normal text-white/35">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <div
              className={`mt-1 whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm ${
                msg.userId === currentUserId ? 'bg-[#8ab4f8]/20' : 'bg-[#3c4043]'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {error && <p className="px-5 pb-2 text-xs text-red-400">{error}</p>}

      <div className="border-t border-[#3c4043] p-4">
        <div className="flex gap-2">
          <input
            value={chatInput}
            maxLength={1000}
            onChange={(e) => onChatInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSend()
            }}
            placeholder="Send a message"
            className="min-w-0 flex-1 rounded-full border border-[#5f6368] bg-[#3c4043] px-4 py-3 text-sm outline-none"
          />

          <button
            onClick={onSend}
            className="rounded-full bg-[#8ab4f8] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
          >
            Send
          </button>
        </div>
      </div>
    </aside>
  )
}
