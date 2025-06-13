<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSearchTmdb } from '~/composables/searchTmdb'

interface SearchResult {
  id: number
  title?: string
  name?: string
  media_type: 'movie' | 'tv' | 'person'
  overview?: string
  release_date?: string
  first_air_date?: string
  poster_path?: string
  profile_path?: string
}

const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const query = ref(route.query.q?.toString() || '')
const selectedType = ref<'all' | 'movie' | 'tv' | 'person'>('all')
const results = ref<SearchResult[]>([])

const { useSearch } = useSearchTmdb()

const performSearch = async () => {
  if (!query.value.trim()) {
    results.value = []
    return
  }

  try {
    const res = await useSearch('multi', query.value)
    results.value = res.results || []
  } catch (err) {
    results.value = []
  }
}

watch(() => route.query.q, (newQ) => {
  query.value = newQ?.toString() || ''
  performSearch()
}, { immediate: true })

const filteredResults = computed(() => {
  if (selectedType.value === 'all') return results.value
  return results.value.filter(r => r.media_type === selectedType.value)
})

const getTitle = (item: SearchResult) => item.title || item.name || 'Untitled'
const getDate = (item: SearchResult) => item.release_date || item.first_air_date || ''
const getImageUrl = (item: SearchResult) => {
  const path = item.poster_path || item.profile_path
  return path ? `${config.public.imageBaseUrl}w300${path}` : '/no-image.png'
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-4">
    <!-- Search input -->
    <div class="mb-6">
      <input
        v-model="query"
        @input="router.push({ query: { q: query } })"
        type="text"
        placeholder="Search for movies, tv shows, people..."
        class="w-full p-3 border rounded"
      />
    </div>

    <!-- Filter buttons -->
    <div class="mb-4 flex gap-2">
      <button
        v-for="type in ['all', 'movie', 'tv', 'person']"
        :key="type"
        @click="selectedType = type"
        :class="[
          'px-3 py-1 rounded border',
          selectedType === type ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
        ]"
      >
        {{ type }}
      </button>
    </div>

    <!-- Results -->
    <div v-if="filteredResults.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="item in filteredResults"
        :key="item.id"
        class="border rounded shadow hover:shadow-lg overflow-hidden"
      >
        <img :src="getImageUrl(item)" :alt="getTitle(item)" class="w-full h-60 object-cover" />
        <div class="p-4">
          <h3 class="font-semibold text-lg">{{ getTitle(item) }}</h3>
          <p class="text-gray-500 text-sm mb-2">{{ getDate(item) }}</p>
          <p class="text-sm text-gray-700 line-clamp-2">{{ item.overview }}</p>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 mt-10">
      No results found for "{{ query }}"
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
