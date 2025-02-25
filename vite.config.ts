/*
 * @Author: m
 * @Date: 2025-02-25 14:09:16
 * @LastEditTime: 2025-02-25 15:28:55
 * @Description: 
 * @FilePath: \ai\vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 4000,
    host: '0.0.0.0'
    
  }
}) 