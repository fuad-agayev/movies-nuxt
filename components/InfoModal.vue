<template>
  <div
    v-if="showw"
    @click.self="$emit('close')"
    class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
  >
    <div
      class="relative bg-transparent text-white rounded-lg shadow-lg w-full max-w-2xl overflow-hidden border border-white/20"
    >
      <!-- Close Button -->
      <button
        @click="$emit('close')"
        class="absolute top-3 right-3 text-white text-2xl hover:text-red-400 transition"
      >
        <Icon name="mdi:close" />
      </button>

      <!-- Modal Content -->
      <div class="flex flex-col md:flex-row">
        <!-- Poster Image -->
        <img
          :src="`${config.public.imageBaseUrl}/w500${movie.poster_path}`"
          :alt="movie.title || 'Movie Poster'"
          class="w-full md:w-1/2 h-64"
        />

        <!-- Movie Info -->
        <div class="p-4 flex-1">
          <h2 class="text-2xl font-bold mb-2">{{ movie.title }}</h2>
          <p class="text-sm text-gray-300 mb-4 line-clamp-4">
            {{ movie.overview }}
          </p>
          <ul class="text-sm space-y-1">
            <li><strong>Release:</strong> {{ movie.release_date }}</li>
            <li><strong>Rating:</strong> {{ Math.round((movie?.vote_average || 0) * 10) }}%</li>
            <li><strong>Language:</strong> {{ movie.original_language }}</li>
            <li><strong>Popularity:</strong> {{ movie.popularity.toFixed(2) }}</li>
            <li><strong>Vote Count:</strong> {{ movie.vote_count }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

defineProps<{
  showw: boolean
  movie: any
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>
