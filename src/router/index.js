import {createRouter, createWebHashHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DriverCodeViewVue from '@/views/drivers/DriverCodeView.vue';
import DriverMainViewVue from '@/views/drivers/DriverMainView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/driver/enter',
    name: 'driverEnter',
    component: DriverCodeViewVue,
  },
  {
    path: '/driver/main',
    name: 'driverMain',
    component: DriverMainViewVue,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
