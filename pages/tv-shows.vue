<template>
  <div class="flex items-center justify-center w-full h-screen text-white/60">
    <h1 class="text-4xl font-bold mb-4">Welcome to My Film Page</h1>
    <p class="text-lg text-rose-500">Here you can find all your favorite films!</p>
    <h3>My film Page</h3>
    <div class="w-64 h-32 border border-white/50">
      <h2> WatchEffect </h2>
      <textarea type="text" v-model="textContent" class="w-[250px] h-[50px] text-black/50" placeholder="Typiiing"></textarea>
      <p v-if="isTyping" class>Fuad typining ... </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const textContent = ref('')
const isTyping = ref(false)
const stop = watchEffect((onIvalidate) => {
       if (textContent.value.length > 0) {
        isTyping.value = true;
        if (textContent.value.length > 10){
            stop()   //  //  10 dan artik yazsan dayanar typing .....  bu gorsenmez  YYANI WATCHEFFECT ARTIK 10 TANEDEN ARTIK reactiv olarak gormur
        }

       const showTypingStatus = setTimeout(() => {
            isTyping.value = false
       }, 2000);

       onIvalidate(() => {
         clearInterval(showTypingStatus)
       })
       }

})
useSeoMeta({
  title: 'My Tv  Films',
  description: 'Kaydedilen favori filmler tv listesi'
})
</script>
