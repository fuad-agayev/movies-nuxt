<template>
  <div class="relative w-full h-[50vh] overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img
        :src="backdropUrl"
        :alt="movie?.title || 'Featured Movie'"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/80 to-transparent"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-r from-netflix-black/90 to-transparent"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 container mx-auto px-4 h-full flex items-center">
      <div class="max-w-2xl animate-fade-in">
        <h1 class="text-3xl md:text-5xl font-bold mb-3 text-white">
          {{ movie?.title }}
        </h1>

        <div class="flex items-center gap-3 mb-4">
          <span class="text-green-500 font-medium">
            {{ Math.round((movie?.vote_average || 0) * 10) }}% Match
          </span>
          <span class="text-white">{{ getYear }}</span>
          <span class="border border-white px-1 text-xs text-white">HD</span>
        </div>

        <p class="text-sm md:text-base mb-6 line-clamp-3 md:line-clamp-4 text-gray-300">
          {{ movie?.overview }}
        </p>

        <div class="flex flex-wrap gap-3">
          <button
            @click="playMovie"
            class="bg-white text-black px-6 py-2 rounded-md flex items-center font-medium hover:bg-opacity-80 transition"
          >
            <Icon name="mdi:play" size="1.25em" class="mr-2" />
            Play
          </button>

          <button
            @click="openInfoModal(movie)"
            class="bg-gray-600 bg-opacity-70 text-white px-6 py-2 flex items-center rounded-md font-medium hover:bg-opacity-50 transition"
          >
            <Icon name="mdi:information-outline" size="1.25em" class="mr-2" />
            More Info
          </button>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <VideoModal :shoow="showPlayer" :videoKey="videoKey" @close="showPlayer = false" />
    <InfoModal :showw="showInfo" :movie="selectedMovie" @close="showInfo = false" />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import VideoModal from './VideoModal.vue'
import InfoModal from './InfoModal.vue'
import type { Movie, Video } from '~/types/movies'

// Props definition with default fallback
const props = withDefaults(
  defineProps<{
    movie?: Movie
  }>(),
  {
    movie: () => ({}) as Movie
  }
)

// Runtime config for image URL
const config = useRuntimeConfig()

// Video and modal state
const showPlayer = ref(false)
const videoKey = ref('')
const showInfo = ref(false)
const selectedMovie = ref<Movie | null>(null)


// Utilities
const { fetchVideo } = videoTmdb()

const backdropUrl = computed(() => {
  return props.movie?.backdrop_path
    ? `${config.public.imageBaseUrl}/original${props.movie.backdrop_path}`
    : ''
})

//  BOYLE DE YAPILA BILINIR ISTERSEN AYNI SEY
/*
 const backdropUrl = computed(() => {
            if(!props.movie?.backdrop_path) return '';
           // return ${config}/original${props.movie.backdrop_path}
            return ${config.public.imageBaseUrl}/original${props.movie.backdrop_path}
       })
*/

const getYear = computed(() => {
  return props.movie?.release_date ? new Date(props.movie.release_date).getFullYear() : ''
})

const playMovie = async () => {
  if (!props.movie?.id) return

  const res = await fetchVideo(`movie/${props.movie.id}/videos`)
  const trailer = res?.results.find((v:Video) => v.type === 'Trailer' && v.site === 'YouTube')

  if (trailer) {
    videoKey.value = trailer.key
    showPlayer.value = true
    console.log('Video key:', trailer.key)
  }
}

const openInfoModal = (movie: Movie) => {
  selectedMovie.value = movie
  showInfo.value = true
}

</script>
