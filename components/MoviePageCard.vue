<template>
  <div
    class="relative group bg-black/80 rounded-lg overflow-hidden shadow-lg w-full max-w-[200px] mx-auto border border-black/50 transition duration-300"
  >
    <!-- ②  Hover overlay -->
    <div
      class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300 pointer-events-none z-0"
    ></div>
    <img
      :src="imj"
      :alt="movie.title"
      class="w-full h-[300px] object-cover cursor-pointer"
      @click.stop="navigateTo(`/movie/${movie.id}`)"
    />
    <div class="p-3 space-y-2">
      <div class="flex items-center text-sm space-x-1 text-yellow-400">
        <span>★</span>
        <span>{{ movie.vote_average.toFixed(1) }}</span>
      </div>
      <p class="text-sm font-semibold text-white truncate mb-4">
        {{ movie.title }}
      </p>

      <!-- Tarih -->
      <p class="text-xs text-gray-400 mt-0.5">
        {{ formatTime(movie.release_date) }}
      </p>

      <!-- Butonlar -->
      <div class="flex flex-col space-y-2 text-sm">
        <button
          class="bg-[#1f1f1f] rounded-lg px-2 text-indigo-400 py-1 hover:bg-[#333]"
          :class="[
            'rounded-lg px-2 py-1 text-sm transition',
            inList ? 'text-indigo-300' : 'bg-[#1f1f1f] hover:bg-[#333]',
          ]"
          @click.stop="toggle"
        >
          <template v-if="showWatchlist">
            <SpinnerWatchlist class="py-2" />
          </template>
          <template v-else>
            <span v-if="inList" class="px-2 text-sm">✓ Watchlist</span>
            <span v-else>+ Watchlist</span>
          </template>
        </button>

        <button
          class="px-2 py-1 text-white hover:bg-[#333] rounded-lg flex items-center justify-center"
          @click="$emit('play', movie.id)"
        >
          <Icon name="mdi:play" class="mr-2 text-xl" /> Trailer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SpinnerWatchlist from './SpinnerWatchlist.vue'
import { useWatchListStore } from '~/stores/watchlist'
import type { Movie } from '~/types/movies'
import { formatTime } from '~/utils/formatDatee'
const watchlistStore = useWatchListStore()

const store = useWatchListStore()
const showWatchlist = ref(false)
/* mevcut film listede mi? */
const inList = computed(() => store.isInWatchlist(props.movie.id))

function toggle() {
  if (showWatchlist.value) return

  showWatchlist.value = true

  setTimeout(() => {
    store.toggleMovie({ ...props.movie, type: 'movie' })
    showWatchlist.value = false
  }, 2000)
}

const props = defineProps<{
  movie: Movie
  imj: string
}>()
const emit = defineEmits<{ (e: 'play', id: number): void }>()
</script>
