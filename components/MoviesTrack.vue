/* File: components/MoviesTrack.vue */
<script setup lang="ts">
import type { Movie, CarouselBreakpoints } from '~/types/movies'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import FilmCard from './FilmCard.vue'
/*
const props = defineProps<{
  movies: Movie[]
  title: string
}>()
*/
const props = withDefaults(
  defineProps<{
    movies?: Movie[]
    title?: string
  }>(),
  {
    movies: () => [],
    title: 'Default Title'
  }
)

const carouselBreakpoints: CarouselBreakpoints = {
  640: { itemsToShow: 3.5, snapAlign: 'start' },
  768: { itemsToShow: 4.5, snapAlign: 'start' },
  1024: { itemsToShow: 5.5, snapAlign: 'start' },
  1280: { itemsToShow: 6.6, snapAlign: 'start' }
}
</script>

<template>
  <div class="py-1">
    <h2 class="text-lg md:text-xl text-netflix-light-dark font-bold mb-2 px-4">{{ title }}</h2>
    <div class="relative">
      <Carousel
        :items-to-show="2"
        :wrap-around="false"
        :breakpoints="carouselBreakpoints"
        snap-align="start"
      >
        <Slide v-for="movie in movies" :key="movie.id" class="px-1">
          <FilmCard :movie="movie" />
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>
</template>
