<template>
  <div class="relative w-full h-[80vh] overflow-hidden">
           <!--     Background Image    -->
                <div class="absolute inset-0 z-0">
                       <img :src="backdropUrl" :alt="movie?.title || 'Featured Movie'" class="w-full h-[550px] object-cover"/>
                       <div class="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/80 to-transparent"></div>
                       <div class="absolute inset-0 bg-gradient-to-r from-netflix-black/90 to-transparent"></div>
                </div>

                <!--    Content      -->
                <div class="relative z-10 container mx-auto px-4 h-full flex items-center">
                      <div class="max-w-2xl animate-fade-in">
                            <h1 class="text-3xl md:text-5xl font-bold mb-3"> {{ movie?.title }} </h1>

                            <div class="flex items-center gap-3 mb-4">
                                  <span class="text-green-500 font-medium"> {{ Math.round((movie?.vote_average || 0) * 10) }} % Match</span>
                                  <span> {{ getYear }} </span>
                                  <span class="border border-gray-600 px-1 text-xs"> HD </span>
                            </div>

                            <p class="text-sm md:text-base mb-6 line-clamp-3 md:line-clamp-4 text-gray-300"> {{ movie?.overview }} </p>

                            <div class="flex flex-wrap gap-3">
                             
                              <button @click="playMovie" class="bg-white text-black px-6 py-2 rounded-md flex items-center font-medium hover:bg-opacity-80 transition">
                                <Icon name="mdi:play" size="1.25em" class="mr-2"/>
                                 Play 
                              </button>
                                   <VideoModal  :shoow="showPlayer" :videoKey="videoKey" @close="showPlayer = false"/>
                                   <InfoModal :showw="showInfo" :movie="selectedMovie" @click="showInfo = false"/>
                              <button @click="openInfoModal(movie)" class="bg-gray-600 bg-opacity-70 text-white px-6 py-2 flex items-center rounded-md font-medium hover:bg-opacity-50 transition">
                                <Icon name="mdi:information-outline" size="1.25em" class="mr-2"/>
                                 More Info
                                </button>
                            </div>
                      </div>
                </div>
  </div>
</template>

<script setup lang="ts">
  
  import VideoModal from './VideoModal.vue';
  import InfoModal from './InfoModal.vue';
  import type { Movie, Video } from '~/types/movies';
  
  
  const { fetchVideo } = videoTmdb();
  const showPlayer = ref(false);
  const videoKey = ref('');
  const showInfo = ref(false);
  const selectedMovie = ref(null);

  const playMovie = async () => {
       const res = await fetchVideo(`movie/${props.movie.id}/videos`);
       const trailer = res.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
       if(trailer){
             videoKey.value = trailer.key;
             showPlayer.value = true;
             console.log("Video value: ", trailer.key);
       }
  }

  const openInfoModal = (movie: any) => {
      showInfo.value = true;
      selectedMovie.value = movie;
  }

 const props = withDefaults(defineProps<{
  movie?: Movie;
}>(), {
  movie: () => ({} as Movie)
}); 
 

       const config = useRuntimeConfig();
      // const config = useRuntimeConfig() as { public: { imageBaseUrl: string } }

       const backdropUrl = computed(() => {
            if(!props.movie?.backdrop_path) return '';
           // return `${config}/original${props.movie.backdrop_path}`
            return `${config.public.imageBaseUrl}/original${props.movie.backdrop_path}`
       })

       const getYear = computed(() => {
                 if(!props.movie?.release_date) return '';
                 return new Date(props.movie.release_date).getFullYear()
       })
</script>

