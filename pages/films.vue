

<template>
  <div class="flex space-x-4 overflow-x-auto py-4 px-2 bg-gray-900">
    <div 
     
      class="relative w-40 flex-shrink-0 rounded-lg bg-gray-800 shadow-lg overflow-hidden"
    >
      <!-- Seçili işareti -->
      <div 
       
        class="absolute top-2 left-2 bg-yellow-400 w-6 h-6 rounded-sm flex items-center justify-center text-black font-bold z-10"
      >
        ✓
      </div>

      <!-- Poster -->
      <img 
        src="" 
        alt="movie.title" 
        class="w-full h-56 object-cover rounded-t-lg"
      />

      <!-- İçerik -->
      <div class="p-3">
        <div class="flex items-center space-x-1 mb-1">
          <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09L5.5 11.18 1 7.545l6.06-.523L10 2l2.94 5.022 6.06.523-4.5 3.636 1.378 6.91z"/></svg>
          <span class="text-yellow-400 font-semibold text-sm">{{}}</span>
        </div>
        <h3 class="text-white text-sm font-semibold truncate">{{  }}</h3>

        <!-- Butonlar -->
        <button 
        
          class="mt-2 w-full bg-gray-700 text-gray-300 rounded-md py-1 text-xs flex items-center justify-center space-x-1 hover:bg-gray-600"
        >
          <svg  xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>Watchlist</span>
        </button>

        <button 
          class="mt-1 w-full bg-red-600 hover:bg-red-700 text-white rounded-md py-1 text-xs flex items-center justify-center space-x-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="none">
            <path d="M4 4l16 8-16 8z" />
          </svg>
          <span>Trailer</span>
        </button>
      </div>
    </div>
  </div>
</template>
