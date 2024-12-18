<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { getSurveyResultById } from '@/services/surveyResultApi'
import type { Survey } from '@/types/survey'
import type { SurveyResult } from '@/types/surveyResult'

const route = useRoute()
const surveyId = route.params.id

const results = ref<SurveyResult[]>([])
const survey = ref<Survey>()

const fetchResults = async () => {
  const data = await getSurveyResultById(surveyId.toString())

  results.value = data
  survey.value = data[0]?.survey
}

onMounted(() => {
  fetchResults()
})
</script>

<template>
  <main>
    <h1 v-if="results.length">Results of survey : {{ survey?.name }}</h1>
    <h1 v-else>No results found for this survey id</h1>

    <div v-if="results.length">
      <div
        v-for="result in results"
        :key="`${result.id.questionId}-${result.id.surveyId}`"
        class="result"
      >
        <span class="question">{{ result.question.label }}</span>
        <div class="stats">
          <span>
            Score average : {{ (Math.round(result.scoreAverage * 100) / 100).toFixed(2) }}
          </span>
          <span>Number of response : {{ result.numberResponse }} </span>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Loading results...</p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.result {
  color: #1e1e2f;
  background-color: #e0e0e0;
  padding: 16px;
  border-radius: 5px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .question {
    font-weight: bold;
  }

  .stats {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
