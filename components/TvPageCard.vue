
<template>
  <div class="relative group w-full max-w-[210px] mx-auto rounded-lg overflow-hidden bg-black/80 shadow-md border border-black/20 transition duration-300">

    <div class="absolute inset-0 bg-black/20 group-hover:bg-black/50
             transition duration-300 pointer-events-none z-0"></div>
<div class="absolute -top-2 -left-3 w-full flex items-center justify-between">
  <!-- Watchlist Butonu -->
  <div
    @click.stop="toggle"
    class="relative transition-all duration-200 cursor-pointer flex items-center justify-center"
  >
    <!-- Dış Bookmark İkonu -->
    <Icon
      :name="'mdi:bookmark'"
      class="text-6xl transition-all duration-200 bg-black/70"
      :class="inList
        ? 'bg-yellow-500 text-black/50 shadow-md'
        : 'bg-black/60 text-white hover:bg-black/80 rounded'"
    />
     
    <!-- İçteki Küçük İşaret -->
    <Icon
      :name="inList ? 'mdi:check' : 'mdi:plus'"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black text-2xl rounded-full shadow py-4"
    />

    
  </div>
</div>



    <!-- Afiş -->
    <img
      :src="imj"
      :alt="tv.name"
      class="w-full h-[300px] object-cover cursor-pointer"
      @click.stop="navigateTo(`/tv/${tv.id}`)"
    />

    <!-- Kart İçeriği -->
    <div class="p-4">
      <!-- Fragman Butonu -->
       <div class="absolute top-1/2 transform -translate-y-1/2 mt-10 left-2 flex items-center justify-center">
      <button
        class="flex items-center justify-center space-x-1 mb-1 w-9 h-9 rounded-full border-2 border-gray-50 hover:border-yellow-500"
        @click="$emit('play', tv.id)">
        <Icon name="mdi:play" class="text-2xl text-white font-bold hover:text-yellow-500" />
         
      </button>
          <span class="text-white text-[11px] px-2.5 py-0.5 text-sm">
              {{ formatDuration(trailerDuration) }}
          </span>
 </div>

 <span class="text-xs text-gray-300">Official Trailer</span>
    

      <!-- Başlık -->
      <p class="font-semibold text-white text-lg hover:underline cursor-pointer" @click.stop="navigateTo(`/tv/${tv.id}`)">
        {{ tv.name }}
      </p>

      <!-- Tarih -->
      <p class="text-xs text-gray-400 mt-0.5">
        {{ formatTime(tv.first_air_date) }}
      </p>

      <!-- Beğeni Sayısı -->
      <div class="flex items-center mt-1 space-x-3 text-[12px] text-gray-400">
        <div class="flex items-center space-x-1">
          <Icon name="mdi:thumb-up-outline" />
          <span class="text-green-500">{{ randomLikes }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <Icon name="mdi:thumb-down-outline" />
          <span class="text-rose-200">{{ randomDislikes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWatchListStore } from '~/stores/watchlist'
import type { TvShow, Movie } from '~/types/movies'
import { formatTime } from '~/utils/formatDatee'



const loading = ref(false)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 5000) // 3 saniye sonra loading false olur
})

const props = defineProps<{
  tv: TvShow
  imj: string
}>()

const emit = defineEmits<{ (e: 'play', id: number): void }>()

const store = useWatchListStore()

const fakeMovie = {
  ...props.tv,
  type: 'tv',
  title: props.tv.name,
  release_date: props.tv.first_air_date
} as unknown as Movie

const inList = computed(() => store.isInWatchlist(props.tv.id))

function toggle() {
  store.toggleMovie(fakeMovie)
}

// Örnek sayı verileri (mock like/dislike)
const randomLikes = Math.floor(Math.random() * 800) + 100
const randomDislikes = Math.floor(Math.random() * 200)


const trailerDuration = ref(Math.floor(Math.random() * 90) + 90) // 90–180 saniye


function formatDuration(seconds?: number): string {
  if (!Number.isFinite(seconds)) return '0:00'
  const mins = Math.floor(seconds! / 60)
  const secs = Math.floor(seconds! % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>






