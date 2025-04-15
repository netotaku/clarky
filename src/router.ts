import { createRouter, createWebHistory } from 'vue-router'
import List from '@/components/List.vue'
import Content from '@/components/Content.vue'

const routes = [
    { path: '/', name: 'all', component: List },
    { 
        path: '/bio', 
        name: 'bio', 
        component: Content, 
        props: { path: '/content/pages/bio.html' } 
    },{ 
        path: '/cookies', 
        name: 'cookies', 
        component: Content, 
        props: { path: '/content/pages/cookies.html' } 
    },
  { path: '/:platform', name: 'platform', component: List },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})