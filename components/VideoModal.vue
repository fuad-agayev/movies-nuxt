<template>
  <div>
    <div v-if="shoow" @click.self="emit('close')" class="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
       <!-- X Button -->
    <button
      @click="emit('close')"
      class="text-white text-3xl font-bold hover:text-red-400 transition"
    >
      <Icon name="mdi:close"/>
    </button>
    <div class="w-full max-w-5xl aspect-video mt-24 border border-red-500">
      <iframe 
        :src="`https://www.youtube.com/embed/${videoKey}?autoplay=1`" 
        frameborder="0"
        allow="autoplay; encrypted-media" 
        allowfullscreen
        class="w-full h-full"
      ></iframe>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
   defineProps<{
    shoow: boolean;
    videoKey: string;
   }>();

  
   const emit = defineEmits<{
     (e: 'close'): void
   }>();
</script>

