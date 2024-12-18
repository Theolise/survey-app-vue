<script setup lang="ts">
import type { Survey } from '@/types/survey'

const props = defineProps<{
  survey: Survey
}>()
</script>

<template>
  <RouterLink :to="{ name: 'survey', params: { id: props.survey.id } }">
    <div class="survey-info-container">
      <span>{{ props.survey.name }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.survey-info-container {
  color: #1e1e2f;
  background-color: #e0e0e0;
  padding: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
