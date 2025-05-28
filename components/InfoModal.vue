<template>
 <div v-if="showw" class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
    <div class="bg-gray-900 text-white p-6 rounded-lg w-full max-w-xl relative">
      <!-- Kapatma Butonu -->
      <button @click="$emit('close')" class="absolute top-3 right-4 text-xl hover:text-red-400"> <Icon name="mdi:close"/> </button>
      <img :src="`${config.public.imageBaseUrl}/w500${movie.poster_path}`" :alt="movie.title || 'One Film Poster'" class="w-full h-64 rounded-lg"/>
      <h2 class="text-2xl font-bold mb-2">{{ movie.title }}</h2>
      <p class="text-sm text-gray-300 mb-4">{{ movie.overview }}</p>
      <ul class="text-sm space-y-1">
        <li><strong>Release:</strong> {{ movie.release_date }}</li>
        <li><strong>Rating:</strong> {{ movie.vote_average }}/10</li>
        <li><strong>Language:</strong> {{ movie.original_language }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
defineProps<{
  showw: boolean;
  movie: any;
}>();

defineEmits<{
  (e: 'close'): void;
}>();
</script>

