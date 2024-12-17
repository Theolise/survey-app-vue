import type { SurveyQuestion } from '@/types/surveyQuestion'

export const getAllQuestionsBySurveyId = async (surveyId: number): Promise<SurveyQuestion[]> => {
  const url = `http://localhost:8080/api/questions/${surveyId}`

  const response = await fetch(url)
  return response.json()
}
