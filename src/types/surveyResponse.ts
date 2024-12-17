export type Responses = {
  surveyId: number
  responses: Response[]
}

export type Response = {
  questionId: number
  score: number
}
