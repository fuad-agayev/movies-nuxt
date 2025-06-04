// stores/favorites.ts
export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [] as number[] // Sadece ID'leri tut
  }),
  actions: {
    toggleFavorite(id: number) {
      if (this.favorites.includes(id)) {
        this.favorites = this.favorites.filter(favId => favId !== id)
      } else {
        this.favorites.push(id)
      }
    }
  },
  persist: {
    storage: piniaPluginPersistedstate.localStorage()
  }
})
