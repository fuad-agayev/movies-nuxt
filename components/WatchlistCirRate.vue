<template>
  <svg class="w-10 h-10" viewBox="0 0 36 36">
    <!-- Gri arka halka -->
    <path stroke="#4b5563" stroke-width="3.7" fill="" :d="circlePath" />
    <!-- Dinamik puan halkası -->
    <path
      :stroke="scoreFillColor"
      stroke-width="2.2"
      fill=""
      :d="circlePath"
      stroke-linecap="round"
      :stroke-dasharray="`${percentage}, 100`"
    />
    <!-- Skor yazısı -->
    <text
      x="18"
      y="18.5"
      fill="azure"
      font-size="9"
      text-anchor="middle"
      alignment-baseline="middle"
      class="font-bold"
    >
      {{ Math.round(percentage) }}%
    </text>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  miniscore: number
}>()

// Hesaplama: 10 üzerinden puanı %'ye çevir
const percentage = (props.miniscore / 10) * 100

// SVG çember path
const circlePath =
  'M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831'

// Puanın rengine göre renk seçimi
const scoreFillColor =
  percentage >= 70
    ? '#4ade80' // yeşil
    : percentage >= 50
      ? '#facc15' // sarı
      : '#ef4444' // kırmızı
</script>
