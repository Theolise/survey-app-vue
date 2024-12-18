import type { Survey } from './survey'

export type SurveyQuestion = {
  id: number
  survey: Survey
  label: string
  orderNumber: number
}
