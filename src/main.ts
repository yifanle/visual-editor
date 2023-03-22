import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'
import '@/assets/scss/element-plus.scss'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useIcon } from './hook/useIcon'

const app = createApp(App);
// 注册所有的图标
useIcon(app);

app.use(router);
app.use(createPinia());
app.use(ElementPlus);
app.mount('#app');