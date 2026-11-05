import Classroom from '@/features/classroom/components/Classroom'

export default function VideoRoomPage({
  params,
}: {
  params: { id: string }
}) {
  return <Classroom roomId={params.id} />
}
