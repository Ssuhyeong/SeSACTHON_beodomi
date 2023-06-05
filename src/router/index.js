import {createRouter, createWebHistory} from 'vue-router';

const routes = [
  {
    path: '/reservation',
    name: 'reservationView',
    component: () => import('@/views/ReservationView'),
  },
  {
    path: '/',
    name: 'mainView',
    component: () => import('@/views/passenger/MainView.vue'),
  },
  {
    path: '/search',
    name: 'busSearchView',
    component: () => import('@/views/passenger/BusSearchView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
