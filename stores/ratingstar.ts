import { defineStore } from 'pinia'

export const useRatingStore = defineStore('rates', {
  state: () => ({
    ratings: {} as Record<number, number>, //    ORNEK { 125: 4.5}
    ratingDates: {} as Record<number, string>, // ISO date string
  }),
  actions: {
    setRatings(moveId: number, rating: number) {
      this.ratings[moveId] = rating
      this.ratingDates[moveId] = new Date().toISOString()
    },
    getRatings(moveId: number) {
      return this.ratings[moveId] || 0
    },
    getRatingDate(moveId: number): Date | null {
      const dateStr = this.ratingDates[moveId]
      return dateStr ? new Date(dateStr) : null
    },
  },
  persist: true,
})
