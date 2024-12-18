import type { Survey } from './survey'
import type { SurveyQuestion } from './surveyQuestion'

export type SurveyResult = {
  id: {
    surveyId: number
    questionId: number
  }
  survey: Survey
  question: SurveyQuestion
  scoreAverage: number
  scoreSum: number
  numberResponse: number
}
