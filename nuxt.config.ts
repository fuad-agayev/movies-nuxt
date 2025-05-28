// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/color-mode', '@nuxt/icon'],
  colorMode: {
    preference: 'dark',
    classSuffix: '',
    fallback: 'dark',
    storageKey: 'nuflix-color-mode'
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://api.themoviedb.org/3',
      apiKey: process.env.TMDB_API_KEY || '',
      imageBaseUrl: 'https://image.tmdb.org/t/p'
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'NuFlix - Stream Movies and TV Shows',
      titleTemplate: '%s | NuFlix',
      meta: [
        { name: 'description', content: 'A Netflix clone built with Nuxt 3' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: 'images/troya.jpg' }
      ]
    }
  }
})