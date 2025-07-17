<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWatchListStore } from '~/stores/watchlist'
import { useRuntimeConfig } from '#imports'
import { useFavoritesStore } from '~/stores/favourites'
import { formatTime } from '~/utils/formatDatee'
import { useRatingStore } from '~/stores/ratingstar'
import RatingModal from '~/components/RatingModal.vue'

const config = useRuntimeConfig()
const watchlistStore = useWatchListStore()
const selectedTab = ref<'movie' | 'tv'>('movie')

const favoritesStore = useFavoritesStore()

// Watchlist'teki öğelerin favori durumunu kontrol et
const isItemFavorite = (id: number) => {
  return favoritesStore.favorites.includes(id)
}

const filteredItems = computed(() =>
  [...watchlistStore.movies]
    .filter(item => item.type === selectedTab.value)
    .reverse()
)

const watchRating = useRatingStore()

const showRatingModal = ref(false)
const selectedMovieId = ref<number | null>(null)

const openRatingModal = (id: number) => {
  selectedMovieId.value = id
  showRatingModal.value = true
}

const closeRatingModal = () => {
  showRatingModal.value = false
  selectedMovieId.value = null
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
            :class="
              selectedTab === 'movie'
                ? 'border-white'
                : 'border-transparent text-gray-400'
            "
            @click="selectedTab = 'movie'"
          >
            Movies
            <span class="ml-1 text-sm text-gray-500 font-bold">
              {{ watchlistStore.movies.filter(m => m.type === 'movie').length }}
            </span>
          </button>
          <button
            class="pb-2 border-b-2"
            :class="
              selectedTab === 'tv'
                ? 'border-white'
                : 'border-transparent text-gray-400'
            "
            @click="selectedTab = 'tv'"
          >
            TV
            <span class="ml-1 text-sm text-gray-500 font-bold">
              {{ watchlistStore.movies.filter(m => m.type === 'tv').length }}
            </span>
          </button>
        </div>

        <!-- Empty State -->
        <div v-if="filteredItems.length === 0" class="text-gray-500 mb-4">
          No movies {{ selectedTab === 'movie' ? 'film' : 'shows' }} have been
          added yet.
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
                <h2 class="text-lg font-semibold text-gray-700">
                  {{ item.type === 'movie' ? item.title : item.name }}
                </h2>
                <p class="text-sm text-gray-400">
                  {{
                    formatTime(
                      item.type === 'movie'
                        ? item.release_date
                        : item.first_air_date
                    )
                  }}
                </p>
              </div>
            </div>

            <!-- Overview -->
            <p
              class="text-sm text-gray-600 dark:text-gray-500 mt-2 line-clamp-4"
            >
              {{ item.overview }}
            </p>

            <!-- Buttons -->
            <div class="mt-4 flex gap-4 text-sm text-gray-500">
              <!-- Rating Button & Modal Wrapper -->
              <div class="relative">
                <button
                  class="flex items-center gap-1 transition"
                  @click="openRatingModal(item.id)"
                >
                  <Icon
                    :name="
                      watchRating.getRatings(item.id) > 0
                        ? 'mdi:star'
                        : 'mdi:star-outline'
                    "
                    class="text-xl hover:text-gray-500"
                    :class="
                      watchRating.getRatings(item.id) > 0
                        ? 'text-yellow-500'
                        : 'text-gray-500'
                    "
                  />
                  <span>
                    {{
                      watchRating.getRatings(item.id) > 0
                        ? Math.round(watchRating.getRatings(item.id) * 20) + '%'
                        : 'Rate it!'
                    }}
                  </span>
                </button>

                <!-- Modal burada hemen altında gözükür -->
                <RatingModal
                  v-if="selectedMovieId === item.id && showRatingModal"
                  :movie-id="item.id"
                  :visible="showRatingModal"
                  class="absolute z-50 top-[70px] left-0"
                  @close="closeRatingModal"
                />
              </div>

              <button
                class="flex items-center gap-1 transition"
                @click="favoritesStore.toggleFavorite(item.id)"
              >
                <Icon
                  :name="
                    isItemFavorite(item.id) ? 'mdi:heart' : 'mdi:heart-outline'
                  "
                  class="text-lg"
                  :class="
                    isItemFavorite(item.id) ? 'text-rose-500' : 'text-gray-500'
                  "
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
          Total {{ filteredItems.length }}
          {{ selectedTab === 'movie' ? 'film' : 'dizi' }}.
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
