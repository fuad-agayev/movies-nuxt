<template>
  <transition name="fade">
    <div v-if="visible" class="fixed bottom-5 right-5 bg-rose-400 text-black/70 font-bold px-4 py-4 rounded-lg shadow-md">
      {{ message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')

function show(msg: string, duration = 3000) {
  message.value = msg
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, duration)
}

defineExpose({ show })
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>