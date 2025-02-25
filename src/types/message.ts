export interface Message {
  id: number
  type: 'user' | 'ai'
  content: string
  time: string
  avatar: string
} 