
<template>
  <header
    class="fixed top-0 left-0 w-full z-50 bg-black text-white shadow-sm transition-all"
    :class="{ 'shadow-lg bg-opacity-70': scrolled }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 relative">
        <!-- LEFT SIDE -->
        <div class="flex items-center space-x-6">
          <NuxtLink to="/" class="mr-2">
            <span class="text-yellow-500 px-2 py-1 rounded font-extrabold text-xl tracking-wide">NUFLIX</span>
          </NuxtLink>
          <nav class="hidden md:flex items-center space-x-5 text-sm">
            <NuxtLink to="/films" exact-active-class="font-bold text-yellow-400" class="hover:text-yellow-400">Movies</NuxtLink>
            <NuxtLink to="/tv-shows" exact-active-class="font-bold text-yellow-400" class="hover:text-yellow-400 flex items-center gap-1">
              <Icon name="mdi:tv" size="1.1em" />
              Shows
            </NuxtLink>
          </nav>
        </div>

        <!-- CENTER SEARCH -->
      
  <div class="absolute left-1/2 transform -translate-x-1/2 w-full max-w-lg px-4 hidden md:block">
          <div class="relative">
            <div class="relative flex bg-white rounded overflow-hidden shadow-md">
              
              <!-- Search Input -->
              <div class="flex-1 relative">
                <input
                  v-model="searchQuery"
                  @keydown.enter="performSearch"
                  type="text"
                  placeholder="Search..."
                  class="w-full h-9 px-4 pr-10 text-sm text-black focus:outline-none"
                  data-testid="navbar-search-input" 
                />
                <Icon
                  name="mdi:magnify"
                  size="1.2em"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  @click="performSearch"
                />
              </div>
            </div>

            <!-- Dropdown Results -->
            <div
              v-if="showDropdown"
              class="absolute top-11 left-0 w-full max-w-lg bg-black/80 text-white rounded-lg shadow-xl mt-2 z-50 overflow-hidden"
            >
              <div v-if="loadingDropdown" class="py-6 text-center text-gray-400 text-sm">Searching...</div>

              <div v-else-if="resultsDropdown.length === 0" class="py-6 text-center text-gray-500 text-sm">
                No results found.
              </div>

              <div v-else class="grid grid-cols-1 gap-2 p-2 max-h-[700px] overflow-y-auto">
                <NuxtLink
                  v-for="item in resultsDropdown"
                  :key="item.id"
                  :to="`/${item.media_type}/${item.id}`"
                  
                  class="flex gap-2 hover:bg-white/20 border-b border-b-gray-500 overflow-hidden transition-all duration-200"
                >
                  <img
                    :src="item.poster_path || item.profile_path ? `${config.public.imageBaseUrl}/w200${item.poster_path || item.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Image'"
                    :alt="item.title || item.name"
                    class="w-16 h-24 object-cover rounded-l"
                  />
                  <div class="py-2 pr-3 flex flex-col justify-between">
                    <h3 class="text-sm font-semibold line-clamp-2">{{ item.title || item.name }}</h3>
                    <div v-if="item.vote_average" class="text-yellow-400 text-xs mt-1">⭐ {{ item.vote_average.toFixed(1) }}</div>
                    <span class="text-gray-400 text-xs capitalize">{{ item.media_type }}</span>
                  </div>
                </NuxtLink>
              </div>
               <p class="text-gray-300 px-2 py-4">See all search results for "<span class="font-semibold text-indigo-400">{{ searchQuery }}"</span></p>
            </div>
          </div>
        </div>

        <!-- RIGHT SIDE -->
        <div class="flex items-center justify-between space-x-4 md:space-x-4 px-4">
          <button @click="toggleMobileSearch" class="md:hidden">
            <Icon name="mdi:magnify" size="1.5em" />
          </button>
          <NuxtLink to="/watchlist" class="hidden md:flex items-center text-sm hover:text-yellow-400" exact-active-class="font-bold text-yellow-400">
            <Icon name="mdi:bookmark-outline" size="1.1em" />
            <span>Watchlist</span>
          </NuxtLink>
          <button @click="toggleTheme" data-testid="theme-toggle" class="w-8 h-8 flex items-center justify-center rounded border border-gray-500 hover:bg-gray-700 transition">
            <Icon v-if="colorMode.value === 'dark'" name="solar:sun-bold" class="text-white" size="1em" />
            <Icon v-else name="lucide:moon-star" class="text-white" size="1em" />
          </button>
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden">
            <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
              <line x1="3" y1="6" x2="21" y2="6" stroke-width="2" stroke-linecap="round" />
              <line x1="3" y1="18" x2="21" y2="18" stroke-width="2" stroke-linecap="round" />
            </svg>
            <svg v-else fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
              <line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round" />
              <line x1="6" y1="18" x2="18" y2="6" stroke-width="2" stroke-linecap="round" />
            </svg>
           <!--<Icon :name="isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'" size="1.5em" />-->
          </button>
        </div>
      </div>
    </div>

    <!-- MOBILE SEARCH -->
<Transition name="fade-slide">
  <div v-if="showMobileSearch" class="md:hidden px-4 py-3 bg-[#121212] shadow-sm space-y-2 relative">
    <div class="relative flex bg-white rounded overflow-hidden">
      <div class="flex-1 relative">
        <input
          v-model="searchQuery"
          @keydown.enter="performSearch"
          type="text"
          placeholder="Search..."
          class="w-full h-9 px-4 pr-10 text-sm text-black focus:outline-none"
        />
        <Icon
          name="mdi:magnify"
          size="1.2em"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          @click="performSearch"
        />
      </div>
    </div>

    <!-- 🔽 Add the dropdown here for mobile -->
    <div
      v-if="showDropdown"
      class="absolute top-full left-0 w-full bg-black/80 text-white rounded-lg shadow-xl mt-2 z-50 overflow-hidden"
    >
      <div v-if="loadingDropdown" class="py-6 text-center text-gray-400 text-sm">Searching...</div>

      <div v-else-if="resultsDropdown.length === 0" class="py-6 text-center text-gray-500 text-sm">
        No results found.
      </div>

      <div v-else class="grid grid-cols-1 gap-2 p-2 max-h-[700px] overflow-y-auto">
        <NuxtLink
          v-for="item in resultsDropdown"
          :key="item.id"
          :to="`/${item.media_type}/${item.id}`"
          class="flex gap-2 hover:bg-white/20 border-b border-b-gray-500 overflow-hidden transition-all duration-200"
        >
          <img
            :src="item.poster_path || item.profile_path ? `${config.public.imageBaseUrl}/w200${item.poster_path || item.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Image'"
            :alt="item.title || item.name"
            class="w-16 h-24 object-cover rounded-l"
          />
          <div class="py-2 pr-3 flex flex-col justify-between">
            <h3 class="text-sm font-semibold line-clamp-2">{{ item.title || item.name }}</h3>
            <div v-if="item.vote_average" class="text-yellow-400 text-xs mt-1">⭐ {{ item.vote_average.toFixed(1) }}</div>
            <span class="text-gray-400 text-xs capitalize">{{ item.media_type }}</span>
          </div>
        </NuxtLink>
      </div>
      <p class="text-gray-300 px-2 py-4">
        See all search results for "<span class="font-semibold text-indigo-400">{{ searchQuery }}</span>"
      </p>
    </div>
  </div>
</Transition>
    <!-- MOBILE NAV -->
    <Transition name="fade-slide">
      <nav v-if="isMobileMenuOpen" class="md:hidden bg-opacity-95 text-white text-center px-6 py-4 space-y-4">
        <NuxtLink to="/films" exact-active-class="font-bold text-yellow-400" class="block">Movies</NuxtLink>
        <NuxtLink to="/tv-shows" exact-active-class="font-bold text-yellow-400" class="block">Shows</NuxtLink>
        <NuxtLink to="/watchlist" exact-active-class="font-bold text-yellow-400" class="block">Watchlist</NuxtLink>
      </nav>
    </Transition>
  </header>
</template>
<script setup lang="ts">
import { debounce } from 'lodash-es'
//import debounce from 'lodash/debounce'
const colorMode = useColorMode()
const searchQuery = ref('')
const isMobileMenuOpen = ref(false)
const showMobileSearch = ref(false)
const showFilter = ref(false)
const scrolled = ref(false)
const showDropdown = ref(false)
const loadingDropdown = ref(false)
const resultsDropdown = ref<SearchResult[]>([])
const router = useRouter()

router.afterEach(() => {
  showDropdown.value = false
})
import { useSearchTmdb } from '~/composables/searchTmdb'
import { useRuntimeConfig } from '#imports'
import type { SearchResult, FilterOption } from '~/types/movies'

const { useSearch } = useSearchTmdb()
const config = useRuntimeConfig()

const filterOptions: FilterOption[] = [
  { key: 'all', label: 'All', icon: 'mdi:magnify' },
  { key: 'movies', label: 'Movies', icon: 'mdi:movie-outline' },
  { key: 'tv', label: 'TV Shows', icon: 'mdi:television-classic' },
  { key: 'persons', label: 'Persons', icon: 'mdi:account-outline' }
]
const selectedFilter = ref<FilterOption>(filterOptions[0])

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const toggleMobileSearch = () => {
  showMobileSearch.value = !showMobileSearch.value
}

const toggleFilter = () => {
  showFilter.value = !showFilter.value
  
}

const selectFilter = (option:FilterOption) => {
  selectedFilter.value = option
  showFilter.value = false
}

const performSearch = () => {
  const query = searchQuery.value.trim()
  if (query) {
    navigateTo(`/search?query=${encodeURIComponent(query)}&filter=${selectedFilter.value.key}`)
    showMobileSearch.value = false
    showFilter.value = false
    
  }
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}



const searchDropdown = async() => {
  if (!searchQuery.value) return
  loadingDropdown.value = true

  try {
    const response = await useSearch('multi', searchQuery.value) as any
    resultsDropdown.value = response?.results || []
  } catch (error) {
    console.error('Search error:', error)
    resultsDropdown.value = []
  } finally {
    loadingDropdown.value = false

  }
}

const debounceDropdownSearch = debounce(() => {
        searchDropdown()
}, 1500)

watch(searchQuery, (newQuery) => {
  if (newQuery.trim()) {
    showDropdown.value = true
     debounceDropdownSearch()
  } else {
    showDropdown.value = false
    resultsDropdown.value = []
  }
})


const onScroll = () => {
  scrolled.value = window.scrollY > 30
  showDropdown.value = false
}

onMounted(() => {
  if(searchQuery.value) searchDropdown()
  window.addEventListener('scroll', onScroll)
})

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

</script>








