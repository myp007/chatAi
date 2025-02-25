export interface MenuItem {
  label: string
  key: string
  icon?: string
  path?: string
}

export interface UserInfo {
  id: number
  name: string
  email: string
  avatar: string
  progress?: number
} 