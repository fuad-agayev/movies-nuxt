/* File: pages/index.vue */
<script setup lang="ts">
import HeroBanner from '~/components/HeroBanner.vue'
import MoviesTrack from '~/components/MoviesTrack.vue'
import type { Movie, TvShow } from '~/types/movies'
import { useTmdb } from '~/composables/useTmdb'
import {  useTvShows} from '~/composables/useTvShows'
//import { videoTmdb } from '~/composables/videoUrlTmdb'


import { useTrailers } from '~/composables/useTrailers'
const { pickTrailers } = useTrailers()

const { fetchTv } = useTvShows()
const { fetchMovies } = useTmdb()
//const { fetchVideo } = videoTmdb()



const trending = ref<Movie[]>([])
const popular = ref<Movie[]>([])
const topRated = ref<Movie[]>([])
const upcoming = ref<Movie[]>([])

// index.vue
const tvpopular = ref<TvShow[]>([]) // TvShow dizisi
const tvrated = ref<TvShow[]>([])   // TvShow dizisi


/* ---------- ek kategoriler ---------- */
const documentary = ref<Movie[]>([])
const horror      = ref<Movie[]>([])
const romance     = ref<Movie[]>([])
const comedy      = ref<Movie[]>([])
const thriller    = ref<Movie[]>([])

const trailers = ref<any[]>([]) 
//const featuredMovie = ref<Movie | null>(null)

const favoriteIds = [109091, 156022, 1579, 8966, 911430, 238, 429, 281957, 597, 387688, 197,605,603,652,2019,8681,861,19995,98,27205]
const favorites = ref<Movie[]>([])



   const featuredMovie = computed(() => {
   return trending.value[Math.floor(Math.random() * trending.value.length)] || null
    })


  

/* ==> yeni ref */
const mixedTrailers = ref<any[]>([])


onMounted(async () => {

   // 💡 küçük düzeltme: template string içinde `movie/${id}`
  favorites.value = (
    await Promise.all(
      favoriteIds.map(id => fetchMovies(`movie/${id}`))
    )
  ).filter(Boolean)

  trending.value = await fetchMovies('trending/movie/week')
  popular.value = await fetchMovies('movie/popular')
  topRated.value = await fetchMovies('movie/top_rated')
  upcoming.value = await fetchMovies('movie/upcoming')

  tvpopular.value = await fetchTv('popular')
  tvrated.value = await fetchTv('top_rated')
   /* 3) Tür bazlı listeler (discover) */
  documentary.value = await fetchMovies('discover/movie?with_genres=99&sort_by=popularity.desc') ?? []
  horror.value      = await fetchMovies('discover/movie?with_genres=27&sort_by=popularity.desc') ?? []
  romance.value     = await fetchMovies('discover/movie?with_genres=10749&sort_by=popularity.desc') ?? []
  comedy.value      = await fetchMovies('discover/movie?with_genres=35&sort_by=popularity.desc') ?? []
  thriller.value    = await fetchMovies('discover/movie?with_genres=53&sort_by=popularity.desc') ?? []

   /* ❶ Her kategori için film listesi hazır */
  const sources = [
    trending.value,
    popular.value,
    topRated.value,
    upcoming.value,
    romance.value,
    horror.value,
    documentary.value,
    comedy.value,
    thriller.value
  ]
 

 /* ❷ Her listeden 1 fragman, en fazla 4 film */
  const trailerBuckets = await Promise.all(
    sources.map(list => pickTrailers(list, 1, 10))
  )

  /* ❸ Hepsini harmanla (flatten) */
  mixedTrailers.value = trailerBuckets.flat()

  /* ❹ İstersen rastgele karıştır */
  mixedTrailers.value.sort(() => Math.random() - 0.5)
 
})

</script>


<template>
  <div>
    <HeroBanner v-if="featuredMovie" :movie="featuredMovie" />

     <!-- favori blok -->
    <MoviesTrack
      :movies="favorites"
      title="A Breeze of Nostalgia & Unforgettable Films"
    />
    <MoviesTrack :movies="trending" title="Trending Movies" />
    <MoviesTrack :movies="popular" title="Popular Movies" />
    <MoviesTrack :movies="topRated" title="Top Rated Movies" />
    <MoviesTrack :movies="upcoming" title="Upcoming Movies" />

    <TvShowTrack
  :tvShows="tvpopular"
  title="Popular TV Shows"
  
/>

<TvShowTrack
  :tvShows="tvrated"
  title="Top Rating TV Shows"

/>
    
  <TrailersTrack
  v-show="mixedTrailers.length"
  :videos="mixedTrailers"
  title="Video Trailers"
/>

<MoviesTrack :movies="documentary" title="Documentaries" />
<MoviesTrack :movies="horror"       title="Horror Hits" />
<MoviesTrack :movies="romance"      title="Romantic Picks" />
<MoviesTrack :movies="comedy"       title="Comedies" />
<MoviesTrack :movies="thriller"     title="Thrillers" />
    
  </div>
</template>
