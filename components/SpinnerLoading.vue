<template>
  <div class="spinner-ring">
    <div
      v-for="n in 24"
      :key="n"
      class="dot"
      :style="{
        transform: `rotate(${(n - 1) * 15}deg) translate(0, -8px)`,
        animationDelay: `${(n - 1) * 0.05}s`
      }"
    ></div>
  </div>
</template>

<style scoped>
.spinner-ring {
  width: 20px;
  height: 20px;
  position: relative;
  margin: auto;
}

.dot {
  width: 2.5px;
  height: 2.5px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  animation: pulseDot 1.2s linear infinite;
  filter: blur(0.5px);
}

@keyframes pulseDot {
  0%, 100% {
    background: rgba(255, 255, 255, 0.1);
  }
  40%, 60% {
    background: rgba(255, 255, 255, 0.7);
    filter: blur(0px);
  }
}
</style>



