import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

// import './assets/main.css'
import '@/assets/main.scss';
import 'bootstrap/dist/css/bootstrap.css';

const myApp = createApp(App)

myApp.config.globalProperties.$http = axios.create({
    baseURL: 'https://api-nnd.sitama.co.id/api/v1/',
    timeout: 1000
})

myApp.use(router).mount('#app')