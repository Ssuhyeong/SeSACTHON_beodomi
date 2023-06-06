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
  {
    // 가까운 정류장
    path: '/nearStop',
    name: 'nearStopView',
    component: () => import('@/views/passenger/NearStopView.vue'),
  },
  {
    // 역에서 탈 수 있는 버스 조회 페이지
    path: '/stopBusList',
    name: 'stopBusListView',
    component: () => import('@/views/passenger/StopBusListView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
