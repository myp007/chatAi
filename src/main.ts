import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import '@/styles/global.scss'

// 引入mock（仅在开发环境使用）
if (import.meta.env.DEV) {
  const { default: Mock } = await import('./mock')
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(naive)

app.mount('#app') 