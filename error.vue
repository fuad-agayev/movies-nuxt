<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center p-6">
    <!-- Çekici araba görseli -->
    <img src="/images/drone-pana.png" alt="Drone hasn't get address flying where he is" class="w-72 mb-6" />

    <h1 class="text-4xl font-bold mb-2">Oops! {{ error.statusCode }} - Sayfa Bulunamadı</h1>
    <p class="text-lg mb-4">{{ error.message || 'İstediğiniz sayfa bulunamadı.' }}</p>

    <NuxtLink to="/" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition">
      Ana Sayfaya Dön
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number;
    message: string;
  };
}>();
</script>





