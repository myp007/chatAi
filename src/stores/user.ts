import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/api/request'

export interface UserInfo {
  id: number
  name: string
  email: string
  avatar: string
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')
  const userInfo = ref<UserInfo | null>(null)

  const login = async (email: string, password: string) => {
    try {
      const res = await request.post<{token: string, user: UserInfo}>('/api/auth/login', {
        email,
        password
      })
      token.value = res.token
      userInfo.value = res.user
      return res
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    token.value = ''
    userInfo.value = null
  }

  const getUserInfo = async () => {
    try {
      const res = await request.get<UserInfo>('/api/user/info')
      userInfo.value = res
      return res
    } catch (error) {
      throw error
    }
  }

  return {
    token,
    userInfo,
    login,
    logout,
    getUserInfo
  }
}) 