<script setup lang="ts">
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import type { Video, CarouselBreakpoints } from '~/types/movies'

const props = withDefaults(
  defineProps<{
    videos?: Video[]
    title?: string
  }>(),
  { videos: () => [], title: 'Trailers' }
)

/* kırılım noktaları */
const breakpoints: CarouselBreakpoints = {
  640:  { itemsToShow: 1.5, snapAlign: 'start' },   // ≥ sm
  768:  { itemsToShow: 2.5, snapAlign: 'start' },   // ≥ md
  1024: { itemsToShow: 3.5, snapAlign: 'start' },   // ≥ lg
  1280: { itemsToShow: 4.5, snapAlign: 'start' }    // ≥ xl
}
</script>

<template>
  <section class="py-4">
    <h2 class="px-4 mb-3 text-xl md:text-2xl font-bold text-netflix-light-dark">
      {{ title }}
    </h2>

    <Carousel
      :items-to-show="1.2"
      :wrap-around="false"
      :breakpoints="breakpoints"
      snap-align="start"
      class="px-2"
    >
      <Slide v-for="v in videos" :key="v.id" class="px-1">
        <div class="w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-xl overflow-hidden shadow-lg">
          <iframe
            :src="`https://www.youtube.com/embed/${v.key}`"
            class="w-full h-full object-cover"
            allowfullscreen
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </section>
</template>
<style scoped>
/*--------------------------------------------------------------*/
/* NAVİGASYON DÜĞMESİ TEMEL STİLİNİZ (AYNEN KORUNDU)            */
:deep(.carousel__prev),
:deep(.carousel__next){
  width:50px; height:70px;
  font-size:1.4rem;
  border:1px solid white;
  border-radius:5px;
  display:flex; align-items:center; justify-content:center;
  background:rgba(0,0,0,.5); color:#fff;
  transition:background .2s;
  margin:4px;
}
:deep(.carousel__prev:hover),
:deep(.carousel__next:hover){
  background:rgba(0,0,0,.3);
  color:yellow;
}


:deep(.carousel__prev[disabled]),
:deep(.carousel__next[disabled]),
:deep(.carousel__prev[aria-disabled="true"]),
:deep(.carousel__next[aria-disabled="true"]){
  display:none !important;   /* tamamen ortadan kaldır */
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


