/*
 * @Author: m
 * @Date: 2025-02-25 14:12:30
 * @LastEditTime: 2025-02-25 18:55:33
 * @Description: 
 * @FilePath: \ai\src\services\ws.ts
 */
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { MockWebSocket } from '@/mock/ws'

export class WebSocketService {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectTimeout = 3000
  private heartbeatInterval: number | null = null
  
  constructor(
    private url: string,
    private WebSocketClass: { new(url: string): WebSocket } = WebSocket
  ) {}

  connect() {
    const userStore = useUserStore()
    
    try {
      this.ws = new this.WebSocketClass(`${this.url}?token=${userStore.token}`)

      this.ws.onopen = () => {
        console.log('WebSocket connected')
        this.reconnectAttempts = 0
        this.startHeartbeat()
      }

      this.ws.onclose = () => {
        console.log('WebSocket disconnected')
        this.stopHeartbeat()
        this.reconnect()
      }

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

      return this.ws
    } catch (error) {
      console.error('Failed to create WebSocket:', error)
      return null
    }
  }

  private reconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached')
      return
    }

    setTimeout(() => {
      this.reconnectAttempts++
      console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`)
      this.connect()
    }, this.reconnectTimeout)
  }

  private startHeartbeat() {
    this.heartbeatInterval = window.setInterval(() => {
      this.send({ type: 'ping' })
    }, 30000)
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    } else {
      console.error('WebSocket is not connected')
    }
  }

  close() {
    this.stopHeartbeat()
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

// 创建单例
export const wsService = new WebSocketService(
  import.meta.env.VITE_WS_URL,
  import.meta.env.DEV ? MockWebSocket : WebSocket
) 