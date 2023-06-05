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
  {
    path: '/keyboardSearch',
    name: 'keyboardSearchView',
    component: () => import('@/views/passenger/KeyboardSearchView.vue'),
  },
  {
    path: '/favoriteStop',
    name: 'favoriteStopView',
    component: () => import('@/views/passenger/FavoriteStopView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
