<script setup lang="ts">

import VideoModal from '~/components/VideoModal.vue'
const { fetchMovies } = useTmdb();
const { fetchVideo } = videoTmdb();
const route = useRoute();
const movie = ref<any>(null);
const config = useRuntimeConfig();
const trailerKey = ref('')
const showPlayer = ref(false)


onMounted(async () => {
  const movieId = route.params.id
  try {
    const res = await fetchMovies(`movie/${movieId}`)
    movie.value = res
    
    console.log('Film Detay:', res)

    const videoRes = await fetchVideo(`movie/${movieId}/videos`)
    console.log('Video Detay:', videoRes)

    const trailer = videoRes.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube')
    trailerKey.value = trailer?.key || ''
  } catch (error) {
    console.error('Veri çekme hatası:', error)
  }
})

</script>

<template>
  <section class="px-4 py-8">
    <div v-if="movie" class="max-w-4xl mx-auto text-white dark:text-black/90">
      <h1 class="text-3xl font-bold mb-4">{{ movie.title }}</h1>
      <img :src="`${config.public.imageBaseUrl}/w500${movie.poster_path}`" :alt="movie.title" class="w-[350px] h-[350px] rounded-lg mb-4" />
      <p class="mb-6">{{ movie.overview }}</p>
      <li><strong>Release:</strong> {{ movie.release_date }}</li>
        <li><strong>Rating:</strong> {{ movie.vote_average }}/10</li>
        <li><strong>Original Language:</strong> {{ movie.original_language }}</li>
        <li><strong>Name:</strong> {{ movie.name }}</li>
        <li><strong>Profile path:</strong> {{ movie.profile_path }}</li>
      <li><strong>Popularity:</strong> {{ movie.popularity }}</li>
      <li><strong>Adult:</strong> {{ movie.adult ? 'Yes' : 'No' }}</li>
      <li><strong>Tagline:</strong> {{ movie.tagline }}</li>
      <li><strong>Status:</strong> {{ movie.status }}</li>
      <li><strong>Homepage:</strong> {{ movie.homepage }}</li>
      <li><strong>Budget:</strong> {{ movie.budget }}</li>
      <li><strong>Revenue:</strong> {{ movie.revenue }}</li>
      <li><strong>Minutes:</strong> {{ movie.runtime }} minutes</li>
      <li><strong>Genres:</strong> {{ movie.genres.map((g: any) => g.name).join(', ') }}</li>
      <li><strong>Production Companies:</strong> {{ movie.production_companies.map((c: any) => c.name).join(', ') }}</li>
      <li><strong>Production Countries:</strong> {{ movie.production_countries.map((c: any) => c.name).join(', ') }}</li>
      <li><strong>Spoken Languages:</strong> {{ movie.spoken_languages.map((l: any) => l.name).join(', ') }}</li>
      <button
        v-if="trailerKey"
        @click="showPlayer = true"
        class="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
      >
        ▶ Play Trailer
      </button>
    </div>

    <VideoModal :shoow="showPlayer" :videoKey="trailerKey" @close="showPlayer = false" />
  </section>
</template>



