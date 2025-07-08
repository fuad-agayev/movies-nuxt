

<template>
  <div>
    <section class="p-6 dark:bg-black/80 bg-white text-gray-400">
      
      <!-- Kategori düğmeleri -->
      <div class="flex flex-wrap justify-center mb-6 gap-x-2 gap-y-3">
        <button
          v-for="cat in categories"
          :key="cat.key"
          @click="selectCategory(cat.key)"
          
          :class="[
            'px-2 py-1 text-xs',
            'sm:px-3 sm:text-sm',
            'md:px-4 md:text-base',
            'font-bold transition',
            
            cat.key === selectedCategory
              ? 'border-b-2 border-indigo-300 text-gray-400'
              : 'text-black/70 hover:bg-white/10'
          ]"
        >
          {{ cat.label }}
        </button>
      </div>
      
      <!-- Film Kartları -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6
               gap-x-2 gap-y-6 mx-auto max-w-screen-xl"
      >
        <MoviePageCard
          v-for="movie in allMovies"
          :key="movie.id"
          :movie="movie"
          :imj="`${config.public.imageBaseUrl}/w500${movie.poster_path}`"
          @play="openTrailer"
        />
      </div>

      <!-- Fragman modalı -->
      <VideoModal
        :shoow="showPlayer"
        :videoKey="trailerKey"
        @close="showPlayer = false"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRuntimeConfig } from '#imports'
import { useTmdb } from '~/composables/useTmdb'
import { videoTmdb } from '~/composables/videoUrlTmdb'
import MoviePageCard from '~/components/MoviePageCard.vue'

const config = useRuntimeConfig()
const { fetchMovies } = useTmdb()
const { fetchVideo } = videoTmdb()

const movie_page = ref<Record<string, any[]>>({})
const showPlayer = ref(false)
const trailerKey = ref('')
const selectedCategory = ref('popular')
const categories = [
  { key: 'popular',  endpoint: 'movie/popular', label: 'MOST POPULAR' },
  { key: 'topRated', endpoint: 'movie/top_rated', label: 'TOP RATED' },
  { key: 'upcoming', endpoint: 'movie/upcoming', label: 'UPCOMING' },
  { key: 'trending', endpoint: 'trending/movie/week', label: 'BEST TRENDING '}
]

/* Sayfa sayısı, kaç sayfa çekilecek */
const pagesToLoad = 10

async function fetchMultiplePages(key: string, pagesCount = pagesToLoad) {
  const cat = categories.find(c => c.key === key)!
  
  // sayfa sayısı kadar istek yap
  const promises = []
  for (let i = 1; i <= pagesCount; i++) {
    promises.push(fetchMovies(`${cat.endpoint}?page=${i}`))
  }

  const results = await Promise.all(promises)
  // sonuçları birleştir, API'nin sonuç yapısına göre uyarlayabilirsin
  const combinedMovies = results.flatMap(r => r.results || r)

  movie_page.value[key] = combinedMovies
}

/* --- filmleri çek --- */
//onMounted(async () => {
 // const responses = await Promise.all(categories.map(c => fetchMovies(c.endpoint)))
 // responses.forEach((data, i) => { movie_page.value[categories[i].key] = data })
//})

onMounted(() => {
  fetchMultiplePages(selectedCategory.value)
})

const allMovies = computed(() => movie_page.value[selectedCategory.value] || [])

async function openTrailer(movieId: number) {
  trailerKey.value = ''
  showPlayer.value = false

  const videoRes = await fetchVideo(`movie/${movieId}/videos`)
  const trailer = videoRes?.results.find(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
  )

  if (trailer?.key) {
    trailerKey.value = trailer.key
    showPlayer.value = true
  } else {
    alert('Bu film için YouTube fragmanı bulunamadı.')
  }
}

async function selectCategory(key: string) {
  selectedCategory.value = key
  if (!movie_page.value[key]?.length) {
    await fetchMultiplePages(key)
  }
}
</script>













