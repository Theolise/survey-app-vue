import type { Survey } from '@/types/survey'

export const getAllSurveys = async (): Promise<Survey[]> => {
  const url = `http://localhost:8080/api/surveys`

  const response = await fetch(url)
  return response.json()
}
