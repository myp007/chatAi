<template>
  <div class="sidebar" :class="[themeStore.currentTheme, { collapsed }]">
    <div class="logo">
      <!-- <img src="@/assets/logo.svg" alt="Fusion AI" /> -->
      <span>Fusion AI</span>
    </div>
    
    <div class="search">
      <n-input-group>
        <n-input placeholder="Search" />
        <n-button ghost>
          <template #icon>
            <Icon icon="material-symbols:search" />
          </template>
        </n-button>
      </n-input-group>
    </div>

    <n-menu
      :options="menuOptions"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
    />

    <div class="bottom-actions">
      <div class="user-info">
        <n-avatar :src="userInfo.avatar" />
        <div class="info" v-if="!collapsed">
          <span class="name">{{ userInfo.name }}</span>
          <span class="email">{{ userInfo.email }}</span>
        </div>
        <n-progress
          type="line"
          :percentage="userInfo.progress"
          :show-indicator="false"
          processing
        />
      </div>
      
      <div class="actions">
        <n-button quaternary circle @click="themeStore.toggleTheme">
          <template #icon>
            <Icon :icon="themeStore.currentTheme === 'light' ? 'material-symbols:dark-mode' : 'material-symbols:light-mode'" />
          </template>
        </n-button>
        <n-button quaternary circle @click="toggleCollapsed">
          <template #icon>
            <Icon :icon="collapsed ? 'material-symbols:menu-open' : 'material-symbols:menu'" />
          </template>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NMenu, NInput, NButton, NAvatar, NProgress, NInputGroup } from 'naive-ui'
import { Icon } from '@iconify/vue'
import type { MenuItem, UserInfo } from '@/types/menu'
import { useThemeStore } from '@/stores/theme'
import { useLayoutStore } from '@/stores/layout'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const layoutStore = useLayoutStore()
const { collapsed } = storeToRefs(layoutStore)

const userInfo = ref<UserInfo>({
  id: 1,
  name: 'Admin User',
  email: 'admin@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  progress: 68
})

const menuOptions = [
  {
    label: 'Home',
    key: 'home',
    icon: renderIcon('material-symbols:home'),
    path: '/'
  },
  {
    label: 'Chat',
    key: 'chat',
    icon: renderIcon('material-symbols:chat'),
    path: '/chat'
  },
  {
    label: 'Voice Tools',
    key: 'voice-tools',
    icon: renderIcon('material-symbols:mic'),
    path: '/voice-tools'
  },
  {
    label: 'Video Generation',
    key: 'video-generation',
    icon: renderIcon('material-symbols:video-library'),
    path: '/video-generation'
  }
]

function renderIcon(icon: string) {
  return () => h(Icon, { icon })
}

const toggleCollapsed = () => {
  layoutStore.toggleSidebar()
}
</script>

<style scoped lang="scss">
.sidebar {
  width: 260px;
  height: 100vh;
  background: var(--card-background);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  
  &.collapsed {
    width: 64px;
    
    .logo span {
      display: none;
    }
    
    .search {
      display: none;
    }
  }
  
  .logo {
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    gap: 12px;
    
    img {
      width: 32px;
      height: 32px;
    }
    
    span {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-color);
    }
  }
  
  .search {
    padding: 0 20px 20px;
  }
  
  .user-info {
    padding: 20px;
    border-top: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    .info {
      flex: 1;
      min-width: 0;
      
      .name {
        display: block;
        font-size: 14px;
        font-weight: 500;
        color: var(--text-color);
      }
      
      .email {
        display: block;
        font-size: 12px;
        color: var(--text-secondary);
      }
    }
    
    .n-progress {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
    }
  }

  .bottom-actions {
    margin-top: auto;
    border-top: 1px solid var(--border-color);
    
    .actions {
      display: flex;
      justify-content: flex-end;
      padding: 12px 20px;
      gap: 8px;
    }
  }
}
</style> 