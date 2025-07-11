<template>
  <div
    v-if="shoow"
    @click.self="emit('close')"
    class="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center px-4"
    data-cy="video-modal"
  >
    <div
      class="relative w-full max-w-2xl aspect-video bg-black rounded-lg overflow-hidden shadow-lg"
    >
      <!-- Close Button -->
      <button
        @click="emit('close')"
        class="absolute top-2 right-2 text-white text-2xl hover:text-red-400 transition"
        data-cy="close-button"
      >
        <Icon name="mdi:close" />
      </button>
 <!-- 3 Saniyelik Spinner -->
     <div class="absolute inset-0 flex items-center justify-center pointer-events-none my-auto">
  <SpinnerLoading
    v-if="videoLoading"
    class="scale-150 text-white"
  />
  </div>
      <!-- Video Iframe -->
       
  <iframe
         v-if="!videoLoading"
        :src="`https://www.youtube.com/embed/${videoKey}?autoplay=1`"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        class="w-full h-full border-2 border-white/30"
      ></iframe>
     
    </div>
  </div>
</template>


<script setup lang="ts">
import SpinnerLoading from '~/components/SpinnerLoading.vue'
const props = defineProps<{
  shoow: boolean
  videoKey: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()


const videoLoading = ref(true)
watch(() => props.videoKey, () => {
  if (props.videoKey) {
    videoLoading.value = true
    setTimeout(() => {
      videoLoading.value = false
    }, 5000)
  }
})
</script>
