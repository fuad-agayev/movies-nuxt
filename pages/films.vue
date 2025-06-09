<template>
  <div class="flex items-center justify-center w-full h-screen text-green-600 bg-[#aaa]">
    <h1 class="text-4xl font-bold mb-4">Welcome to My Film Page</h1>
    <p class="text-lg text-rose-500">Here you can find all your favorite films!</p>
    <h3>My film Page Baku</h3>
    <p>Orijinal Rakam: {{ rakam }}</p>
  <p>İki Katı (Computed): {{ rakamIkiKati }}</p> <!-- 2 -->
  <button @click="rakam++">+1 Artır</button> <!-- rakam değişirse rakamIkiKati otomatik güncellenir -->
  <button @click="toggleTimer">
  {{ isTimerActive ? 'Durdur' : 'Başlat' }}
</button>
<p>Sayaç: {{ counter }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';

const rakam = ref(1); // Reactive değişken

// computed: rakam'ın 2 katını otomatik hesaplar (bağımlılık izler)
const rakamIkiKati = computed(() => rakam.value * 2);


const isTimerActive = ref(false); // Timer aktif mi?
const counter = ref(0); // Sayac değeri
let timerId:any = null; // Timer ID'si

// isTimerActive değiştiğinde timer'ı başlat/durdur
watch(isTimerActive, (newVal) => {
  if (newVal) {
    // Timer başlat
    timerId = setInterval(() => {
      counter.value++;
    }, 1000);
  } else {
    // Timer'ı temizle
    clearInterval(timerId);
    timerId = null;
  }
});

// Kullanım:
const toggleTimer = () => {
  isTimerActive.value = !isTimerActive.value;
};
</script>

