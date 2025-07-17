<template>
  <div
    class="relative group transition-all duration-300 ease-in-out cursor-pointer h-full shadow-md"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="navigateToMovie"
  >
    <!-- Three-dot menu button -->
    <div class="absolute top-2 right-2 z-50" @click.stop>
      <button
        class="p-1 bg-white/70 w-7 h-7 rounded-full hover:bg-gray-500 transition-colors"
        data-test="movie-options-butn"
        data-testid="movie-options-btn"
        @click="toggleFavMenu"
      >
        <Icon
          name="mdi:dots-horizontal"
          class="text-black/70 text-xl hover:text-white"
        />
      </button>

      <!-- Dropdown menu -->
      <transition name="fade">
        <div
          v-if="props.activeMenuId === props.movie.id"
          class="mt-3 w-35 bg-white text-black/80 rounded shadow-lg absolute right-0 border-b-2 border-gray-500 flex flex-col items-center z-50"
          @click.stop
        >
          <!-- FAVORITE -->
          <button
            class="w-full h-10 px-4 py-6 text-black hover:text-white hover:bg-gray-500 flex items-center space-x-2 transition-colors"
            @click.stop="toggleFavour"
          >
            <Icon
              :name="isFavour ? 'mdi:heart' : 'mdi:heart-outline'"
              :class="[isFavour ? 'text-rose-400' : 'text-black', 'text-sm']"
            />
            <span class="text-sm font-semibold">Favorite</span>
          </button>

          <!-- WATCHLIST -->
          <button
            class="w-full h-10 px-4 py-6 text-black/80 hover:text-white hover:bg-gray-500 flex items-center space-x-2 border-t border-t-gray-300 transition-colors"
            data-testid="toggle-watchlist-btn"
            @click.stop="toggleWatchlist"
          >
            <Icon
              :name="inWatchlist ? 'mdi:bookmark' : 'mdi:bookmark-outline'"
              :class="[
                inWatchlist ? 'text-amber-700' : 'text-black',
                'text-sm',
              ]"
            />
            <span class="text-sm font-semibold">Watchlist</span>
          </button>

          <!-- YOUR RATING (New) -->
          <button
            class="w-full h-10 px-4 py-6 text-black/80 hover:text-white hover:bg-gray-500 flex items-center space-x-2 border-t border-t-gray-300 transition-colors"
            @click.stop="showRatingModal = true"
          >
            <Icon
              :name="
                ratingStore.getRatings(movie.id)
                  ? 'mdi:star'
                  : 'mdi:star-outline'
              "
              :class="{
                'text-yellow-600': ratingStore.getRatings(movie.id), // Puan varsa yıldız sarı
                'text-black': !ratingStore.getRatings(movie.id), // Yoksa siyah
              }"
            />
            <span class="text-sm font-semibold"> Ratings </span>
          </button>
          <RatingModal
            :movie-id="movie.id"
            :visible="showRatingModal"
            @close="showRatingModal = false"
          />
        </div>
      </transition>
    </div>

    <!-- Poster image -->
    <div :class="cardClasses">
      <img
        :src="posterUrl"
        :alt="movie.title"
        class="w-full h-full object-cover transition-opacity duration-300"
        loading="lazy"
        @error="handleImageError"
      />
    </div>

    <!-- Bottom info section (always visible) -->
    <div
      class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent"
    >
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-lg text-white font-semibold line-clamp-1">
            {{ movie.title }}
          </h3>
          <div class="text-xs text-gray-300">
            {{ formatDate(movie.release_date) }}
          </div>
        </div>
        <div
          class="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded"
        >
          {{ movie.vote_average?.toFixed(1) || 'N/A' }}
        </div>
      </div>
    </div>

    <!-- Hover overlay -->
    <transition name="fade">
      <div
        v-if="isHovered"
        class="absolute top-0 left-0 w-full h-full rounded-md flex flex-col items-center justify-end p-3 z-40"
      >
        <!-- Gradient + blur background -->
        <div
          class="absolute inset-0 rounded-md bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-md"
        ></div>

        <!-- Content -->
        <div class="relative z-10 text-center w-full">
          <div class="flex justify-center space-x-3">
            <button
              class="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              :title="isFavour ? 'Remove from favorites' : 'Add to favorites'"
              @click.stop="toggleFavour"
            >
              <Icon
                :name="isFavour ? 'mdi:heart' : 'mdi:heart-outline'"
                class="text-white text-xl"
              />
            </button>

            <button
              class="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              :title="
                inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'
              "
              @click.stop="toggleWatchlist"
            >
              <Icon
                :name="inWatchlist ? 'mdi:bookmark' : 'mdi:bookmark-outline'"
                class="text-white text-xl"
              />
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import RatingModal from './RatingModal.vue'

import type { Movie } from '~/types/movies'
import { useFavoritesStore } from '~/stores/favourites'
import { useWatchListStore } from '~/stores/watchlist'
import { formatTime } from '~/utils/formatDatee'

import { useRatingStore } from '~/stores/ratingstar'

const props = defineProps<{ movie: Movie; activeMenuId: number | null }>()

const emit = defineEmits<{
  (e: 'update:activeMenuId', id: number | null): void
}>()

const config = useRuntimeConfig().public

// State
const isHovered = ref(false)
const imgError = ref(false)
const showFavMenu = ref(false)

// Stores
const favoritesStore = useFavoritesStore()
const watchlistStore = useWatchListStore()

// Computed
const cardClasses = computed(() => [
  'w-full h-full overflow-hidden rounded-md transition-transform duration-300',
  isHovered.value ? 'transform scale-105 z-20 shadow-xl' : '',
])

const isFavour = computed(() =>
  favoritesStore.favorites.includes(props.movie.id)
)
const inWatchlist = computed(() => watchlistStore.isInWatchlist(props.movie.id))

const posterUrl = computed(() => {
  if (imgError.value || !props.movie.poster_path) {
    return '/images/troya.jpg'
  }
  return `${config.imageBaseUrl}/w342${props.movie.poster_path}`
})

// Methods
const toggleFavMenu = () => {
  if (props.activeMenuId === props.movie.id) {
    emit('update:activeMenuId', null) // Kapat
  } else {
    emit('update:activeMenuId', props.movie.id) // Aç ve diğerlerini kapat
  }
  // showFavMenu.value = !showFavMenu.value
}

const toggleFavour = () => {
  favoritesStore.toggleFavorite(props.movie.id)
  showFavMenu.value = false
}

const toggleWatchlist = () => {
  watchlistStore.toggleMovie({ ...props.movie, type: 'movie' })
  showFavMenu.value = false
}

const openRatingModal = () => {
  // Implement your rating modal logic here
  console.log('Open rating modal for', props.movie.id)
  showFavMenu.value = false
}

const handleImageError = () => {
  imgError.value = true
}

const navigateToMovie = () => {
  navigateTo(`/movie/${props.movie.id}`)
}

const formatDate = (dateString: string) => {
  return formatTime(dateString)
}

// const props = defineProps<{ movie: { id: number, title: string } }>()
const showRatingModal = ref(false)
const ratingStore = useRatingStore()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
