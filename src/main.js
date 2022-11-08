import { createApp } from 'vue'
import App from './App.vue'

import axios from 'axios'

// import './assets/main.css'
import '@/assets/main.scss';
import 'bootstrap/dist/css/bootstrap.css';

createApp(App).mount('#app')
app.config.globalProperties.axios = axios