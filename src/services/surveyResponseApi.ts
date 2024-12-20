import type { Responses } from '@/types/surveyResponse'

export const saveResponses = async (responses: Responses) => {
  const url = `http://localhost:8080/api/responses`

  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(responses),
  })
}
