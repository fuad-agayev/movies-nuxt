
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">
              Search results for "<span class="text-yellow-600">{{ query }}</span>"
            </h1>
            <p class="text-gray-500 mt-1 sm:mt-2">{{ totalResults }} results found</p>
          </div>
          <div v-if="results.length > 0" class="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 self-start sm:self-auto">
            Page {{ currentPage }} of {{ totalPages }}
          </div>
        </div>
      </div>

      <!-- Filters Section -->
      <div class="mb-6 bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div class="w-full">
            <h2 class="text-base sm:text-lg font-semibold text-gray-700 mb-2">Filter by</h2>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="category in categories"
                :key="category.value"
                @click="filter = category.value"
                class="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full border transition-colors flex items-center"
                :class="filter === category.value 
                  ? 'bg-yellow-600 text-white border-yellow-600 shadow-sm' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'"
              >
                
                {{ category.label }}
              </button>
            </div>
          </div>
          <div class="bg-gray-50 p-2 sm:p-3 rounded-lg min-w-max">
            <p class="text-xs sm:text-sm text-gray-600">Current search: <span class="font-medium text-gray-800">"{{ query }}"</span></p>
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- Results Header -->
        <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 class="text-lg sm:text-xl font-semibold flex items-center">
              <span class="w-1.5 h-5 sm:h-6 bg-yellow-600 mr-2 sm:mr-3 rounded-full"></span>
              {{ filter }} Results
            </h2>
            <div class="text-xs sm:text-sm text-gray-500">
              Showing {{ results.length }} of {{ totalResults }} items
            </div>
          </div>
        </div>

        <!-- Loading/Empty States -->
        <div v-if="isLoading" class="p-8 sm:p-12 text-center">
          <div class="inline-flex flex-col items-center">
            <div class="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-2 border-b-2 border-yellow-600 mb-3 sm:mb-4"></div>
            <p class="text-sm sm:text-base text-gray-500">Searching our database...</p>
          </div>
        </div>
        
        <div v-else-if="results.length === 0" class="p-8 sm:p-12 text-center">
          <div class="inline-flex flex-col items-center max-w-md mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-3 sm:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-lg sm:text-xl font-medium text-gray-700 mb-1 sm:mb-2">No results found</h3>
            <p class="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4">We couldn't find any matches for your search</p>
            <button @click="$router.back()" class="px-3 py-1.5 sm:px-4 sm:py-2 bg-yellow-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-yellow-700 transition-colors">
              Go Back
            </button>
          </div>
        </div>

        <!-- Results List -->
        <ul v-else class="divide-y divide-gray-200">
          <li v-for="item in results" :key="item.id" class="hover:bg-gray-50 transition-colors">
            <NuxtLink :to="`/${item.media_type}/${item.id}`" class="block p-4 sm:p-6">
              <div class="flex gap-3 sm:gap-5">
                <!-- Poster Image -->
                <div class="flex-shrink-0 relative">
                  <img
                    :src="item.poster_path
                      ? `${config.public.imageBaseUrl}/w200${item.poster_path}`
                      : 'https://via.placeholder.com/80x120?text=No+Image'"
                    alt="Poster"
                    class="w-14 h-20 sm:w-20 sm:h-28 object-cover rounded-lg shadow-sm"
                    loading="lazy"
                  />
                  <div v-if="item.vote_average" class="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-yellow-600 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-sm">
                    {{ Math.round(item.vote_average * 10) / 10 }}
                  </div>
                </div>
                
                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between">
                    <div>
                      <h3 class="text-base sm:text-lg font-semibold text-gray-800 hover:text-yellow-600 transition-colors line-clamp-1">
                        {{ item.title || item.name }}
                      </h3>
                      <div class="mt-1 flex flex-wrap items-center gap-x-2 sm:gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-500">
                        <span>
                          {{ item.release_date ? new Date(item.release_date).getFullYear() : '—' }}
                        </span>
                        <span class="flex items-center">
                          <span v-if="item.media_type === 'tv'" class="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] sm:text-xs font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 mr-0.5 sm:mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                            </svg>
                            TV
                          </span>
                          <span v-if="item.media_type === 'movie'" class="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] sm:text-xs font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 mr-0.5 sm:mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-8h1V5h-1v2zm2 4h1V9h-1v2zm-2 4h1v-2h-1v2zm-2 0h1v-2h-1v2zm-2 0h1v-2H9v2zm-2 0h1v-2H7v2z" clip-rule="evenodd" />
                            </svg>
                            Movie
                          </span>
                        </span>
                      </div>
                    </div>
                   
                  </div>
                  
                  <p v-if="item.overview" class="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2">
                    {{ item.overview }}
                  </p>
                </div>
              </div>
            </NuxtLink>
          </li>
        </ul>

        <!-- Pagination - Improved Responsive Behavior -->
        <div v-if="totalPages > 1" class="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 bg-gray-50">
          <nav class="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <div class="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
              Page {{ currentPage }} of {{ totalPages }}
            </div>
            <div class="flex items-center gap-1 sm:gap-2 order-1 sm:order-2 w-full sm:w-auto justify-between sm:justify-normal">
              <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage <= 1"
                class="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center flex-1 sm:flex-none justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span class="hidden xs:inline">Previous</span>
              </button>
              
              <!-- Page numbers - hidden on mobile -->
              <div class="sm:flex items-center gap-1 mx-2">
                <template v-for="page in visiblePages" :key="page">
                  <button
                    v-if="Math.abs(page - currentPage) < 3 || page === 1 || page === totalPages"
                    @click="goToPage(page)"
                    :aria-current="page === currentPage ? 'page' : undefined"
                    class="min-w-[2.25rem] px-2 py-1.5 rounded-md border text-sm font-medium"
                    :class="page === currentPage 
                      ? 'z-10 bg-yellow-600 border-yellow-600 text-white shadow-sm' 
                      : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-300'"
                  >
                    {{ page }}
                  </button>
                  <span 
                    v-else-if="(page === 2 && currentPage > 4) || (page === totalPages - 1 && currentPage < totalPages - 3)"
                    class="px-1 text-gray-500"
                  >
                    ...
                  </span>
                </template>
              </div>
              
              <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage >= totalPages"
                class="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center flex-1 sm:flex-none justify-center"
              >
                <span class="hidden xs:inline">Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSearchTmdb } from '~/composables/searchTmdb'
import { useRuntimeConfig } from '#imports'
import type { TmdbItem } from '~/types/movies'

const config = useRuntimeConfig()
const { useSearch } = useSearchTmdb()
const route = useRoute()
const router = useRouter()

const query = ref<string>(route.query.query as string || '')
const filter = ref<string>(route.query.filter as string || 'all')
const results = ref<TmdbItem[]>([])
const isLoading = ref<boolean>(false)
const currentPage = ref<number>(Number(route.query.page) || 1)
const totalPages = ref<number>(1)
const totalResults = ref<number>(0)

const categories = [
  { value: 'all', label: 'All' },
  { value: 'movies', label: 'Movies' },
  { value: 'tv', label: 'TV' },
  { value: 'persons', label: 'People' }
]


const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const search = async (): Promise<void> => {
  if (!query.value) return
  isLoading.value = true

  let searchType: any = 'multi'
  if (filter.value === 'movies') searchType = 'movie'
  else if (filter.value === 'tv') searchType = 'tv'
  else if (filter.value === 'persons') searchType = 'person'

  try {
    const response = await useSearch(searchType, query.value, currentPage.value) as any
    results.value = response?.results || []
    totalPages.value = response?.total_pages || 1
    totalResults.value = response?.total_results || 0
    
    
  } catch (error) {
    console.error('Search error:', error)
    results.value = []
  } finally {
    isLoading.value = false
  }
}

const updateRoute = () => {
  router.push({ 
    query: { 
      query: query.value,
      filter: filter.value,
      page: currentPage.value > 1 ? currentPage.value : undefined
    }
  })
}

const goToPage = (page: number): void => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  updateRoute()
}

watch(
  () => [route.query.query, route.query.filter, route.query.page],
  ([newQuery, newFilter, newPage]) => {
    query.value = newQuery as string || ''
    filter.value = newFilter as string || 'all'
    currentPage.value = Number(newPage) || 1
    if (query.value) search()
  },
  { immediate: true }
)

watch(filter, () => {
  currentPage.value = 1
  search()
})
</script>













































