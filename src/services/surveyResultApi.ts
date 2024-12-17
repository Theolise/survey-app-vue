import type { SurveyResult } from '@/types/surveyResult'

export const getSurveyResultById = async (surveyId: number): Promise<SurveyResult[]> => {
  const url = `http://localhost:8080/api/results/${surveyId}`

  const response = await fetch(url)
  return response.json()
}
