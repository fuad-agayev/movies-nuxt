
<template>
  <teleport to="#teleModal">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
      @click.self="close"
    >
      <div class="bg-white rounded-xl p-4 shadow-lg w-[550px] relative">
        <!-- Title -->
        <h2 class="text-2xl font-bold mb-4 text-black">Rating</h2>
        <h3 class="text-sm mb-10 text-black">
          <i class="font-semibold"> What did you think of How to Train your {{ movieTitle }}? </i>
        </h3>

        <!-- Slider -->
        <div class="relative mb-6">
          <!-- Background track -->
          <div class="w-full h-2 rounded bg-gray-300 overflow-hidden relative">
            <div
              class="h-full absolute top-0 left-0"
              :style="{
                        width: `${vibeValue}%`,
                        background: sliderColor
                      }"
            ></div>
          </div>

          <!-- Transparent range input -->
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            v-model="vibeValue"
            class="w-full absolute top-0 left-0 h-2 opacity-0 cursor-pointer "
          />

          <!-- Tooltip/Label -->
          <div
            class="absolute -top-8 transform -translate-x-1/2 text-xs font-semibold px-2 py-1
             bg-black text-white border rounded-lg rounded-bl-sm shadow-md"
            :style="{ left: `${vibeValue}%` }"
          >
            
            {{ ratingLabel }}
            
          </div>

           <!-- Tick marks -->
  <div class="absolute w-full left-0 top-[8px] flex justify-between pointer-events-none">
    <span
      v-for="n in 11"
      :key="n"
      class="w-px h-3 bg-gray-400 opacity-50"
    ></span>
  </div>

          <!-- Value markers -->
  <div class="flex justify-between mt-4 text-[12px] text-gray-500">
    <span v-for="n in 11" :key="n">{{ (n - 1) * 10 }}</span>
  </div>
        </div>

        <!-- Value -->
        <div class="text-center mb-4">
          <span class="font-bold text-lg" :class="sliderColorClass">
            {{ vibeValue }}%
          </span>
          <span class="text-sm text-gray-500 ml-2">user score</span>
        </div>

        <!-- Buttons -->
        <div class="flex justify-between">
          <button @click="saveVibe" class="px-4 py-2 bg-green-500 text-white rounded">
            Save
          </button>
          <button @click="clearRating" class="px-4 py-2 text-gray-500">
            Clear my rating 😊
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRatingStore } from '~/stores/ratingstar'

const props = defineProps({
  visible: Boolean,
  movieId: Number,
  movieTitle: {
    type: String,
    default: 'the movie'
  }
})
const emit = defineEmits(['close'])

const ratingStore = useRatingStore()
const vibeValue = ref(77)

// movieId değişince store'dan veriyi al
watch(
  () => props.movieId,
  (id) => {
    if (id) {
      const rating = ratingStore.getRatings(id)
      vibeValue.value = rating ? rating * 20 : 77
    }
  },
  { immediate: true }
)

// Kaydet
const saveVibe = () => {
  if (props.movieId) {
    ratingStore.setRatings(props.movieId, vibeValue.value / 20)
  }
  emit('close')
}

// Sıfırla
const clearRating = () => {
  vibeValue.value = 0
}

// Kapat
const close = () => emit('close')

// Renk gradyanı
const sliderColor = computed(() => {
  if (vibeValue.value <= 30) return '#f43f5e'
  if (vibeValue.value <= 60) return '#facc15'
  return '#22c55e'
})

// Yazı rengi
const sliderColorClass = computed(() => {
  if (vibeValue.value <= 30) return 'text-rose-500'
  if (vibeValue.value <= 60) return 'text-yellow-500'
  return 'text-green-500'
})

// Yüzdelik label (tooltip yazısı)
const ratingLabel = computed(() => {
  const val = vibeValue.value
  if (val >= 100) return 'Champion'
  if (val >= 90) return 'Greatness'
  if (val >= 80) return 'Really Good'
  if (val >= 70) return 'Pretty Decent'
  if (val >= 60) return "It's Alright"
  if (val >= 50) return 'Passable'
  if (val >= 40) return 'Not Good'
  if (val >= 30) return 'Truly Bad'
  if (val >= 20) return 'Barbage'
   if (val >= 10) return 'Absolute Trash'
  if (val >= 0) return 'Dumpster Fire'
  return 'Poor'
})

</script>


