<template>
  <footer
    class="bg-black/70 border-t dark:border-t-teal-100 text-netflix-light-gray py-10 mt-16"
  >
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center justify-around">
        <div class="mb-6 md:mb-0">
          <h3 class="text-sm mb-4">
            Questions? Contact us- phone: (+994) 55 700 14 02
          </h3>
          <h3 class="text-sm mb-4">
            Questions? Contact us- email: fuad0000010@gmail.com
          </h3>
          <div>
            <ul class="flex items-center gap-8">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  class="text-xs hover:underline"
                  >Twitter</a
                >
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  class="text-xs hover:underline"
                  >LinkedIn</a
                >
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  class="text-xs hover:underline"
                  >GitHub</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="mb-6 md:mb-0">
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-xs hover:underline"> Home </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/films" class="text-xs hover:underline">
                Movies
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tv-shows" class="text-xs hover:underline">
                📺 Shows
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/watchlist" class="text-xs hover:underline">
                Watchlist
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-8 text-xs text-center">
        <p>© 2024 NuFlix, Inc.</p>
      </div>
    </div>
  </footer>
</template>
