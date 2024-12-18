<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getAllQuestionsBySurveyId } from '@/services/surveyQuestionApi'
import { saveResponses } from '@/services/surveyResponseApi'
import type { Survey } from '@/types/survey'
import type { SurveyQuestion } from '@/types/surveyQuestion'
import type { Responses } from '@/types/surveyResponse'

const route = useRoute()
const router = useRouter()
const surveyId = route.params.id

const questions = ref<SurveyQuestion[]>([])
const survey = ref<Survey>()
const responses = ref<Record<number, number>>({})
const errorMessages = ref<string[]>([])

const fetchQuestions = async () => {
  const data = await getAllQuestionsBySurveyId(surveyId.toString())

  questions.value = data
  survey.value = data[0]?.survey
}

const validateForm = (): boolean => {
  errorMessages.value = []

  questions.value.forEach((question) => {
    if (!responses.value[question.id]) {
      errorMessages.value.push(`The question "${question.label}" needs to be answered`)
    }
  })

  return errorMessages.value.length === 0
}

const submitSurvey = async () => {
  if (!validateForm()) {
    return
  }

  const result = {
    surveyId: parseInt(surveyId.toString()),
    responses: Object.entries(responses.value).map(([questionId, score]) => ({
      questionId: parseInt(questionId),
      score: score,
    })),
  } as Responses

  try {
    await saveResponses(result)

    router.push({ path: `/api/surveys/${surveyId}/results` })
  } catch {
    alert('An error occurred while saving your responses.')
  }
}

onMounted(() => {
  fetchQuestions()
})
</script>

<template>
  <main>
    <h1 v-if="questions.length">Survey : {{ survey?.name }}</h1>
    <h1 v-else>No survey found with this id</h1>

    <div v-if="questions.length">
      <p>
        Answer the following questions, with 1 meaning "strongly disagree" and 5 meaning "strongly
        agree"
      </p>
      <form @submit.prevent="submitSurvey">
        <div v-for="question in questions" :key="question.id" class="question">
          <span>{{ question.label }}</span>
          <div class="notes">
            <label v-for="score in 5" :key="score" class="score">
              <input
                type="radio"
                :name="'question-' + question.id"
                :value="score"
                v-model="responses[question.id]"
              />
              {{ score }}
            </label>
          </div>
        </div>

        <div v-if="errorMessages.length" class="errors">
          <span v-for="error in errorMessages" :key="error">{{ error }}</span>
        </div>

        <button type="submit" class="submit">Submit</button>
      </form>
    </div>

    <div v-else>
      <p>Loading questions...</p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.question {
  color: #1e1e2f;
  background-color: #e0e0e0;
  padding: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .notes {
    display: flex;
    gap: 8px;

    .score {
      padding: 4px;
      background-color: #ffffff;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      input {
        display: none;
      }

      &:hover {
        background-color: #ed9ee0;
      }

      &:has(input:checked) {
        background-color: #e14eca;
      }
    }
  }
}

.errors {
  margin-bottom: 20px;
  color: red;
  font-weight: bold;

  display: flex;
  flex-direction: column;
  gap: 8px;
}

.submit {
  color: #ffffff;
  padding: 8px;
  background-color: #494959;
  border-radius: 5px;
  width: fit-content;
}
</style>
