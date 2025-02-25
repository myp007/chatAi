/*
 * @Author: m
 * @Date: 2025-02-25 14:08:52
 * @LastEditTime: 2025-02-25 14:14:08
 * @Description: 
 * @FilePath: \ai\src\env.d.ts
 */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_WS_URL: string
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
} 