
<template>
  <div
    class="flex items-center gap-1 cursor-pointer group"
    role="radiogroup"
    aria-label="Star rating"
  >
    <div
      v-for="i in 5"
      :key="i"
      @mousemove="hover = i"
      @mouseleave="hover = 0"
      @click="$emit('update:modelValue', i)"
      class="transition-transform duration-200 ease-in-out"
      :class="{
        'scale-125 text-yellow-400': hover >= i,
        'text-yellow-400': !hover && modelValue >= i,
        'text-gray-400': !hover && modelValue < i
      }"
      role="radio"
      :aria-checked="modelValue === i"
      tabindex="0"
      @keydown.enter="$emit('update:modelValue', i)"
      @keydown.space.prevent="$emit('update:modelValue', i)"
    >
      <Icon :name="modelValue >= i ? 'mdi:star' : 'mdi:star-outline'" class="text-lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: number }>()
const emit = defineEmits(['update:modelValue'])
const hover = ref(0)
</script>



   



