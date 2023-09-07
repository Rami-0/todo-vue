import { createApp } from 'vue';
import './style.scss';
import App from '@/App.vue';
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

createApp(App).use(Toast).mount('#app');
