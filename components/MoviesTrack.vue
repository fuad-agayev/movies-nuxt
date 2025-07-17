/* File: components/MoviesTrack.vue */
<script setup lang="ts">
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import FilmCard from './FilmCard.vue'
import 'vue3-carousel/dist/carousel.css'
import type { Movie, CarouselBreakpoints } from '~/types/movies'

/*
const props = defineProps<{
  movies: Movie[]
  title: string
}>()
*/
const activeMenuId = ref<number | null>(null)

const props = withDefaults(
  defineProps<{
    movies?: Movie[]
    title?: string
  }>(),
  {
    movies: () => [],
    title: 'Default Title',
  }
)

const carouselBreakpoints: CarouselBreakpoints = {
  640: { itemsToShow: 3.5, snapAlign: 'start' },
  768: { itemsToShow: 4.5, snapAlign: 'start' },
  1024: { itemsToShow: 5.5, snapAlign: 'start' },
  1280: { itemsToShow: 6.6, snapAlign: 'start' },
}
</script>

<template>
  <div class="py-1">
    <h2 class="text-lg md:text-xl text-netflix-light-dark font-bold mb-2 px-4">
      {{ title }}
    </h2>
    <div class="relative">
      <Carousel
        :items-to-show="2"
        :wrap-around="false"
        :breakpoints="carouselBreakpoints"
        snap-align="start"
      >
        <Slide v-for="movie in movies" :key="movie.id" class="px-1">
          <FilmCard
            :movie="movie"
            :active-menu-id="activeMenuId"
            @update:active-menu-id="
              (val: number | null) => (activeMenuId = val)
            "
          />
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<style scoped>
/*--------------------------------------------------------------*/
/* NAVİGASYON DÜĞMESİ TEMEL STİLİNİZ (AYNEN KORUNDU)            */
:deep(.carousel__prev),
:deep(.carousel__next) {
  width: 50px;
  height: 70px;
  font-size: 1.4rem;
  border: 1px solid white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  transition: background 0.2s;
  margin: 4px;
}
:deep(.carousel__prev:hover),
:deep(.carousel__next:hover) {
  background: rgba(0, 0, 0, 0.3);
  color: yellow;
}

:deep(.carousel__prev[disabled]),
:deep(.carousel__next[disabled]),
:deep(.carousel__prev[aria-disabled='true']),
:deep(.carousel__next[aria-disabled='true']) {
  display: none !important; /* tamamen ortadan kaldır */
}

/* Küçük ekranlar: 640px altı (mobil) */
@media (max-width: 639px) {
  :deep(.carousel__prev),
  :deep(.carousel__next) {
    width: 40px;
    height: 50px;
    font-size: 1rem;
    border-radius: 4px;
    margin: 2px;
  }
}
</style>
