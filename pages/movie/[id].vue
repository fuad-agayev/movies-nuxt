
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useHead, useRuntimeConfig } from '#imports';
import VideoModal from '~/components/VideoModal.vue';
import CircularRating from '~/components/CircularRating.vue';

const { fetchMovies } = useTmdb();
const { fetchVideo } = videoTmdb();
const route = useRoute();
const config = useRuntimeConfig();

const movie = ref<any>(null);
const trailerKey = ref('');
const showPlayer = ref(false);
const directorName = ref('');
const castList = ref<any[]>([]);

onMounted(async () => {
  const movieId = route.params.id;
  try {
    movie.value = await fetchMovies(`movie/${movieId}`);
    const credits = await fetchMovies(`movie/${movieId}/credits`);
    const director = credits.crew.find((cre: any) => cre.job === 'Director');
    directorName.value = director ? director.name : 'Unknown Director';
    castList.value = credits.cast;

    const videoRes = await fetchVideo(`movie/${movieId}/videos`);
    const trailer = videoRes.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
    trailerKey.value = trailer?.key || '';
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
});

const formatRuntime = (mins: number) => `${Math.floor(mins / 60)}h ${mins % 60}m`;
const addToWatchlist = async (movieId: number) => {
  console.log(`Film ${movieId} watchlist'e eklendi!`);
};

useHead(() => ({
  title: movie.value?.title ? `Film: ${movie.value.title}` : 'Film Yükleniyor...',
  meta: [
    { name: 'description', content: movie.value?.overview || 'Film açıklaması bulunamadı.' },
    { property: 'og:description', content: movie.value?.overview || 'Açıklama yok.' },
    { property: 'og:image', content: movie.value?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.value.poster_path}` : '' },
    { name: 'twitter:title', content: movie.value?.title || 'Film' },
    { name: 'twitter:image', content: movie.value?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.value.poster_path}` : '' },
  ]
}));
// BU OBJE DIR DINAMIKLIK SAGLAMAZ ONCE NE DEYER VERDINSE SABIR OLARAK ONU GOSTERIR
//useHead({
 // title: movie.value?.title ? Film: ${movie.value.title} : 'Film Yükleniyor...'
//})
</script>

<template>
  <section class="text-white px-4 py-8 bg-cover bg-center relative overflow-hidden">
    <div class="absolute top-0 right-0 h-full w-3/5 bg-cover bg-center blur-sm opacity-30 scale-110 z-0"
         :style="movie?.backdrop_path ? `background-image: url(${config.public.imageBaseUrl}/original${movie.backdrop_path})` : ''"></div>
    <div class="absolute inset-0 bg-black bg-opacity-70"></div>

    <div v-if="movie" class="relative z-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
      <div class="w-full flex justify-center md:justify-start items-center">
        <img :src="`${config.public.imageBaseUrl}/w500${movie.poster_path}`" :alt="movie.title" class="w-full mx-auto rounded" />
      </div>

      <div class="col-span-2 flex flex-col justify-center">
        <h1 class="text-4xl font-bold mb-2">{{ movie.title }} <span class="text-2xl text-gray-400">({{ movie.release_date?.slice(0, 4) }})</span></h1>
        <p><strong>Genres:</strong> {{ movie.genres.map((g: any) => g.name).join(', ') }} <span class="text-sm text-gray-400">{{ formatRuntime(movie.runtime) }}</span></p>

        <div class="flex items-center gap-4 mb-4 px-4 py-4 mt-4 rounded">
          <CircularRating :score="movie?.vote_average || 0" />
          <button v-if="trailerKey" @click="showPlayer = true" class="inline-flex items-center text-white text-sm font-semibold px-4 py-2 rounded shadow-xl">
            <Icon name="mdi:play" class="mr-2 text-3xl hover:bg-green-400" /> Play Trailer
          </button>
          <div class="relative group inline-block">
            <button @click="addToWatchlist(movie.id)" class="p-2 rounded hover:bg-gray-700 transition-colors">
              <Icon name="mdi:bookmark-outline" class="text-white text-2xl" />
            </button>
            <div class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
              Add to Watchlist
            </div>
          </div>
        </div>

        <p class="text-lg text-gray-300 italic mb-4">{{ movie.tagline }}</p>
        <h4 class="text-xl text-gray-200 font-semibold">Overview</h4>
        <p class="mb-6 text-base text-gray-400 leading-relaxed">{{ movie.overview }}</p>

        <p class="text-sm font-bold text-gray-200">Status: <span class="ml-2 text-gray-400">{{ movie.status }}</span></p>
        <p class="text-sm font-bold text-gray-200">Director: <span class="text-gray-400 ml-2">{{ directorName }}</span></p>
        <p class="text-sm text-gray-400 font-bold mt-2"><strong class="text-gray-200">Languages:</strong> {{ movie.spoken_languages.map((l: any) => l.name).join(', ') }}</p>

        <div class="flex items-center gap-4 mt-4 w-full">
          <div class="w-[500px]">
            <p class="text-gray-400 text-sm font-bold mt-2"><strong class="text-gray-200">Budget:</strong> ${{ movie.budget.toLocaleString() }}</p>
            <p class="text-gray-400 text-sm font-bold mt-2"><strong class="text-gray-200">Revenue:</strong> ${{ movie.revenue.toLocaleString() }}</p>
          </div>
          <div>
            <p class="text-gray-400 text-sm font-bold mt-2"><strong class="text-gray-200">Countries:</strong> {{ movie.production_countries.map((c: any) => c.name).join(', ') }}</p>
            <p class="text-gray-400 text-sm font-bold mt-2"><strong class="text-gray-200">Production:</strong> {{ movie.production_companies.map((c: any) => c.name).join(', ') }}</p>
            <p v-if="movie.homepage"><strong>Homepage:</strong> <a :href="movie.homepage" class="text-blue-400 underline" target="_blank">Visit</a></p>
          </div>
        </div>
      </div>
    </div>

    <VideoModal :shoow="showPlayer" :videoKey="trailerKey" @close="showPlayer = false" />
  </section>

  <div v-if="castList.length" class="mt-10 w-full max-w-6xl mx-auto px-2">
  <h2 class="text-xl font-bold mb-4">Series Cast</h2>
  <div class="overflow-x-auto whitespace-nowrap px-2">
    <div class="inline-flex space-x-4">
      <div
        v-for="cast in castList"
        :key="cast.id"
        class="w-30 h-64 flex-shrink-0 rounded-lg text-center border border-gray-50 shadow-xl mb-4"
      >
        <img
          :src="cast.profile_path ? `${config.public.imageBaseUrl}/w185${cast.profile_path}` : '/no-image.jpg'"
          :alt="cast.name"
          class="w-[150px] h-40 object-cover rounded"
        />
        <h3 class="text-gray-600 font-semibold text-sm mt-2">
          {{ cast.name }}
        </h3>
        <p class="text-gray-400 text-xs italic">as {{ cast.character }}</p>
      </div>
    </div>
  </div>
</div>

</template>

<style scope>
/* Scroll bar normalde gizli, hover'da görünür */
.scroll-on-hover {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  
}

.scroll-on-hover::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.scroll-on-hover:hover {
  scrollbar-width: thin;
}

.scroll-on-hover:hover::-webkit-scrollbar {
  height: 6px; /* yatay scrollbar için */
}

.scroll-on-hover:hover::-webkit-scrollbar-thumb {
  background-color: rgba(107, 114, 128, 0.6); /* tailwind: gray-600/60 */
  border-radius: 9999px;
}
</style>




