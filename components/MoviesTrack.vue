<template>
  <div class="py-6">
     <h2 class="text-xl md:text-2xl text-netflix-light-dark font-bold mb-4 px-4">{{}}</h2>
     <div class="relative">
          <Carousel :items-to-show="1.5" :wrap-around="false" :breakpoints="carouselBreakpoints" snap-align="start">
                <Slide v-for="movie in props.movies" :key="movie.id">
                     <FilmCard :movie="movie" />
                </Slide>
                <template #addons>
                     <Navigation />
                </template>
          </Carousel>
     </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '~/types/movies';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const props = withDefaults(defineProps<Movie>(), {
  movies: () => [],
});

const carouselBreakpoints = {
  640: {
    itemsToShow: 2.5,
    snapAlign: 'start',
  },
  768: {
    itemsToShow: 3.5,
    snapAlign: 'start',
  },
  1024: {
    itemsToShow: 4.5,
    snapAlign: 'start',
  },
  1280: {
    itemsToShow: 5.5,
    snapAlign: 'start',
  }
};
</script>

<style scoped>

</style>