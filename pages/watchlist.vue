<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWatchListStore } from '~/stores/watchlist'
import { useRuntimeConfig } from '#imports'
import { useFavoritesStore } from '~/stores/favourites'

const config = useRuntimeConfig()
const watchlistStore = useWatchListStore()
const selectedTab = ref<'movie' | 'tv'>('movie')

const favoritesStore = useFavoritesStore()

// Watchlist'teki öğelerin favori durumunu kontrol et
const isItemFavorite = (id: number) => {
  return favoritesStore.favorites.includes(id)
}

const filteredItems = computed(() =>
  watchlistStore.movies.filter(item => item.type === selectedTab.value)
)

//    as const yani BUNLAR  year: 'string', month: 'string', day: 'string' ,DEYIL
//  BOYLE GORSUN KI tip  HATA olmasin toLocaleDateString tip hatasi gibi gorebilir bazen    ----->>>   year: 'numeric', month: 'long', day: 'numeric'
const formatDate = (dateStr: string) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as const
  return new Date(dateStr).toLocaleDateString('en-US', options)
}
</script>
<template>
  <div>
    <ClientOnly>
      <div class="min-h-screen px-4 py-8 w-full max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">🎬 My Watchlist</h1>

        <!-- Tabs -->
        <div class="flex gap-6 border-b border-blue-500 mb-6">
          <button
            class="pb-2 border-b-2"
            :class="selectedTab === 'movie' ? 'border-white' : 'border-transparent text-gray-400'"
            @click="selectedTab = 'movie'"
          >
            Movies
            <span class="ml-1 text-sm text-gray-500 font-bold">
              {{ watchlistStore.movies.filter(m => m.type === 'movie').length }}
            </span>
          </button>
          <button
            class="pb-2 border-b-2"
            :class="selectedTab === 'tv' ? 'border-white' : 'border-transparent text-gray-400'"
            @click="selectedTab = 'tv'"
          >
            TV
            <span class="ml-1 text-sm text-gray-500 font-bold">
              {{ watchlistStore.movies.filter(m => m.type === 'tv').length }}
            </span>
          </button>
        </div>

        <!-- Empty State -->
        <div v-if="filteredItems.length === 0" class="text-gray-400 mb-4">
          Henüz hiç {{ selectedTab === 'movie' ? 'film' : 'dizi' }} eklenmedi.
        </div>

        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="bg-white dark:bg-white/90 my-4 rounded-xl shadow-md flex sm:flex-row"
        >
          <!-- Poster -->
          <NuxtLink :to="`/${item.type}/${item.id}`" class="block">
            <img
              :src="`${config.public.imageBaseUrl}/w300${item.poster_path}`"
              :alt="item.title"
              class="w-full sm:w-[120px] h-full object-cover rounded-l-xl sm:rounded-l-xl sm:rounded-tl-xl"
            />
          </NuxtLink>

          <!-- Content -->
          <div class="p-4 flex-1 flex flex-col justify-between">
            <!-- Header -->
            <div class="flex items-start gap-2">
              <watchlist-cir-rate :miniscore="item.vote_average" />

              <div class="">
                <h2 class="text-lg font-semibold text-gray-700">{{ item.title }}</h2>
                <p class="text-sm text-gray-500">{{ formatDate(item.release_date) }}</p>
              </div>
            </div>

            <!-- Overview -->
            <p class="text-sm text-gray-600 dark:text-gray-500 mt-2 line-clamp-4">
              {{ item.overview }}
            </p>

            <!-- Buttons -->
            <div class="mt-4 flex gap-4 text-sm text-gray-500">
              <button
                @click="favoritesStore.toggleFavorite(item.id)"
                class="flex items-center gap-1 hover:text-pink-500 transition"
              >
                <Icon
                  :name="isItemFavorite(item.id) ? 'mdi:heart' : 'mdi:heart-outline'"
                  class="text-lg"
                  :class="isItemFavorite(item.id) ? 'text-rose-500' : 'text-gray-500'"
                />
                Favorite
              </button>

              <button
                class="flex items-center gap-1 hover:text-red-500 transition"
                @click="watchlistStore.removeMovie(item.id)"
              >
                <Icon name="mdi:close" class="text-lg" />
                Remove
              </button>
            </div>
          </div>
        </div>

        <div v-if="filteredItems.length > 0" class="mt-6 text-gray-500 text-sm">
          Toplam {{ filteredItems.length }} {{ selectedTab === 'movie' ? 'film' : 'dizi' }}.
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
