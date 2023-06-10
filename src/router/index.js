import {createRouter, createWebHistory} from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'splashView',
    component: () => import('@/views/splashView.vue'),
  },
  {
    path: '/main',
    name: 'mainView',
    component: () => import('@/views/passenger/MainView.vue'),
  },
  {
    path: '/driver',
    name: 'driverView',
    component: () => import('@/views/drivers/DriverView.vue'),
    children: [
      {
        path: 'code',
        name: 'driverCodeView',
        component: () => import('@/views/drivers/DriverCodeView.vue'),
      },
      {
        path: 'main',
        name: 'driverMainView',
        component: () => import('@/views/drivers/DriverMainView.vue'),
      },
    ],
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
    path: '/stopHistory',
    name: 'StopHistoryView',
    component: () => import('@/views/passenger/StopHistoryView.vue'),
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
    path: '/riding',
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
    path: '/landingAlarm',
    name: 'LandingAlarmView',
    component: () => import('@/views/passenger/LandingAlarmView.vue'),
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
  // 하차 관련 검색 페이지
  {
    path: '/landingSearch',
    name: 'busLandingSearchView',
    component: () => import('@/views/passenger/landing/BusLandingSearchView.vue'),
  },
  {
    path: '/keyboardLandingSearch/:keyword',
    name: 'KeyboardLandingSearchView',
    component: () => import('@/views/passenger/landing/KeyboardLandingSearchView.vue'),
  },
  {
    path: '/landingStopBusList/:arsId/:stId',
    name: 'LandingStopBusListView',
    props: true,
    component: () => import('@/views/passenger/landing/LandingStopBusListView.vue'),
  },
  {
    path: '/landingStationList/:busRouteId',
    name: 'LandingStationListView',
    component: () => import('@/views/passenger/landing/LandingStationListView.vue'),
  },
  {
    //  탑승 중인 버스
    path: '/ridingBus',
    name: 'RidingBusView',
    component: () => import('@/views/passenger/RidingBusView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
