export default function MeetingControls({
  micEnabled,
  cameraEnabled,
  onToggleMic,
  onToggleCamera,
  onShareScreen,
  onToggleChat,
  onLeave,
}: {
  micEnabled: boolean
  cameraEnabled: boolean
  onToggleMic: () => void
  onToggleCamera: () => void
  onShareScreen: () => void
  onToggleChat: () => void
  onLeave: () => void
}) {
  return (
    <div className="absolute bottom-6 left-1/2 flex max-w-[calc(100%-1rem)] -translate-x-1/2 items-center gap-2 sm:gap-4 rounded-full bg-[#2d2e30] px-6 py-4 shadow-2xl">
      <button
        onClick={onToggleMic}
        className={`flex h-14 w-14 items-center justify-center rounded-full text-xl transition ${
          micEnabled ? 'bg-[#3c4043]' : 'bg-red-500'
        }`}
      >
        🎤
      </button>

      <button
        onClick={onToggleCamera}
        className={`flex h-14 w-14 items-center justify-center rounded-full text-xl transition ${
          cameraEnabled ? 'bg-[#3c4043]' : 'bg-red-500'
        }`}
      >
        📷
      </button>

      <button
        onClick={onShareScreen}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3c4043] text-xl"
      >
        🖥️
      </button>

      <button
        onClick={onToggleChat}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3c4043] text-xl"
      >
        💬
      </button>

      <button
        onClick={onLeave}
        className="flex h-14 w-24 items-center justify-center rounded-full bg-red-500 text-sm font-semibold transition hover:bg-red-600"
      >
        Leave
      </button>
    </div>
  )
}
