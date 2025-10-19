import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import i18n from './lang/i18n'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import 'flowbite'
import axios from 'axios'
axios.defaults.withCredentials = true

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(i18n)
app.use(pinia)
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
})
app.mount('#app')
