export type ThemeType = 'light' | 'dark'

export interface ThemeConfig {
  type: ThemeType
  primaryColor: string
  backgroundColor: string
  textColor: string
  secondaryColor: string
} 