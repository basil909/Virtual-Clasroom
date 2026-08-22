import { env } from '../../config/env.js'
import type { TeamsMeeting } from '../../types/index.js'
import { acquireAppOnlyToken } from './msalClient.js'
import { createGraphClient } from './graphClient.js'
import { getValidAccessToken } from './tokenService.js'

export type CreateMeetingInput = {
  subject: string
  startDateTime: string
  endDateTime: string
  userId?: string
}

async function postOnlineMeeting(
  accessToken: string,
  path: string,
  body: { startDateTime: string; endDateTime: string; subject: string }
): Promise<TeamsMeeting> {
  const meeting = await createGraphClient(accessToken).api(path).post(body)
  return {
    id: meeting.id,
    subject: meeting.subject,
    startDateTime: meeting.startDateTime,
    endDateTime: meeting.endDateTime,
    joinWebUrl: meeting.joinWebUrl,
  }
}

export async function createTeamsMeeting(input: CreateMeetingInput): Promise<TeamsMeeting> {
  const body = {
    startDateTime: input.startDateTime,
    endDateTime: input.endDateTime,
    subject: input.subject,
  }

  if (input.userId) {
    const token = await getValidAccessToken(input.userId)
    if (token) return postOnlineMeeting(token, '/me/onlineMeetings', body)
  }

  if (env.azure.organizerUserId) {
    const appToken = await acquireAppOnlyToken()
    return postOnlineMeeting(
      appToken,
      `/users/${env.azure.organizerUserId}/onlineMeetings`,
      body
    )
  }

  throw new Error(
    'Microsoft Teams is not connected. Link your Microsoft account or configure AZURE_ORGANIZER_USER_ID.'
  )
}

export async function listTeamsMeetings(userId: string): Promise<TeamsMeeting[]> {
  const token = await getValidAccessToken(userId)
  if (!token) throw new Error('Microsoft Teams account not linked.')
  const result = await createGraphClient(token).api('/me/onlineMeetings').get()
  return (result.value ?? []) as TeamsMeeting[]
}

export async function deleteTeamsMeeting(meetingId: string, userId: string): Promise<void> {
  const token = await getValidAccessToken(userId)
  if (!token) throw new Error('Microsoft Teams account not linked.')
  await createGraphClient(token).api(`/me/onlineMeetings/${meetingId}`).delete()
}
