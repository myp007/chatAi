<template>
  <div class="login-page">
    <div class="login-box">
      <h2>Login to Fusion AI</h2>
      <n-form
        ref="formRef"
        :model="formData"
        :rules="rules"
      >
        <n-form-item path="email" label="Email">
          <n-input v-model:value="formData.email" placeholder="Enter your email" />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input
            v-model:value="formData.password"
            type="password"
            placeholder="Enter your password"
            @keydown.enter="handleLogin"
          />
        </n-form-item>
        <n-button
          type="primary"
          block
          :loading="loading"
          @click="handleLogin"
        >
          Login
        </n-button>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const message = useMessage()
const userStore = useUserStore()

const formRef = ref()
const loading = ref(false)
const formData = ref({
  email: 'admin@example.com',
  password: '123456'
})

const rules = {
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },
    { type: 'email', message: 'Please input valid email', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 6, message: 'Password length should be at least 6 characters', trigger: 'blur' }
  ]
}

const handleLogin = () => {
  formRef.value?.validate(async (errors: any) => {
    if (errors) return
    
    loading.value = true
    try {
      await userStore.login(formData.value.email, formData.value.password)
      message.success('Login successful')
      router.push('/')
    } catch (error: any) {
      message.error(error.message || 'Login failed')
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped lang="scss">
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  
  .login-box {
    width: 100%;
    max-width: 400px;
    padding: 40px;
    background: var(--card-background);
    border-radius: var(--border-radius);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    h2 {
      text-align: center;
      margin-bottom: 24px;
      color: var(--text-color);
    }
  }
}
</style> 