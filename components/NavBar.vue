<template>
 <header class="fixed top-0 w-full z-50 transition-all duration-300"
          :class="{'bg-transparent': !scrolled, 'bg-netflix-black dark:bg-white shadow-md': scrolled}">
          <div class="container mx-auto px-4 py-3 flex items-center justify-between">

                <!--       LEFT SIDE        -->
               <div class="flex items-center gap-8">
                    <!--       LOGO       -->
                           <NuxtLink to="/" class="shrink-0">
                                 <img src="/troya.jpg" alyt="Nuxt Film site logo" class="h-8 w-auto rounded"/>
                           </NuxtLink>
                   <!--       NAVIGATION       -->
              <nav class="hidden md:flex items-center gap-8">
                    <NuxtLink to="/" class="text-sm text-white dark:text-netflix-black hover:text-netflix-light-gray dark:hover:text-netflix-gray" exact-active-class="font-bold">
                         Home </NuxtLink>
                    <NuxtLink to="/tv-shows" class="text-sm text-white dark:text-netflix-black hover:text-netflix-light-gray dark:hover:text-netflix-gray" exact-active-class="font-bold">
                         Tv Shows </NuxtLink>
                    <NuxtLink to="/movie/123" class="text-sm text-white dark:text-netflix-black hover:text-netflix-light-gray dark:hover:text-netflix-gray" exact-active-class="font-bold">
                         Movies </NuxtLink>
                    <NuxtLink to="/my-list" class="text-sm text-white dark:text-netflix-black hover:text-netflix-light-gray dark:hover:text-netflix-gray" exact-active-class="font-bold">
                         My List </NuxtLink>
              </nav>
               </div>

                <!--       Right SIDE        -->

               <div class="flex items-center gap-4">

                <!--     Theme  Toggle   Mode   -->
                       <button @click="toggleTheme" class="p-2 rounded-full hover:bg-netflix-light-dark dark:hover:bg-gray-200 transition-colors">
                              <Icon v-if="colorMode.value === 'dark'" name="mdi:weather-sunny" class="text-white dark:text-netflix-black" size="1.5em"/>
                              <Icon v-else name="mdi:weather-night" class="text-white dark:text-netflix-black" size="1.5em"/>
                       </button>

                <!--     Search Icon   -->
                       <div class="relative">
                               <div @click="toggleSearch" class="cusor-pointer p-2">
                                      <Icon name="mdi:magnify" size="1.5em" class="text-white cursor-pointer dark:text-netflix-black"/>
                               </div>
                               <div v-if="showSearch" class="absolute right-0 top-full w-64 mt-2 bg-netflix-dark dark:bg-white rounded-lg shadow-lg p-2 animate-fade-in">
                                    <input v-model="searchQuery" @keyup.enter="performSearch" placeholder="Titles, peoples, genres"
                                           class="w-full bg-netflix-light-dark dark:bg-gray-100 text-white dark:text-netflix-black px-3 py-2 rounded-sm focus:outline-none"/>
                               </div>
                       </div>
               </div>
          </div>
 </header>
</template>

<script setup lang="ts">
   const scrolled = ref<boolean>(false)
   const colorMode = useColorMode()
   const showSearch = ref<boolean>(false)
   const searchQuery = ref<string>('')

   const toggleTheme = () => {
         colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
   }

   const toggleSearch = () => {
         showSearch.value = !showSearch.value
   }

   const performSearch = () => {
        if(searchQuery.value.trim()){
               navigateTo(`/search?query=${encodeURIComponent(searchQuery.value)}`);  
               showSearch.value = false
               // navigateTo(`/search?q=${searchQuery.value.trim()}`);  boyle olsaydi mesela  ->>>>  hello world   2 sozun arasi bosluk dur  BU HATA veryor encodURIComponent bunu hallediyor 
        }
   }
onMounted(() => {
      window.addEventListener('scroll', () => {
             scrolled.value = window.scrollY > 30;
      })
     // Close menus when clicking outside
  window.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.relative')) {
      showSearch.value = false;
    }
  });
})

onUnmounted(() => {
    window.removeEventListener('scroll', () => {})
})
</script>

