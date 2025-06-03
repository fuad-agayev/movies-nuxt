// stores/watchlist.ts
import { defineStore } from 'pinia'
import type { Movie } from '~/types/movies'


export const useWatchListStore = defineStore('watchlist', {
  state: () => ({
    movies: [] as Movie[]
  }),
  actions: {
    addMovie(movie: Movie) {
      if (!this.movies.find(m => m.id === movie.id)) {
        this.movies.push(movie)
      }
    },
    removeMovie(movieId: number) {
      this.movies = this.movies.filter(m => m.id !== movieId)
    }
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage()
  }

})


//* IF YOU DO NOT USE the `pinia-plugin-persistedstate` MODULE:
//* You will need to handle localStorage manually, as shown below.

//* This module is helpful when you have many operations involving localStorage.
//* It helps reduce boilerplate code, keeps your store logic clean, and is easier to maintain.
//*  onMounted(() =>{useWatchListStore().loadFromLocalStorage()})   watchlist.vue componentde bu olmalidir. Ancak bu MODUL ileAVTOMATIK YAPILIR GEREK YOK
/*
import { defineStore } from 'pinia'
import type { Movie } from '~/types/movies'

export const useWatchListStore = defineStore('watchlist', {
  state: () => ({
    movies: [] as Movie[]
  }),
  actions: {
    addMovie(movie: Movie) {
      if (!this.movies.find(m => m.id === movie.id)) {
        this.movies.push(movie)
        this.saveToLocalStorage()
      }
    },
    removeMovie(movieId: number) {
      this.movies = this.movies.filter(m => m.id !== movieId)
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('watchlist', JSON.stringify(this.movies))
    },
    loadFromLocalStorage() {
      const saved = localStorage.getItem('watchlist')
      if (saved) {
        this.movies = JSON.parse(saved)
      }
    }
})
*/
