import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import {createPinia} from 'pinia';

const pinia = createPinia();

const app = createApp(App);

// 라우터
app.use(router);

app.mount('#app')
