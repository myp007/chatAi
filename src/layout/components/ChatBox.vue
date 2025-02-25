<template>
  <div class="chat-box" :class="{ 'chat-box-open': isOpen }">
    <div class="chat-toggle" @click="toggleChat">
      <i class="fas fa-comments"></i>
    </div>
    <div class="chat-container">
      <div class="chat-header">
        <h3>聊天</h3>
        <button class="close-btn" @click="toggleChat">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="chat-messages" ref="messagesContainer">
        <div v-for="(message, index) in messages" :key="index" class="message" :class="message.type">
          <div class="message-content">{{ message.content }}</div>
          <div class="message-time">{{ formatTime(message.timestamp) }}</div>
        </div>
      </div>
      <div class="chat-input">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="输入消息..."
        />
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { wsService } from '@/services/ws'

interface Message {
  content: string
  type: 'sent' | 'received'
  timestamp: number
}

const isOpen = ref(false)
const messages = ref<Message[]>([])
const newMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

const toggleChat = () => {
  isOpen.value = !isOpen.value
}

const formatTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  const message: Message = {
    content: newMessage.value,
    type: 'sent',
    timestamp: Date.now()
  }

  messages.value.push(message)
  wsService.send({
    type: 'chat',
    content: newMessage.value
  })
  
  newMessage.value = ''
  scrollToBottom()
}

// 模拟接收消息
const handleReceiveMessage = (event: MessageEvent) => {
  const data = JSON.parse(event.data)
  if (data.type === 'chat') {
    messages.value.push({
      content: data.content,
      type: 'received',
      timestamp: Date.now()
    })
    scrollToBottom()
  }
}

onMounted(() => {
  if (wsService['ws']) {
    wsService['ws'].addEventListener('message', handleReceiveMessage)
  }
})

onUnmounted(() => {
  if (wsService['ws']) {
    wsService['ws'].removeEventListener('message', handleReceiveMessage)
  }
})
</script>

<style scoped lang="scss">
.chat-box {
  position: fixed;
  right: -400px;
  bottom: 20px;
  width: 400px;
  height: 600px;
  background: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 1000;

  &.chat-box-open {
    right: 20px;
  }

  .chat-toggle {
    position: absolute;
    left: -60px;
    bottom: 0;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    i {
      font-size: 20px;
    }
  }

  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .chat-header {
    padding: 15px;
    background: var(--primary-color);
    color: white;
    border-radius: 8px 8px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
      font-size: 16px;
    }

    .close-btn {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 16px;
    }
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .message {
      max-width: 80%;
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 5px;

      &.sent {
        align-self: flex-end;
        background: var(--primary-color);
        color: white;
      }

      &.received {
        align-self: flex-start;
        background: var(--border-color);
        color: var(--text-color);
      }

      .message-content {
        margin-bottom: 4px;
      }

      .message-time {
        font-size: 12px;
        opacity: 0.8;
      }
    }
  }

  .chat-input {
    padding: 15px;
    border-top: 1px solid var(--border-color);
    display: flex;
    gap: 10px;

    input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      background: var(--card-background);
      color: var(--text-color);

      &:focus {
        outline: none;
        border-color: var(--primary-color);
      }
    }

    button {
      padding: 8px 16px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.9;
      }
    }
  }
}
</style> 