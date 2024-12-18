<script setup lang="ts">
import { onMounted, ref } from 'vue'

import SurveyInfo from '@/components/SurveyInfo.vue'
import { getAllSurveys } from '@/services/surveyApi'
import type { Survey } from '@/types/survey'

const surveys = ref<Survey[]>([])

const fetchSurveys = async () => {
  const data = await getAllSurveys()

  surveys.value = data
}

onMounted(() => {
  fetchSurveys()
})
</script>

<template>
  <main>
    <h1>Surveys ongoing</h1>
    <SurveyInfo v-for="survey in surveys" :key="survey.id" :survey="survey" />
  </main>
</template>
