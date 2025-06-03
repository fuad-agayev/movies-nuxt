<script setup lang="ts">
import { useWatchListStore } from '~/stores/watchlist'
import { useRuntimeConfig } from '#imports'
const watchlistStore = useWatchListStore()
const config = useRuntimeConfig()
</script>

<template>
<div>
  <ClientOnly>
<section class="px-4 py-8 text-whit min-h-screen">
    <h1 class="text-2xl font-bold mb-6">🎬 My Watchlist</h1>

    <div v-if="watchlistStore.movies.length === 0" class="text-gray-400">
      Henüz hiç film eklenmedi.
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      
      <div
        v-for="movie in watchlistStore.movies"
        :key="movie.id"
        class="bg-gray-800 rounded-lg overflow-hidden shadow-md" 
      >
       <Icon name="mdi:close" @click="()=> watchlistStore.removeMovie(movie.id)" class="text-rose-500 font-bold text-xl cursor-pointer"/>
        <img
          :src="`${config.public.imageBaseUrl}/w500${movie.poster_path}`"
          :alt="movie.title"
          class="w-full h-[300px] object-cover"
        />
        <div class="p-4">
          <h2 class="text-lg font-semibold mb-2">{{ movie.title }}</h2>
          <p class="text-sm text-gray-300 mb-2">{{ movie.release_date }}</p>
          <p class="text-sm text-gray-400 line-clamp-3">{{ movie.overview }}</p>
        </div>
      </div>
    </div>
  </section>
  </ClientOnly>
</div>
</template>

        
      
    
 
