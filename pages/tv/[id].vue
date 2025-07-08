

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useHead, useRuntimeConfig } from '#imports'

/* COMPONENTS */
import VideoModal from '~/components/VideoModal.vue'
import CircularRating from '~/components/CircularRating.vue'
import VibeModal from '~/components/VibeModal.vue'

/* PINIA STORES */
import { useWatchListStore } from '~/stores/watchlist'
import { useFavoritesStore } from '~/stores/favourites'
import { useRatingStore } from '~/stores/ratingstar'

/* COMPOSABLES */
const { fetchMovies } = useTmdb()
const { fetchVideo }  = videoTmdb()

/* RUNTIME */
const config = useRuntimeConfig()
const route  = useRoute()

/* REFS */
const tv            = ref<any>(null)
const castList      = ref<any[]>([])
const creatorName   = ref('')
const trailerKey    = ref('')
const showPlayer    = ref(false)
const showVibeModal = ref(false)

/* STORES */
const watchlistStore = useWatchListStore()
const favoritesStore = useFavoritesStore()
const ratingStore    = useRatingStore()

/* -------------------------------------------------------------------------- */
/** Fetch TV‑show details, credits & videos */
onMounted(async () => {
  const tvId = route.params.id
  try {
    tv.value = await fetchMovies(`tv/${tvId}`)

    /** Credits → Creator + Cast */
    const credits = await fetchMovies(`tv/${tvId}/credits`)
    creatorName.value = credits.crew.find((c: any) => c.job === 'Creator' || c.job === 'Executive Producer')?.name || 'Unknown'
    castList.value    = credits.cast

    /** Trailer (first YouTube) */
    const videoRes = await fetchVideo(`tv/${tvId}/videos`)
    const trailer  = videoRes?.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube')
    trailerKey.value = trailer?.key ?? ''
  } catch (err) {
    console.error('Error fetching TV details:', err)
  }
})

/* -------------------------------------------------------------------------- */
/* COMPUTED */
const isFavorite  = computed(() => favoritesStore.favorites.includes(tv.value?.id))
const inWatchlist = computed(() => watchlistStore.movies.some(item => item.id === tv.value?.id))
const ratingUser  = computed(() => ratingStore.getRatings(tv.value?.id || 0))

/* ACTIONS */
function toggleFavorites () {
  if (!tv.value?.id) return
  favoritesStore.toggleFavorite(tv.value.id)
}

function toggleWatchlist () {
  if (!tv.value?.id) return
  inWatchlist.value
    ? watchlistStore.removeMovie(tv.value.id)
    : watchlistStore.addMovie({ ...tv.value, type: 'tv' })
}

/* HELPERS */
function formatRuntime (minsArr: number[]) {
  const mins = minsArr?.[0] || 0
  return `${Math.floor(mins / 60)}h ${mins % 60}m`
}


</script>

<template>
  <div>
    <!-- ------------------------------ LOADER ------------------------------ -->
    <div v-if="!tv" class="flex justify-center items-center h-72 text-gray-400">
      Yükleniyor…
    </div>

    <!-- ------------------------------ CONTENT ----------------------------- -->
    <section v-else class="relative text-white overflow-hidden px-4 py-8 bg-center bg-cover">
      <!-- Blurred backdrop -->
<div
  
  class="absolute inset-0 z-10 scale-105 bg-cover bg-center blur-sm opacity-25"
  :style="{ backgroundImage: `url(${config.public.imageBaseUrl}/original${tv.backdrop_path})` }"
/>

<!-- Görsel yoksa fallback degrade -->
<div
 
  class="absolute inset-0 z-10 bg-gradient-to-b from-gray-800/90 to-black/90"
/>

<!-- Karartma katmanı (yarı saydam) -->
<div class="absolute inset-0 z-10 bg-black/70" />


     
      <!-- Grid wrapper -->
      <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 relative z-10">
        <!-- Poster -->
        <div class="flex justify-center md:justify-start">
          <img
            :src="`${config.public.imageBaseUrl}/w500${tv.poster_path}`"
            :alt="tv.name"
            class="w-full max-w-[300px] rounded shadow-xl"
          />
        </div>

        <!-- Details -->
        <div class="md:col-span-2 flex flex-col gap-4">
          <h1 class="text-4xl font-bold leading-tight">
            {{ tv.name }}
            <span class="text-2xl text-gray-400">({{ tv.first_air_date?.slice(0,4) }})</span>
          </h1>

          <p class="text-gray-300">
            <strong>{{ tv.genres.map((g:any) => g.name).join(', ') }}</strong>
            <span class="ml-2 text-sm text-gray-400">
              {{ formatRuntime(tv.episode_run_time) }} · {{ tv.number_of_seasons }} sezon
            </span>
          </p>

          <!-- Rating & Trailer -->
          <div class="flex items-center gap-4 my-4">
            <CircularRating :score="tv.vote_average || 0" />

            <button
              v-if="trailerKey"
              @click="showPlayer = true"
              class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded"
            >
              <Icon name="mdi:play" class="text-xl" /> Fragmanı Oynat
            </button>
          </div>

          <!-- Action buttons -->
          <div class="flex items-center gap-4 mb-6">
            <!-- Watchlist -->
            <button @click="toggleWatchlist" class="p-2 rounded-full hover:bg-gray-700 transition" :aria-label="inWatchlist ? 'İzleme listesinden kaldır' : 'İzleme listesine ekle'">
              <Icon :name="inWatchlist ? 'mdi:bookmark' : 'mdi:bookmark-outline'" class="text-2xl" />
            </button>

            <!-- Favorite -->
            <button @click="toggleFavorites" class="p-2 rounded-full hover:bg-gray-700 transition" :aria-label="isFavorite ? 'Favorilerden kaldır' : 'Favorilere ekle'">
              <Icon :name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'" :class="isFavorite ? 'text-rose-500' : 'text-white'" class="text-2xl" />
            </button>

            <!-- User vibe / rating -->
            <button @click="showVibeModal = true" class="flex items-center gap-2 text-sm border border-white/40 rounded-xl px-4 py-1 bg-white/10">
              <span class="font-semibold">{{ ratingUser ? 'Your Vibe' : "What's your Vibe?" }}</span>
              <template v-if="ratingUser">
                <span>{{ Math.round(ratingUser) }}/5</span>
                <span :class="[ratingUser*20<=30?'text-rose-400':ratingUser*20<=60?'text-yellow-400':'text-green-500']">{{ ratingUser*20 }}%</span>
              </template>
            </button>
          </div>

          <p v-if="tv.tagline" class="italic text-lg text-gray-300">{{ tv.tagline }}</p>

          <h2 class="text-xl font-semibold">Özet</h2>
          <p class="leading-relaxed text-gray-300 mb-6">{{ tv.overview }}</p>

          <!-- Extra info grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <p><strong class="text-gray-200">Durum:</strong> <span class="ml-1">{{ tv.status }}</span></p>
              <p><strong class="text-gray-200">Yaratıcı:</strong> <span class="ml-1">{{ creatorName }}</span></p>
              <p><strong class="text-gray-200">Diller:</strong> <span class="ml-1">{{ tv.spoken_languages.map((l:any)=>l.name).join(', ') }}</span></p>
            </div>
            <div>
              <p><strong class="text-gray-200">Bölüm Sayısı:</strong> <span class="ml-1">{{ tv.number_of_episodes }}</span></p>
              <p><strong class="text-gray-200">Ülkeler:</strong> <span class="ml-1">{{ tv.production_countries.map((c:any)=>c.name).join(', ') }}</span></p>
              <p v-if="tv.homepage"><strong class="text-gray-200">Website:</strong> <a :href="tv.homepage" target="_blank" rel="noopener" class="underline ml-1 text-blue-400">Ziyaret Et</a></p>
            </div>
          </div>
        </div>
      </div>

      <!-- Trailer modal -->
      <VideoModal :shoow="showPlayer" :videoKey="trailerKey" @close="showPlayer = false" />

      <!-- Vibe modal -->
      <VibeModal
        v-if="tv"
        :visible="showVibeModal"
        :movie-id="tv.id"
        :movie-title="tv.name"
        @close="showVibeModal = false" />
    </section>

    <!-- ------------------------------ CAST ------------------------------- -->
    <div v-if="castList.length" class="mt-10 w-full max-w-6xl mx-auto px-4">
      <h2 class="text-xl font-bold mb-4">Oyuncu Kadrosu</h2>
      <div class="overflow-x-auto whitespace-nowrap scroll-on-hover">
        <div class="inline-flex space-x-4">
          <div
            v-for="cast in castList"
            :key="cast.id"
            class="w-32 md:w-36 flex-shrink-0 text-center"
          >
            <img
              :src="cast.profile_path ? `${config.public.imageBaseUrl}/w185${cast.profile_path}` : '/no-image.jpg'"
              :alt="cast.name"
              class="w-full h-40 object-cover rounded shadow" />
            <h3 class="text-gray-200 text-sm font-semibold mt-1 truncate">{{ cast.name }}</h3>
            <p class="text-gray-400 text-xs italic truncate">as {{ cast.character }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-on-hover {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scroll-on-hover::-webkit-scrollbar { width: 0; height: 0; }
.scroll-on-hover:hover          { scrollbar-width: thin; }
.scroll-on-hover:hover::-webkit-scrollbar { height: 6px; }
.scroll-on-hover:hover::-webkit-scrollbar-thumb {
  background-color: rgba(107,114,128,.6);
  border-radius: 9999px;
}
</style>

