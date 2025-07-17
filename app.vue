<template>
  <div
    class="text-white dark:text-netflix-black bg-netflix-black dark:bg-white min-h-screen page"
  >
    <NuxtLayout>
      <NuxtPage />
      <div id="teleModal"></div>
    </NuxtLayout>
  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  /* @apply antialiased text-white dark:text-netflix-black bg-netflix-black dark:bg-white;*/
  margin: 0;
  padding: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
