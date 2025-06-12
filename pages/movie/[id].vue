<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useHead, useRuntimeConfig } from '#imports'
import VideoModal from '~/components/VideoModal.vue'
import CircularRating from '~/components/CircularRating.vue'
import { useWatchListStore } from '~/stores/watchlist'
import { useFavoritesStore } from '~/stores/favourites'
import { useRatingStore } from '~/stores/ratingstar'
import VibeModal from '~/components/VibeModal.vue'


const { fetchMovies } = useTmdb()
const { fetchVideo } = videoTmdb()
const route = useRoute()
const config = useRuntimeConfig()
const watchlistStore = useWatchListStore()
const favoritesStore = useFavoritesStore()


const movie = ref<any>(null)
const trailerKey = ref('')
const showPlayer = ref(false)
const directorName = ref('')
const castList = ref<any[]>([])
const showVibeModal = ref(false)

// Fetch movie data
onMounted(async () => {
  const movieId = route.params.id
  try {
    movie.value = await fetchMovies(`movie/${movieId}`)
    const credits = await fetchMovies(`movie/${movieId}/credits`)
    const director = credits.crew.find((cre: any) => cre.job === 'Director')
    directorName.value = director ? director.name : 'Unknown Director'
    castList.value = credits.cast

    const videoRes = await fetchVideo(`movie/${movieId}/videos`)
    const trailer = videoRes.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube')
    trailerKey.value = trailer?.key || ''
  } catch (error) {
    console.error('Error fetching movie details:', error)
  }
})

// Favorites functionality
const isFavorite = computed<boolean>(() => favoritesStore.favorites.includes(movie.value?.id))

const toggleFavorites = () => {
  if (!movie.value?.id) return
  favoritesStore.toggleFavorite(movie.value.id)
}

// Watchlist functionality   
// BU ISLEM FILMCARD daki gibi STOREDEN TOGGLE MOVIE ve ISINWATCHLIST GETIRMEKLE DE YAPMAK OLUR  BOYLEDE KALSIN DIYE SAKLADIM
const inWatchlist = computed(() => watchlistStore.movies.some(item => item.id === movie.value?.id))

const toggleWatchlist = () => {
  try {
    if (!movie.value?.id) return

    if (inWatchlist.value) {
      watchlistStore.removeMovie(movie.value.id)
    } else {
      watchlistStore.addMovie({ ...movie.value, type: 'movie' })
    }
  } catch (error) {
    console.error('Watchlist işleminde hata:', error)
  }
}

const ratingStore = useRatingStore();
const ratingUser = computed(() => {
  return ratingStore.getRatings(movie.value?.id || 0)
})

//  bu islemi ternary ile templatede yapdim  boylede yapilir
/*
const getRatingColor = (percent: number) => {
  if (percent <= 30) return 'text-rose-400'
  if (percent <= 60) return 'text-yellow-400'
  return 'text-green-400'
}

  :class="getRatingColor(userRating * 20)"
*/

const formatRuntime = (mins: number) => `${Math.floor(mins / 60)}h ${mins % 60}m`

// Dynamic head tags
useHead(() => ({
  title: movie.value?.title ? `Film: ${movie.value.title}` : 'Film Yükleniyor...',
  meta: [
    { name: 'description', content: movie.value?.overview || 'Film açıklaması bulunamadı.' },
    { property: 'og:description', content: movie.value?.overview || 'Açıklama yok.' },
    {
      property: 'og:image',
      content: movie.value?.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.value.poster_path}`
        : ''
    },
    { name: 'twitter:title', content: movie.value?.title || 'Film' },
    {
      name: 'twitter:image',
      content: movie.value?.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.value.poster_path}`
        : ''
    }
  ]
}))

// BU OBJE DIR DINAMIKLIK SAGLAMAZ ONCE NE DEYER VERDINSE SABIR OLARAK ONU GOSTERIR
//useHead({
// title: movie.value?.title ? Film: ${movie.value.title} : 'Film Yükleniyor...'
//})
</script>

<template>
  <div>
    <section class="text-white px-4 py-8 bg-cover bg-center relative overflow-hidden">
      <div
        class="absolute top-0 right-0 h-full w-3/5 bg-cover bg-center blur-sm opacity-30 scale-110 z-0"
        :style="
          movie?.backdrop_path
            ? `background-image: url(${config.public.imageBaseUrl}/original${movie.backdrop_path})`
            : ''
        "
      ></div>
      <div class="absolute inset-0 bg-black bg-opacity-70"></div>

      <div v-if="movie" class="relative z-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div class="w-full flex justify-center md:justify-start items-center">
          <img
            :src="`${config.public.imageBaseUrl}/w500${movie.poster_path}`"
            :alt="movie.title"
            class="w-full mx-auto rounded"
          />
        </div>

        <div class="col-span-2 flex flex-col justify-center">
          <h1 class="text-4xl font-bold mb-2">
            {{ movie.title }}
            <span class="text-2xl text-gray-400">({{ movie.release_date?.slice(0, 4) }})</span>
          </h1>
          <p>
            <strong>Genres:</strong> {{ movie.genres.map((g: any) => g.name).join(', ') }}
            <span class="text-sm text-gray-400">{{ formatRuntime(movie.runtime) }}</span>
          </p>

          <!-- Rating and Play Trailer -->
          <div class="flex items-center gap-4 mb-4 mt-4">
            <CircularRating :score="movie?.vote_average || 0" class="hover:scale-105" />

            <button
              v-if="trailerKey"
              @click="showPlayer = true"
              class="inline-flex items-center hover:text-white/20 text-white text-sm font-semibold px-4 py-2 rounded shadow-xl transition-colors"
            >
              <Icon name="mdi:play" class="mr-2 text-xl" /> Play Trailer
            </button>
          </div>

          <!-- Action Buttons (Bookmark and Favorite) -->
          <div class="flex items-center gap-4 mb-6">
            <!-- Bookmark Button -->
            <div class="relative group">
              <button
                @click="toggleWatchlist"
                class="flex items-center p-2 rounded hover:bg-gray-700 transition-colors"
              >
                <Icon
                  :name="inWatchlist ? 'mdi:bookmark' : 'mdi:bookmark-outline'"
                  class="text-white text-2xl transition-all duration-300 hover:scale-110"
                />
              </button>
              <div
                class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
              >
                {{ inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist' }}
              </div>
            </div>

            <!-- Favorite Button -->
            <div class="relative group">
              <button
                @click="toggleFavorites"
                class="flex items-center p-2 rounded hover:bg-gray-700 transition-colors"
              >
                <Icon
                  :name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'"
                  :class="isFavorite ? 'text-rose-500 text-2xl' : 'text-white text-2xl'"
                  class="transition-all duration-300 hover:scale-110"
                />
              </button>
              <div
                class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
              >
                {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
              </div>
            </div>
            <!-- User Rating Display -->
<div v-if="ratingUser > 0" @click="showVibeModal = true"
  class="flex items-center justify-center gap-x-2 text-sm text-gray-400 w-[180px] h-10 border border-white/50 rounded-xl text-center py-2 bg-white/20 shadow-xl"
  >
  <button>
    <span class="text-white font-semibold"> Your Vibe </span>
  <span class="text-white px-1"> {{ Math.round(ratingUser) }}/5 </span>
  <span class="gap-4" :class="[ratingUser * 20 <= 30 ? 'text-rose-400' : ratingUser * 20 <= 60 ? 'text-yellow-400' : 'text-green-500' ]">
     {{ (ratingUser * 20) }}%
  </span>
   </button>
</div>
<div v-else  @click="showVibeModal = true" class="text-sm font-semibold text-white w-[150px] h-10 cursor-pointer border border-white rounded-xl text-center py-2 bg-white/20">
  Whats's your Vibe ?
</div>

          </div>

          <p class="text-lg text-gray-300 italic mb-4">{{ movie.tagline }}</p>
          <h4 class="text-xl text-gray-200 font-semibold">Overview</h4>
          <p class="mb-6 text-base text-gray-400 leading-relaxed">{{ movie.overview }}</p>

          <!-- Movie details -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm font-bold text-gray-200">
                Status: <span class="ml-2 text-gray-400">{{ movie.status }}</span>
              </p>
              <p class="text-sm font-bold text-gray-200">
                Director: <span class="text-gray-400 ml-2">{{ directorName }}</span>
              </p>
              <p class="text-sm text-gray-400 font-bold mt-2">
                <strong class="text-gray-200">Languages:</strong>
                {{ movie.spoken_languages.map((l: any) => l.name).join(', ') }}
              </p>
            </div>
            <div>
              <p class="text-gray-400 text-sm font-bold">
                <strong class="text-gray-200">Budget:</strong> ${{ movie.budget.toLocaleString() }}
              </p>
              <p class="text-gray-400 text-sm font-bold mt-2">
                <strong class="text-gray-200">Revenue:</strong> ${{
                  movie.revenue.toLocaleString()
                }}
              </p>
              <p class="text-gray-400 text-sm font-bold mt-2">
                <strong class="text-gray-200">Countries:</strong>
                {{ movie.production_countries.map((c: any) => c.name).join(', ') }}
              </p>
              <p v-if="movie.homepage" class="mt-2">
                <strong class="text-gray-200">Homepage:</strong>
                <a :href="movie.homepage" class="text-blue-400 underline" target="_blank">Visit</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <VideoModal :shoow="showPlayer" :videoKey="trailerKey" @close="showPlayer = false" />
      <VibeModal v-if="movie"
  :visible="showVibeModal"
  :movie-id="movie?.id"
  :movie-title="movie?.title"
  @close="showVibeModal = false"
/>

    </section>

    <!-- Cast Section -->
    <div v-if="castList.length" class="mt-10 w-full max-w-6xl mx-auto px-2">
      <h2 class="text-xl font-bold mb-4">Series Cast</h2>
      <div class="overflow-x-auto whitespace-nowrap px-2">
        <div class="inline-flex space-x-4">
          <div
            v-for="cast in castList"
            :key="cast.id"
            class="w-30 h-64 flex-shrink-0 rounded-lg text-center border border-gray-50 shadow-xl mb-4"
          >
            <img
              :src="
                cast.profile_path
                  ? `${config.public.imageBaseUrl}/w185${cast.profile_path}`
                  : '/no-image.jpg'
              "
              :alt="cast.name"
              class="w-[150px] h-40 object-cover rounded"
            />
            <h3 class="text-gray-600 font-semibold text-sm mt-2">
              {{ cast.name }}
            </h3>
            <p class="text-gray-400 text-xs italic">as {{ cast.character }}</p>
          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>

<style scoped>
.loading-wave {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.loading-wave .wave-animate {
  background-color: white;
  height: 20px; /* Adjust height as needed */
  width: 10px; /* Adjust width as needed */
  animation: waving 2.2s infinite ease-in-out;
}

@keyframes waving {
  0%,
  80%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}

/* Right-to-left wave with smoother rightmost bar */
.loading-wave .wave-animate:nth-child(1) {
  /* Rightmost bar */
  animation-delay: -0.1s; /* animation: waving-slow 2.8s infinite ease-in-out;   */
}
.loading-wave .wave-animate:nth-child(2) {
  animation-delay: -0.3s;
}
.loading-wave .wave-animate:nth-child(3) {
  animation-delay: -0.6s;
}

/* Scroll bar normalde gizli, hover'da görünür */
.scroll-on-hover {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.scroll-on-hover::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.scroll-on-hover:hover {
  scrollbar-width: thin;
}

.scroll-on-hover:hover::-webkit-scrollbar {
  height: 6px; /* yatay scrollbar için */
}

.scroll-on-hover:hover::-webkit-scrollbar-thumb {
  background-color: rgba(107, 114, 128, 0.6); /* tailwind: gray-600/60 */
  border-radius: 9999px;
}
</style>
