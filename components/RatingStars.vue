
<template>
  <div class="flex items-center gap-1 group relative">
    <div
      v-for="i in 10"
      :key="i"
      @mousemove="hover = i / 2"
      @mouseleave="hover = 0"
      @click="$emit('update:modelValue', i / 2)"
      class="cursor-pointer transition-transform duration-200"
    >
      <Icon
        :name="modelValue >= i / 2 ? 'mdi:star' : 'mdi:star-outline'"
        class="text-xl"
        :class="[
          hover >= i / 2 ? 'text-yellow-400 scale-110' : modelValue >= i / 2 ? 'text-yellow-400' : 'text-gray-400'
        ]"
      />
    </div>

    <div
      class="absolute -bottom-8 left-0 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
    >
      {{ tooltipText }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: number }>()
const emit = defineEmits(['update:modelValue'])

const hover = ref(0)

const tooltipText = computed(() => {
  const r = hover.value || props.modelValue
  if (r <= 1) return 'Çok kötü'
  if (r <= 2) return 'Kötü'
  if (r <= 3) return 'Ortalama'
  if (r <= 4) return 'İyi'
  return 'Harika'
})
</script>

