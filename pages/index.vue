<script setup lang="ts">
const { fetchMovies } = useTmdb()
import type { Movie } from '~/types/movies';
//const popularMovies = await fetchMovies('movie/popular')
const config = useRuntimeConfig();
const trending = ref<Movie[]>([]);
const popular = ref<Movie[]>([]);
const topRated = ref<Movie[]>([]);
const upcoming = ref<Movie[]>([]);
const person = ref<Movie[]>([])



const featuredMovie = computed(() => {
  return trending.value[Math.floor(Math.random() * trending.value.length)] || null;
});



onMounted(async () => {
 trending.value = await fetchMovies('trending/movie/week');
 popular.value = await fetchMovies('movie/popular');
 topRated.value = await fetchMovies('movie/top_rated');
 upcoming.value = await fetchMovies('movie/upcoming');
 person.value = await fetchMovies('person/popular');
})

</script>

<template>
  <div>
    <HeroSection :movie="featuredMovie" />

<h1 class="text-2xl font-bold mb-4">Trending Movies</h1>

<div
  class="flex gap-2 overflow-x-auto scroll-snap-x scroll-snap-mandatory scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent pb-2"
>
  <div
    v-for="trend in trending"
    :key="trend.id"
    class="min-w-[200px] sm:min-w-[220px] flex-shrink-0 scroll-snap-start"
  >
    <NuxtLink :to="`/movie/${trend.id}`" class="block">
      <img
        :src="`${config.public.imageBaseUrl}/w500${trend.poster_path}`"
        :alt="trend.title"
        class="w-full h-[240px] object-cover rounded-lg shadow-md"
      />
      <h2 class="text-sm font-semibold mt-2 text-white truncate text-center">
        {{ trend.title }}
      </h2>
    </NuxtLink>
  </div>
</div>



    
    

    <h1 class="text-2xl font-bold">Trending Movies</h1>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mt-24">
      <div v-for="trend in trending" :key="trend.id" class="">
        <NuxtLink :to="`/movie/${trend.id}`" class="block">
          <img :src="`${config.public.imageBaseUrl}/w500${trend.poster_path}`" :alt="trend.title" class="w-full h-auto object-cover rounded-lg"/>
          <h2 class="text-lg font-semibold mt-2">{{ trend.title }}</h2>
        </NuxtLink>
        
      </div>
    </div>

     <h1 class="text-2xl font-bold">Popular Movies</h1>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mt-8">
      <div v-for="pop in popular" :key="pop.id">
        <img :src="`${config.public.imageBaseUrl}/w500${pop.poster_path}`" :alt="pop.title" class="w-full h-auto object-cover rounded-lg"/>
        <h2 class="text-lg font-semibold mt-2">{{ pop.title }}</h2>
      </div>
    </div>

    <h1 class="text-2xl font-bold">Top rated Movies</h1>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mt-8">
      <div v-for="top in topRated" :key="top.id">
        <NuxtLink :to="`/movie/${top.id}`" class="block">
             <img :src="`${config.public.imageBaseUrl}/w500${top.poster_path}`" :alt="top.title" class="w-full h-auto object-cover rounded-lg"/>
            <h2 class="text-lg font-semibold mt-2">{{ top.title }}</h2>
        </NuxtLink>
      </div>
    </div>

    <h1 class="text-2xl font-bold">Coming Movies</h1>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mt-8">
      <div v-for="com in popular" :key="com.id">
        <img :src="`${config.public.imageBaseUrl}/w500${com.poster_path}`" :alt="com.title" class="w-full h-auto object-cover rounded-lg"/>
        <h2 class="text-lg font-semibold mt-2">{{ com.title }}</h2>
      </div>
    </div>

    <h1 class="text-2xl font-bold">Person Movies</h1>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mt-8">
      <div v-for="per in person" :key="per.id">
        <img :src="`${config.public.imageBaseUrl}/w500${per.profile_path}`" :alt="per.name" class="w-full h-auto object-cover rounded-lg"/>
        <h2 class="text-lg font-semibold mt-2">{{ per.name }}</h2>
      </div>
    </div>

  </div>
</template>
<style scoped>
.scroll-container {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 10px;
  scrollbar-width: thin;
  scrollbar-color: #666 transparent;
  padding-bottom: 6px;;
}

.scroll-container::-webkit-scrollbar{
    height: 4px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: purple;
  border-radius: 4px;
}

.scroll-container::-webkit-scrollbar-track {
  background: transparent;
}
.scroll-container::-webkit-scrollbar-corner
 {
  background: transparent;
}
.scroll-item {
  flex: 0 0 auto;
  scroll-snap-align: start;
  width: 50px;
}
</style>