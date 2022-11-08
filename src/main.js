import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import './assets/main.css'
import '@/assets/main.scss';
import '@vueform/slider/themes/default.css';
import 'bootstrap/dist/css/bootstrap.css';

const myApp = createApp(App)

myApp.use(router).mount('#app')