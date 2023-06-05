import { createRouter, createWebHashHistory } from 'vue-router'
import ReservationView from '@/views/ReservationView'

const routes = [
  {
    path: '/',
    name: 'reservationView',
    component: ReservationView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
