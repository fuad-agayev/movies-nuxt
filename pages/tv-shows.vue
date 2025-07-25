<template>
  <div>
    <section class="p-6 dark:bg-black/80 bg-white text-gray-400">
      <!-- Kategori düğmeleri -->
      <div class="flex flex-wrap justify-center mb-6 gap-x-2 gap-y-3">
        <button
          v-for="cat in categories"
          :key="cat.key"
          :class="[
            'px-2 py-1 text-xs sm:px-3 sm:text-sm md:px-4 md:text-base font-bold transition',
            cat.key === selectedCategory
              ? 'border-b-2 border-indigo-300 text-gray-400'
              : 'text-black/70 hover:bg-white/10',
          ]"
          @click="selectCategory(cat.key)"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- TV Kartları -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-6 mx-auto max-w-screen-xl"
      >
        <TvPageCard
          v-for="tv in allShows"
          :key="tv.id"
          :tv="tv"
          :imj="`${config.public.imageBaseUrl}/w500${tv.poster_path}`"
          @play="openTrailer"
        />
      </div>

      <!-- Fragman modalı -->
      <VideoModal
        :shoow="showPlayer"
        :video-key="trailerKey"
        @close="showPlayer = false"
      />
      <ToastMessage ref="toastRef" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRuntimeConfig } from '#imports'
import { useTmdb } from '~/composables/useTmdb'
import { videoTmdb } from '~/composables/videoUrlTmdb'
import TvPageCard from '~/components/TvPageCard.vue'
import ToastMessage from '~/components/ToastMessage.vue'

const config = useRuntimeConfig()
const { fetchMovies } = useTmdb() // fetchTVShows olabilir ama reuse edebilirsin
const { fetchVideo } = videoTmdb()

const showPage = ref<Record<string, any[]>>({})
const showPlayer = ref(false)
const trailerKey = ref('')
const selectedCategory = ref('popular')
const categories = [
  { key: 'popular', endpoint: 'tv/popular', label: 'POPULAR' },
  { key: 'airing_today', endpoint: 'tv/airing_today', label: 'AIRING TODAY' },
  { key: 'on_the_air', endpoint: 'tv/on_the_air', label: 'ON AIR' },
  { key: 'top_rated', endpoint: 'tv/top_rated', label: 'TOP RATED' },
]

const pagesToLoad = 5

async function fetchMultiplePages(key: string, pagesCount = pagesToLoad) {
  const cat = categories.find(c => c.key === key)!
  const promises = []
  for (let i = 1; i <= pagesCount; i++) {
    promises.push(fetchMovies(`${cat.endpoint}?page=${i}`))
  }

  const results = await Promise.all(promises)
  const combined = results.flatMap(r => r.results || r)
  showPage.value[key] = combined
}

onMounted(() => {
  fetchMultiplePages(selectedCategory.value)
})

const toastRef = ref<InstanceType<typeof ToastMessage> | null>(null)

function showToast(msg: string) {
  toastRef.value?.show(msg)
}

const allShows = computed(() => showPage.value[selectedCategory.value] || [])

async function openTrailer(tvId: number) {
  trailerKey.value = ''
  showPlayer.value = false

  const videoRes = await fetchVideo(`tv/${tvId}/videos`)
  const trailer = videoRes?.results.find(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
  )

  if (trailer?.key) {
    trailerKey.value = trailer.key
    showPlayer.value = true
  } else {
    showToast('No YouTube trailer was found for this show.')
  }
}

async function selectCategory(key: string) {
  selectedCategory.value = key
  if (!showPage.value[key]?.length) {
    await fetchMultiplePages(key)
  }
}
</script>
