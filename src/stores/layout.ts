import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  const collapsed = ref(false)

  const toggleSidebar = () => {
    collapsed.value = !collapsed.value
  }

  return {
    collapsed,
    toggleSidebar
  }
}) 