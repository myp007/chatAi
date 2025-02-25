<template>
  <div class="main-content">
    <div class="header">
      <div class="left">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
      </div>
      <div class="right">
        <n-button type="primary" size="large">
          New Chat
        </n-button>
      </div>
    </div>
    
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton } from 'naive-ui'

const title = ref('Fusion AI: Your Digital Co-Pilot')
const description = ref('Unlock the Potential of AI. Seamlessly integrate machine learning, natural language understanding, and predictive analytics into your workflows.')
</script>

<style scoped lang="scss">
.main-content {
  flex: 1;
  padding: 24px;
  background: #f9f9f9;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    
    h1 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    
    p {
      color: #666;
      max-width: 600px;
    }
  }
  
  .content {
    background: #fff;
    border-radius: 12px;
    min-height: calc(100vh - 200px);
    padding: 24px;
  }
}
</style> 