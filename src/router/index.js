import {createRouter, createWebHistory} from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'mainView',
    component: () => import('@/views/passenger/MainView.vue'),
  },
  {
    path: '/driver/code',
    name: 'driverCodeView',
    component: () => import('@/views/drivers/DriverCodeView.vue'),
  },
  {
    path: '/driver/main',
    name: 'driverMainView',
    component: () => import('@/views/drivers/DriverMainView.vue'),
  },
  {
    path: '/reservation',
    name: 'reservationView',
    component: () => import('@/views/passenger/ReservationView'),
  },
  {
    path: '/search',
    name: 'busSearchView',
    component: () => import('@/views/passenger/BusSearchView.vue'),
  },
  {
    path: '/keyboardSearch/:keyword',
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
    path: '/stopBusList/:arsId/:stId',
    name: 'stopBusListView',
    props: true,
    component: () => import('@/views/passenger/StopBusListView.vue'),
  },
  {
    // 승차벨 페이지
    path: '/riding/:arsId/:busRouteId',
    name: 'RidingView',
    component: () => import('@/views/passenger/RidingView.vue'),
  },
  {
    // 정거장 도착 알림
    path: '/ridingAlarm',
    name: 'RidingAlarmView',
    component: () => import('@/views/passenger/RidingAlarmView.vue'),
  },
  {
    // 정거장 도착 알림
    path: '/landing',
    name: 'LandingView',
    component: () => import('@/views/passenger/LandingView.vue'),
  },
  {
    path: '/stationList/:busRouteId',
    name: 'StationListView',
    component: () => import('@/views/passenger/StationListView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
