import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { describe, it, expect } from 'vitest'
import NavBar from '@/components/NavBar.vue'

const routes: any = [
  { path: '/', name: 'home' },
  { path: '/films', name: 'films' },
  { path: '/tv-shows', name: 'tv-shows' },
]

describe('NuxtLink active class behavior', async () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })

  // Navigate to "/films" route
  router.push('/films')
  await router.isReady()

  const wrapper = mount(NavBar, {
    global: {
      plugins: [router],
      stubs: {
        NuxtLink: false, // Important: Don't stub NuxtLink if you want to test its behavior
        Icon: true,
      },
    },
  })

  it('applies active class to the correct link', () => {
    const links = wrapper.findAll('a')
    const filmsLink = links.find(a => a.text().includes('Movies'))
    expect(filmsLink?.classes()).toContain('font-bold')
    expect(filmsLink?.classes()).toContain('text-yellow-400')
  })
})
