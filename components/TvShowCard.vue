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
        @click="toggleFavMenu" 
        class="p-1 bg-white/70 w-7 h-7 rounded-full hover:bg-gray-500 transition-colors"
        aria-label="Movie options"
      >
        <Icon name="mdi:dots-horizontal" class="text-black/70 text-xl hover:text-white" />
      </button>

      <!-- Dropdown menu -->
      <transition name="fade">
        <div
           v-if="props.activeMenuId === props.tvshow.id"
          class="mt-3 w-35 bg-white text-black/80 rounded shadow-lg absolute right-0 border-b-2 border-gray-500 flex flex-col items-center z-50"
          @click.stop
        >
          <!-- FAVORITE -->
          <button
            @click.stop="toggleFavour"
            class="w-full h-10 px-4 py-6 text-black hover:text-white hover:bg-gray-500 flex items-center space-x-2 transition-colors"
          >
            <Icon 
              :name="isFavour ? 'mdi:heart' : 'mdi:heart-outline'" 
              :class="[isFavour ? 'text-rose-400' : 'text-black', 'text-sm']"
            />
            <span class="text-sm font-semibold">Favorite</span>
          </button>

          <!-- WATCHLIST -->
          <button
            @click.stop="toggleWatchlist"
            class="w-full h-10 px-4 py-6 text-black/80 hover:text-white hover:bg-gray-500 flex items-center space-x-2 border-t border-t-gray-300 transition-colors"
          >
            <Icon 
              :name="inWatchlist ? 'mdi:bookmark' : 'mdi:bookmark-outline'" 
              :class="[inWatchlist ? 'text-amber-700' : 'text-black', 'text-sm']" 
            />
            <span class="text-sm font-semibold">Watchlist</span>
          </button>

          <!-- YOUR RATING (New) -->
          <button
            @click.stop="showRatingModal = true"
            class="w-full h-10 px-4 py-6 text-black/80 hover:text-white hover:bg-gray-500 flex items-center space-x-2 border-t border-t-gray-300 transition-colors"
           
          >
            <Icon :name="ratingStore.getRatings(tvshow.id) ? 'mdi:star' : 'mdi:star-outline'" 
                  :class="{
                          'text-yellow-600': ratingStore.getRatings(tvshow.id),  // Puan varsa yıldız sarı
                          'text-black': !ratingStore.getRatings(tvshow.id)        // Yoksa siyah
                         }" 
             />
            <span class="text-sm font-semibold"> Ratings </span>
            
          </button>
          <RatingModal
            :movieId="tvshow.id"
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
        :alt="tvshow.title"
        class="w-full h-full object-cover transition-opacity duration-300"
        @error="handleImageError"
        loading="lazy"
      />
    </div>

    <!-- Bottom info section (always visible) -->
    <div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-lg text-white font-semibold line-clamp-1">{{ tvshow.name }}</h3>
          <div class="text-xs text-gray-300">{{ formatDate(tvshow.first_air_date) }}</div>
        </div>
        <div class="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
          {{ tvshow.vote_average?.toFixed(1) || 'N/A' }}
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
        <div class="absolute inset-0 rounded-md bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-md"></div>

        <!-- Content -->
        <div class="relative z-10 text-center w-full">
          <div class="flex justify-center space-x-3">
            <button 
              @click.stop="toggleFavour"
              class="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              :title="isFavour ? 'Remove from favorites' : 'Add to favorites'"
            >
              <Icon 
                :name="isFavour ? 'mdi:heart' : 'mdi:heart-outline'" 
                class="text-white text-xl"
              />
            </button>
            
            <button 
              @click.stop="toggleWatchlist"
              class="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              :title="inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'"
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
import type { TvShow, Movie } from '~/types/movies'
import { useFavoritesStore } from '~/stores/favourites'
import { useWatchListStore } from '~/stores/watchlist'
import { formatTime } from '~/utils/formatDatee'

const props = defineProps<{ tvshow: TvShow, activeMenuId: number | null }>()


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
  isHovered.value ? 'transform scale-105 z-20 shadow-xl' : ''
])

const isFavour = computed(() => favoritesStore.favorites.includes(props.tvshow.id))
const inWatchlist = computed(() => watchlistStore.isInWatchlist(props.tvshow.id))

const posterUrl = computed(() => {
  if (imgError.value || !props.tvshow.poster_path) {
    return '/images/troya.jpg'
  }
  return `${config.imageBaseUrl}/w342${props.tvshow.poster_path}`
})

// Methods
const toggleFavMenu = () => {
   if (props.activeMenuId === props.tvshow.id) {
    emit('update:activeMenuId', null)  // Kapat
  } else {
    emit('update:activeMenuId', props.tvshow.id)  // Aç ve diğerlerini kapat
  }
 // showFavMenu.value = !showFavMenu.value
}

const toggleFavour = () => {
  favoritesStore.toggleFavorite(props.tvshow.id)
  showFavMenu.value = false
}



const toggleWatchlist = () => {
  const fakeMovie = {
    ...props.tvshow,
    type: 'tv',             // store hâlâ movie bekliyor
    title: props.tvshow.name,  // Movie alanı
    release_date: props.tvshow.first_air_date // Movie alanı
  } as unknown as Movie        // CAST!
  
  watchlistStore.toggleMovie(fakeMovie)
  showFavMenu.value = false
}

const openRatingModal = () => {
  // Implement your rating modal logic here
  console.log('Open rating modal for', props.tvshow.id)
  showFavMenu.value = false
}

const handleImageError = () => {
  imgError.value = true
}

const navigateToMovie = () => {
  navigateTo(`/tv/${props.tvshow.id}`)
}

const formatDate = (dateString: string) => {
  return formatTime(dateString)
}

import RatingModal from './RatingModal.vue'
import { useRatingStore } from '~/stores/ratingstar'

//const props = defineProps<{ movie: { id: number, title: string } }>()
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
