import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/surveys/:id',
      name: 'survey',
      component: () => import('../views/SurveyView.vue'),
    },
    {
      path: '/api/surveys/:id/results',
      name: 'survey',
      component: () => import('../views/SurveyResultView.vue'),
    },
  ],
})

export default router
