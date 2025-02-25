export interface WSMessage {
  type: 'chat' | 'system'
  content: string
  timestamp: number
}

export interface WSResponse {
  type: string
  data: any
  message?: string
} 