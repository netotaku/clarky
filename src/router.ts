import { createRouter, createWebHistory } from 'vue-router'
import List from '@/components/List.vue'

const routes = [
  { path: '/', name: 'all', component: List },
  { path: '/:platform', name: 'platform', component: List },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})