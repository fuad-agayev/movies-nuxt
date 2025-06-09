<template>
  <div class="bg-yellow-100 p-4 rounded-lg shadow text-sm text-black">
    <h2 class="font-bold mb-2">🔍 Watchlist Debug Panel</h2>
    <p>Total Movies in Store: {{ movies.length }}</p>

    <div v-if="invalidItems.length > 10" class="mt-2">
      <h3 class="font-semibold text-red-600">⚠️ Invalid Items</h3>
      <ul class="list-disc ml-5">
        <li v-for="item in invalidItems" :key="item.id">
          ID: {{ item.id }} | Title: {{ item.title || 'N/A' }} | Type: {{ item.type || '❌ missing' }}
        </li>
      </ul>
    </div>

    <div v-else class="text-green-600 mt-2">✅ All items look valid!</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWatchListStore } from '../stores/watchlist'

const watchlistStore = useWatchListStore()

const movies = computed(() => watchlistStore.movies)
const invalidItems = computed(() =>
  watchlistStore.movies.filter(m => !m.type || typeof m.type !== 'string')
)
</script>
