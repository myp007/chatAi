/*
 * @Author: m
 * @Date: 2025-02-25 14:10:33
 * @LastEditTime: 2025-02-25 15:15:38
 * @Description: 
 * @FilePath: \ai\src\mock\index.ts
 */
import Mock from 'mockjs'

// 设置延迟时间和响应格式
Mock.setup({
  timeout: '300-600'
})

// 用户相关接口
Mock.mock(new RegExp('/api/auth/login'), 'post', (options) => {
  const { email, password } = JSON.parse(options.body)
  if (email === 'admin@example.com' && password === '123456') {
    return {
      code: 200,
      data: {
        token: 'mock-token-' + Mock.Random.string('abcdef0123456789', 32),
        user: {
          id: 1,
          name: 'Admin User',
          email: 'admin@example.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
        }
      },
      message: 'Login successful'
    }
  }
  return {
    code: 401,
    message: 'Invalid credentials'
  }
})

// 获取用户信息
Mock.mock(new RegExp('/api/user/info'), 'get', () => {
  return {
    code: 200,
    data: {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
    }
  }
})

// 聊天相关接口
Mock.mock('/api/chat/send', 'post', (options) => {
  const { message } = JSON.parse(options.body)
  return {
    code: 200,
    data: {
      content: Mock.Random.pick([
        'I understand what you mean.',
        'That\'s an interesting point.',
        'Let me think about that for a moment.',
        'Here\'s what I think about that...',
        'Could you elaborate on that?'
      ]) + ' ' + Mock.Random.sentence(5, 10)
    }
  }
})

export default Mock 