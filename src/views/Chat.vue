<template>
  <div class="chat-container">
    <div class="chat-main">
      <div class="messages" ref="messagesRef">
        <div v-for="msg in chatStore.messages" :key="msg.id" class="message" :class="msg.type">
          <n-avatar :src="msg.avatar" />
          <div class="content">
            <div class="text">{{ msg.content }}</div>
            <div class="time">{{ msg.time }}</div>
          </div>
        </div>
      </div>
      
      <div class="input-area">
        <n-input-group>
          <n-input
            v-model:value="inputMessage"
            type="textarea"
            placeholder="Type your message..."
            :autosize="{ minRows: 1, maxRows: 4 }"
            @keydown.enter.prevent="handleSend"
            :disabled="chatStore.loading"
          />
          <n-button 
            type="primary" 
            @click="handleSend"
            :loading="chatStore.loading"
          >
            <template #icon>
              <Icon icon="material-symbols:send" />
            </template>
            Send
          </n-button>
        </n-input-group>
      </div>
    </div>
    
    <div class="chat-history">
      <div class="header">
        <h3>Conversation History</h3>
        <n-button text>
          <template #icon>
            <Icon icon="material-symbols:edit" />
          </template>
        </n-button>
      </div>
      <div class="history-list">
        <div v-for="item in historyList" :key="item.id" class="history-item">
          <Icon :icon="item.icon" />
          <span>{{ item.title }}</span>
          <span class="time">{{ item.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { NInput, NButton, NAvatar } from 'naive-ui'
import { Icon } from '@iconify/vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
const inputMessage = ref('')
const messagesRef = ref<HTMLElement>()

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}

const handleSend = async () => {
  if (!inputMessage.value.trim() || chatStore.loading) return
  
  try {
    await chatStore.sendMessage(inputMessage.value)
    inputMessage.value = ''
    scrollToBottom()
  } catch (error) {
    // 处理错误
    console.error('Failed to send message:', error)
  }
}

// 初始化WebSocket连接
onMounted(() => {
  chatStore.initWebSocket()
  scrollToBottom()
})
</script>

<style scoped lang="scss">
.chat-container {
  display: flex;
  height: calc(100vh - 40px);
  gap: 20px;
  
  .chat-main {
    flex: 1;
    min-width: 0;
    background: var(--card-background);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    
    .messages {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      
      .message {
        display: flex;
        gap: 12px;
        margin-bottom: 24px;
        
        &.ai {
          flex-direction: row-reverse;
          
          .content {
            align-items: flex-end;
          }
        }
        
        .content {
          display: flex;
          flex-direction: column;
          gap: 4px;
          
          .text {
            background: var(--primary-color);
            color: white;
            padding: 12px 16px;
            border-radius: 12px;
            max-width: 70%;
          }
          
          .time {
            font-size: 12px;
            color: var(--text-secondary);
          }
        }
      }
    }
    
    .input-area {
      padding: 24px;
      border-top: 1px solid var(--border-color);
    }
  }
  
  .chat-history {
    width: 300px;
    background: var(--card-background);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    
    .header {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border-color);
      
      h3 {
        margin: 0;
        color: var(--text-color);
      }
    }
    
    .history-list {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
      
      .history-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;
        
        &:hover {
          background: var(--hover-color);
        }
        
        .time {
          margin-left: auto;
          font-size: 12px;
          color: var(--text-secondary);
        }
      }
    }
  }
}
</style> 