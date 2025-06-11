import { createRouter, createWebHistory } from 'vue-router'
import RequestsList from '@/pages/RequestsList.vue'
import RequestCreate from '@/pages/RequestCreate.vue'
import RequestEdit from '@/pages/RequestEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/requests',
      name: 'requests',
      component: RequestsList,
    },
    {
      path: '/requests/new',
      name: 'request-create',
      component: RequestCreate,
    },
    {
      path: '/requests/:id',
      name: 'request-detail',
      component: RequestEdit,
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/requests',
    },
  ],
})

export default router
