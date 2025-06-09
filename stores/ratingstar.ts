import { defineStore } from 'pinia'

export const useRatingStore = defineStore('rates',  {
    state: () => ({
      ratings: {} as Record<number, number>  //    ORNEK { 125: 4.5}
    }),
    actions: {
            setRatings(moveId: number, rating: number){
                   this.ratings[moveId] = rating
            },
            getRatings(moveId: number){
            return this.ratings[moveId] || 0
            }
    },
    persist: {
        storage: piniaPluginPersistedstate.localStorage()
    }
})