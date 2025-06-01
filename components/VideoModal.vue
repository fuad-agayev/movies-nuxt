<template>
  <div
    v-if="shoow"
    @click.self="emit('close')"
    class="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center px-4"
  >
    <div class="relative w-full max-w-2xl aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
      <!-- Close Button -->
      <button
        @click="emit('close')"
        class="absolute top-2 right-2 text-white text-2xl hover:text-red-400 transition"
      >
        <Icon name="mdi:close" />
      </button>

      <!-- Video Iframe -->
      <iframe
        :src="`https://www.youtube.com/embed/${videoKey}?autoplay=1`"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        class="w-full h-full"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  shoow: boolean;
  videoKey: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>
