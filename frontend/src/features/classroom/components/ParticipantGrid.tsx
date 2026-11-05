import type { RefObject } from 'react'

export default function ParticipantGrid({
  videoRef,
  cameraEnabled,
  userName,
}: {
  videoRef: RefObject<HTMLVideoElement>
  cameraEnabled: boolean
  userName: string
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-28">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-black shadow-2xl">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="h-[min(60vh,480px)] w-full object-cover"
        />

        <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1 text-sm">
          {userName} (You)
        </div>

        {!cameraEnabled && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#3c4043]">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#5f6368] text-3xl font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>

      <p className="max-w-md text-center text-xs text-white/40">
        This is your local camera preview. Use the chat to talk with everyone in the class, or
        schedule the class with a Microsoft Teams meeting for shared video.
      </p>
    </div>
  )
}
