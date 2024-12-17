<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { getAllSurveys } from '@/services/surveyApi'
import { Survey } from '@/types/survey'

const surveys = ref<Survey[]>([])

const fetchSurveys = async () => {
  const data = await getAllSurveys()

  surveys.value = data
}

onMounted(() => {
  // fetchSurveys()
})
</script>

<template>
  <main>
    <h1>Home view</h1>
  </main>
</template>
