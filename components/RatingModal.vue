
<template>
  <div
    v-if="visible"
    class="fixed bottom-40 right-4 z-50 flex items-center justify-center"
    @click.self="cancel"
  >
    <div class="relative bg-black/70 text-white rounded-lg w-[190px] min-h-[60px] p-2 pr-3 flex flex-row gap-2">

      <!-- Chevron (Ok) -->
      
        <Icon
        name="mdi:play"
        class="absolute -top-3 right-1/3 transform -translate-x-1/3 text-black/70 -rotate-90 text-2xl"
      />
      

      <!-- Sol Bölüm -->
      <div class="flex flex-col flex-1 items-start justify-start gap-1">
        <!-- Tarih -->
        <div class="text-center text-[12px] pl-1 font-semibold tracking-wide leading-tight">
          {{ ratingDate ? formatDate(dateExample) : 'Henüz oylanmadı' }}
        </div>

        <!-- Reset + Yıldızlar -->
        <div class="flex items-center gap-1">
          <button
            @click="resetRating"
            :disabled="localRating === 0"
            class="text-yellow-300 hover:text-red-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Reset rating"
          >
            <Icon name="mdi:minus-circle-outline" size="16" />
          </button>
          <RatingStars
            :modelValue="localRating"
            @update:modelValue="localRating = $event"
            class="scale-90"
          />
        </div>
      </div>

     <!-- Sağ Butonlar -->
<div class="flex flex-col items-center">
  <button
    @click="save"
    class="bg-yellow-400 text-black text-xs px-2 py-1 rounded-md hover:bg-yellow-500 transition"
    type="button"
  >
    save
  </button>
  <button
    @click="cancel"
    class="text-xs text-white hover:text-white hover:underline transition mt-auto"
    type="button"
  >
    exit
  </button>
</div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useRatingStore } from '~/stores/ratingstar'
import RatingStars from './RatingStars.vue'
import { useDateFormat } from '~/composables/useDateForm'

const { formatDate } = useDateFormat()
const dateExample = new Date()

const props = defineProps({
  movieId: {
    type: Number,
    required: true
  },
  visible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'submit'])

const ratingStore = useRatingStore()
const localRating = ref(ratingStore.getRatings(props.movieId))
const ratingDate = ref(ratingStore.getRatingDate?.(props.movieId) || null)

const resetRating = () => {
  localRating.value = 0
  //save()
}

const save = () => {
  ratingStore.setRatings(props.movieId, localRating.value)
  emit('submit', {
    rating: localRating.value,
    date: new Date()
  })
  emit('close')
}

const cancel = () => {
  emit('close')
}

</script>





