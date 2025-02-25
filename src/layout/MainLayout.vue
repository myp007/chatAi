<template>
  <div class="main-layout" :class="[themeStore.currentTheme, { collapsed: layoutStore.collapsed }]">
    <Sidebar />
    <div class="content">
      <router-view />
    </div>
    <ChatBox />
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { useLayoutStore } from '@/stores/layout'
import Sidebar from './components/Sidebar.vue'
import ChatBox from './components/ChatBox.vue'

const themeStore = useThemeStore()
const layoutStore = useLayoutStore()
</script>

<style scoped lang="scss">
.main-layout {
  display: flex;
  height: 100vh;
  background: var(--background-color);
  transition: all 0.3s ease;
  
  &.collapsed {
    .content {
      margin-left: 64px;
    }
  }
  
  &.dark {
    --background-color: #141414;
    --card-background: #1f1f1f;
    --border-color: #333;
    --text-color: #fff;
    --text-secondary: #999;
    --primary-color: #7B66FF;
  }
  
  &.light {
    --background-color: #f5f5f5;
    --card-background: #fff;
    --border-color: #eee;
    --text-color: #333;
    --text-secondary: #666;
    --primary-color: #7B66FF;
  }
  
  .content {
    flex: 1;
    min-width: 0;
    padding: 20px;
    overflow: auto;
    margin-left: 260px;
    transition: all 0.3s ease;
  }

  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
  }
}
</style> 