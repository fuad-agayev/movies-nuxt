<template>
  <header
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="{
      'bg-transparent': !scrolled,
      'bg-netflix-black dark:bg-white shadow-md': scrolled
    }"
  >
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- LEFT SIDE -->
      <div class="flex items-center gap-4 md:gap-8">
        <!-- LOGO -->
        <NuxtLink to="/" class="shrink-0">
          <img src="/images/troya.jpg" alt="Nuxt Film site logo" class="h-8 w-auto rounded" />
        </NuxtLink>

        <!-- DESKTOP NAV -->
        <nav class="hidden md:flex items-center gap-6">
          <NuxtLink
            to="/"
            class="text-sm text-white dark:text-netflix-black hover:text-netflix-light-gray dark:hover:text-netflix-gray"
            exact-active-class="font-bold"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/films"
            class="text-sm text-white dark:text-netflix-black hover:text-netflix-light-gray dark:hover:text-netflix-gray"
            exact-active-class="font-bold"
          >
            Movies
          </NuxtLink>
          <NuxtLink
            to="/tv-shows"
            class="text-sm text-white dark:text-netflix-black hover:text-netflix-light-gray dark:hover:text-netflix-gray flex items-center gap-1"
            exact-active-class="font-bold"
          >
            <Icon name="mdi:television" class="text-base" />
            Shows
          </NuxtLink>
          <NuxtLink
            to="/watchlist"
            class="text-sm text-white dark:text-netflix-black hover:text-netflix-light-gray dark:hover:text-netflix-gray"
            exact-active-class="font-bold"
          >
            Watchlist
          </NuxtLink>
        </nav>
      </div>

      <!-- RIGHT SIDE -->
      <div class="flex items-center gap-4">
        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="mb-3 w-7 h-7 flex items-center justify-center rounded hover:bg-netflix-light-dark dark:hover:bg-gray-200 transition-colors border border-gray-300"
        >
          <Icon
            v-if="colorMode.value === 'dark'"
            name="solar:sun-bold"
            class="text-white dark:text-netflix-black"
            size="1em"
          />
          <Icon v-else name="lucide:moon-star" class="text-white bg-white dark:text-white" size="1em" />
        </button>

        <!-- Search -->
        <div class="relative">
          <div @click="toggleSearch" class="cursor-pointer p-2">
            <Icon
              name="mdi:magnify"
              size="1.5em"
              class="text-white cursor-pointer dark:text-netflix-black"
            />
          </div>
          <div
            v-if="showSearch"
            class="absolute right-0 top-full w-64 mt-2 bg-netflix-dark dark:bg-white rounded-lg shadow-lg p-2 animate-fade-in"
          >
            <input
              v-model="searchQuery"
              @keyup.enter="performSearch"
              placeholder="Titles, peoples, genres"
              class="w-full bg-netflix-light-dark dark:bg-gray-100 text-white dark:text-netflix-black px-3 py-2 rounded-sm focus:outline-none"
            />
          </div>
        </div>

        <!-- Hamburger 
        <div class="md:hidden flex items-center">
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="text-white dark:text-netflix-black p-2"
          >
            <Icon
              :name="isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'"
              size="1.5em"
            />
          </button>
        </div>
      -->

        <div class="md:hidden flex items-center mb-2">
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 text-white dark:text-netflix-black"
          >
            <svg
              v-if="!isMobileMenuOpen"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <line x1="3" y1="6" x2="21" y2="6" stroke-width="2" stroke-linecap="round" />
              <line x1="3" y1="18" x2="21" y2="18" stroke-width="2" stroke-linecap="round" />
            </svg>

            <svg v-else fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
              <line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round" />
              <line x1="6" y1="18" x2="18" y2="6" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- MOBILE NAV -->
    <Transition name="fade-slide">
      <nav
        v-if="isMobileMenuOpen"
        class="w-full md:hidden bg-netflix-black dark:bg-white px-6 py-4 flex flex-col gap-4 shadow-lg"
      >
        <NuxtLink
          to="/"
          class="text-base font-medium text-white dark:text-netflix-black hover:text-netflix-light-gray dark:hover:text-netflix-gray transition-colors"
          exact-active-class="font-bold"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/films"
          class="text-base font-medium text-white dark:text-netflix-black hover:text-netflix-light-gray dark:hover:text-netflix-gray transition-colors"
          exact-active-class="font-bold"
        >
          Movies
        </NuxtLink>
        <NuxtLink
          to="/tv-shows"
          class="text-base font-medium text-white dark:text-netflix-black hover:text-netflix-light-gray dark:hover:text-netflix-gray transition-colors"
          exact-active-class="font-bold"
        >
          <Icon name="mdi:television" class="text-xl align-middle px-2" />
          Shows
        </NuxtLink>
        <NuxtLink
          to="/watchlist"
          class="text-base font-medium text-white dark:text-netflix-black hover:text-netflix-light-gray dark:hover:text-netflix-gray transition-colors"
          exact-active-class="font-bold"
        >
          Watchlist
        </NuxtLink>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const scrolled = ref(false)
const colorMode = useColorMode()
const showSearch = ref(false)
const searchQuery = ref('')
const isMobileMenuOpen = ref(false)

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value
}

const performSearch = () => {
  const query = searchQuery.value.trim()
  if (query) {
    navigateTo(`/search?query=${encodeURIComponent(query)}`)
    // navigateTo(/search?q=${searchQuery.value.trim()});  boyle olsaydi mesela  ->>>>  hello world   2 sozun arasi bosluk dur  BU HATA veryor encodURIComponent bunu hallediyor
    showSearch.value = false
    
  }
}

const onScroll = () => {
  scrolled.value = window.scrollY > 30
}

const onClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.relative')) {
    showSearch.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  window.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('click', onClickOutside)
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
