<template>
  <div v-if="visible" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-xl w-[300px]">
      <h2 class="text-lg font-semibold mb-4 text-center">Filmi Oyla</h2>

      <RatingStars v-model="localRating" />

      <div class="flex justify-end mt-6 gap-2">
        <button @click.stop="cancel" class="px-3 py-1 text-sm rounded hover:bg-gray-100">İptal</button>
        <button @click.stop="save" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Kaydet</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRatingStore } from '~/stores/ratingstar'
import RatingStars from './RatingStars.vue'

const props = defineProps<{
  movieId: number
  visible: boolean
}>()
const emit = defineEmits(['close'])

const ratingStore = useRatingStore()
const localRating = ref(ratingStore.getRatings(props.movieId))

const save = () => {
  ratingStore.setRatings(props.movieId, localRating.value)
  emit('close')
}
const cancel = () => emit('close')
</script>
