import type { Responses } from '@/types/surveyResponse'

export const saveResponses = async (responses: Responses) => {
  const url = `http://localhost:8080/api/responses`

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(responses),
  })
  return response.json()
}
