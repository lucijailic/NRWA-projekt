import './bootstrap';
import App from './components/App.vue';
import { createApp } from 'vue';
import router from './router';

createApp(App)
    .use(router)
    .mount('#app');
