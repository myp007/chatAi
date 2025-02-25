import { defineStore } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'
import { wsService } from '@/services/ws'
import type { Message } from '@/types/message'
import type { WSMessage, WSResponse } from '@/types/ws'

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([])
  const loading = ref(false)
  const ws = ref<WebSocket | null>(null)

  const initWebSocket = () => {
    ws.value = wsService.connect()
    
    if (ws.value) {
      ws.value.onmessage = (event) => {
        const response: WSResponse = JSON.parse(event.data)
        
        if (response.type === 'chat') {
          const wsMessage: WSMessage = response.data
          messages.value.push({
            id: Date.now(),
            type: 'ai',
            content: wsMessage.content,
            time: new Date(wsMessage.timestamp).toLocaleTimeString(),
            avatar: '/ai-avatar.jpg'
          })
        }
      }
    }
  }

  const sendMessage = async (content: string) => {
    try {
      loading.value = true
      
      // 添加用户消息
      const userMessage: Message = {
        id: Date.now(),
        type: 'user',
        content,
        time: new Date().toLocaleTimeString(),
        avatar: '/user-avatar.jpg'
      }
      messages.value.push(userMessage)

      // 通过WebSocket发送消息
      wsService.send({
        type: 'chat',
        content,
        timestamp: Date.now()
      })

    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const clearMessages = () => {
    messages.value = []
  }

  // 组件卸载时关闭WebSocket连接
  onUnmounted(() => {
    wsService.close()
  })

  return {
    messages,
    loading,
    initWebSocket,
    sendMessage,
    clearMessages
  }
}) 