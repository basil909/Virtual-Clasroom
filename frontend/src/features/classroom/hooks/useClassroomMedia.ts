'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export function useClassroomMedia() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const screenRef = useRef<MediaStream | null>(null)
  const unmountedRef = useRef(false)
  const [micEnabled, setMicEnabled] = useState(true)
  const [cameraEnabled, setCameraEnabled] = useState(true)
  const [mediaError, setMediaError] = useState<string | null>(null)

  const startCamera = useCallback(async (): Promise<MediaStream | undefined> => {
    setMediaError(null)

    if (
      typeof navigator === 'undefined' ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      const msg =
        'Browser does not support camera/microphone access (navigator.mediaDevices missing).'
      console.error(msg)
      setMediaError(msg)
      return undefined
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      if (unmountedRef.current) {
        // The user left the page before the permission prompt resolved.
        mediaStream.getTracks().forEach((t) => t.stop())
        return undefined
      }

      if (streamRef.current) {
        // A duplicate request (e.g. React StrictMode remount) already won.
        mediaStream.getTracks().forEach((t) => t.stop())
        return streamRef.current
      }

      streamRef.current = mediaStream
      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }

      return mediaStream
    } catch (err: unknown) {
      console.error('getUserMedia error', err)

      let message = 'Could not access webcam/microphone.'
      const name = err && typeof err === 'object' && 'name' in err ? String(err.name) : ''
      const errMessage =
        err && typeof err === 'object' && 'message' in err ? String(err.message) : ''

      switch (name) {
        case 'NotAllowedError':
        case 'PermissionDeniedError':
          message =
            'Permission denied. Please allow camera and microphone access in your browser.'
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
          message = errMessage || message
      }

      setMediaError(message)
      return undefined
    }
  }, [])

  const releaseAll = useCallback(() => {
    for (const ref of [streamRef, screenRef]) {
      try {
        ref.current?.getTracks().forEach((t) => t.stop())
      } catch {
        // ignore
      }
      ref.current = null
    }
    if (videoRef.current) {
      try {
        videoRef.current.srcObject = null
      } catch {
        // ignore
      }
    }
  }, [])

  useEffect(() => {
    unmountedRef.current = false
    void startCamera()

    // pagehide fires on tab close, reload and back/forward navigation.
    window.addEventListener('pagehide', releaseAll)

    return () => {
      unmountedRef.current = true
      window.removeEventListener('pagehide', releaseAll)
      releaseAll()
    }
  }, [startCamera, releaseAll])

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
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      })

      screenRef.current?.getTracks().forEach((t) => t.stop())
      screenRef.current = screenStream

      if (videoRef.current) {
        videoRef.current.srcObject = screenStream
      }

      const screenTrack = screenStream.getVideoTracks()[0]

      screenTrack.onended = () => {
        screenRef.current = null
        if (videoRef.current && streamRef.current) {
          videoRef.current.srcObject = streamRef.current
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const stopMedia = releaseAll

  return {
    videoRef,
    stream,
    micEnabled,
    cameraEnabled,
    mediaError,
    toggleMic,
    toggleCamera,
    shareScreen,
    stopMedia,
  }
}
