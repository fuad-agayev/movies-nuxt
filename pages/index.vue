<script setup lang="ts">
const { fetchMovies } = useTmdb()
import type { Movie } from '~/types/movies';
//const popularMovies = await fetchMovies('movie/popular')
const config = useRuntimeConfig();
const trending = ref<Movie[]>([]);
const popular = ref<Movie[]>([]);
const topRated = ref<Movie[]>([]);
const upcoming = ref<Movie[]>([]);


onMounted(async () => {
 trending.value = await fetchMovies('trending/movie/week');
 popular.value = await fetchMovies('movie/popular');
 topRated.value = await fetchMovies('movie/top_rated');
 upcoming.value = await fetchMovies('movie/upcoming');
})

</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Trending Movies</h1>
    <div class="grid grid-cols-8 gap-1 mt-4">
      <div v-for="trend in trending" :key="trend.id">
        <img :src="`${config.public.imageBaseUrl}/w500${trend.poster_path}`" :alt="trend.title" class="w-64 h-32 object-cover"/>
        <h2 class="text-lg font-semibold mt-2">{{ trend.title }}</h2>
      </div>
    </div>

     <h1 class="text-2xl font-bold">Popular Movies</h1>
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div v-for="pop in popular" :key="pop.id">
        <img :src="`${config.public.imageBaseUrl}/w500${pop.poster_path}`" :alt="pop.title" />
        <h2 class="text-lg font-semibold mt-2">{{ pop.title }}</h2>
      </div>
    </div>

    <h1 class="text-2xl font-bold">Top rated Movies</h1>
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div v-for="top in topRated" :key="top.id">
        <img :src="`${config.public.imageBaseUrl}/w500${top.poster_path}`" :alt="top.title" />
        <h2 class="text-lg font-semibold mt-2">{{ top.title }}</h2>
      </div>
    </div>

    <h1 class="text-2xl font-bold">Coming Movies</h1>
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div v-for="com in popular" :key="com.id">
        <img :src="`${config.public.imageBaseUrl}/w500${com.poster_path}`" :alt="com.title" />
        <h2 class="text-lg font-semibold mt-2">{{ com.title }}</h2>
      </div>
    </div>

  </div>
</template>
