/* File: components/FilmCard.vue */
<script setup lang="ts">
import type { Movie } from '~/types/movies';
const props = defineProps<{ movie: Movie }>()

const config = useRuntimeConfig().public;
const isHovered = ref(false);
const imgError = ref(false);

const posterUrl = computed(() => {
  if (imgError.value || !props.movie.poster_path) {
    return '/no-poster.png';
  }
  return `${config.imageBaseUrl}/w342${props.movie.poster_path}`;
});

const getReleaseYear = computed(() => {
  if (!props.movie.release_date) return '';
  return new Date(props.movie.release_date).getFullYear();
});

const handleImageError = () => {
  imgError.value = true;
};

const navigateToMovie = () => {
  navigateTo(`/movie/${props.movie.id}`);
};
</script>
<template>
  <div 
    class="relative group transition-all duration-300 ease-in-out cursor-pointer h-full shadow-md"
    @mouseenter="isHovered = true" 
    @mouseleave="isHovered = false"
    @click="navigateToMovie"
  >
    <!-- Normal Poster -->
    <div
      :class="[
        'w-full h-full overflow-hidden rounded-md transition-transform duration-300',
        isHovered ? 'scale-95 z-20 shadow-xl' : ''
      ]"
    >
      <img 
        :src="posterUrl" 
        :alt="movie.title" 
        class="w-full h-full object-cover transition-opacity duration-300"
        @error="handleImageError"
      />
    </div>

   <transition name="fade">
      <div 
        v-if="isHovered" 
        class="absolute top-0 left-0 w-full h-full bg-netflix-dark bg-opacity-95 rounded-md flex flex-col p-3 z-30"
      >
        <img 
          :src="posterUrl" 
          :alt="movie.title" 
          class="w-full aspect-video object-cover rounded mb-3"
        />

        <h3 class="text-sm font-semibold mb-1 line-clamp-1">{{ movie.title }}</h3>

        <div class="flex items-center justify-between text-xs mb-2 text-gray-400">
          <span class="text-green-500">{{ Math.round((movie.vote_average || 0) * 10) }}% Match</span>
          <span>{{ getReleaseYear }}</span>
        </div>

        <p class="text-xs text-gray-300 line-clamp-3 mb-3">{{ movie.overview }}</p>

        <div class="flex justify-center items-center mt-auto mb-6">
          <div class="flex space-x-2">
            <button class="border border-gray-500 text-white rounded-lg p-2 text-xl">
              <Icon name="mdi:plus" size="1.2em" />
            </button>
          </div>
          
        </div>
       </div>
    </transition>
  </div>
</template>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
