import './assets/main.css'; // Подключение стилей

import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Импорт маршрутизатора

// Создание приложения Vue с подключением маршрутизатора
createApp(App).use(router).mount('#app');
