/* File: pages/index.vue */
<script setup lang="ts">
import HeroBanner from '~/components/HeroBanner.vue'
import MoviesTrack from '~/components/MoviesTrack.vue'
import type { Movie } from '~/types/movies'

const { fetchMovies } = useTmdb()
const config = useRuntimeConfig();

const trending = ref<Movie[]>([]);
const popular = ref<Movie[]>([]);
const topRated = ref<Movie[]>([]);
const upcoming = ref<Movie[]>([]);

const featuredMovie = computed(() => {
  return trending.value[Math.floor(Math.random() * trending.value.length)] || null;
});

onMounted(async () => {
  trending.value = await fetchMovies('trending/movie/week');
  popular.value = await fetchMovies('movie/popular');
  topRated.value = await fetchMovies('movie/top_rated');
  upcoming.value = await fetchMovies('movie/upcoming');
})
</script>

<template>
  <div>
    <HeroBanner v-if="featuredMovie" :movie="featuredMovie" />
    <MoviesTrack :movies="trending" title="Trending Movies" />
    <MoviesTrack :movies="popular" title="Popular Movies" />
    <MoviesTrack :movies="topRated" title="Top Rated Movies" />
    <MoviesTrack :movies="upcoming" title="Upcoming Movies" />
  </div>
</template>


