import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import type { Movie } from '@/types/movies'
import HeroBanner from '@/components/HeroBanner.vue'

const fakeMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  name: 'Troy',
  profile_path: null,
  overview: 'A great movie',
  release_date: '2020-01-01',
  poster_path: null,
  backdrop_path: null,
  vote_average: 7.5,
  vote_count: 100,
  genre_ids: [],
  type: 'movie',
}

describe('HeroBanner', () => {
  it('renders movie title', () => {
    const wrapper = mount(HeroBanner, {
      props: { movie: fakeMovie },
    })
    expect(wrapper.text()).toContain('Test Movie')
  })

  it('renders movie overview', () => {
    const wrapper = mount(HeroBanner, {
      props: { movie: fakeMovie },
    })
    expect(wrapper.text()).toContain('A great movie')
  })

  it('displays match percentage', () => {
    const wrapper = mount(HeroBanner, {
      props: { movie: fakeMovie },
    })
    expect(wrapper.text()).toContain('75% Match')
  })

  it('displays HD badge', () => {
    const wrapper = mount(HeroBanner, {
      props: { movie: fakeMovie },
    })
    expect(wrapper.text()).toContain('HD')
  })

  it('has Play and More Info buttons', () => {
    const wrapper = mount(HeroBanner, {
      props: { movie: fakeMovie },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
    expect(buttons[0].text()).toContain('Play')
    expect(buttons[1].text()).toContain('More Info')
  })

  it('applies responsive title class', () => {
    const wrapper = mount(HeroBanner, {
      props: { movie: fakeMovie },
    })

    const title = wrapper.find('h1')
    expect(title.classes()).toContain('text-3xl')
  })

  it('opens InfoModal when More Info button is clicked', async () => {
    const wrapper = mount(HeroBanner, {
      props: { movie: fakeMovie },
      global: {
        stubs: {
          InfoModal: {
            template: '<div class="info-modal-stub">Modal!</div>',
          },
        },
      },
    })

    await wrapper.findAll('button')[1].trigger('click')

    expect(wrapper.html()).toContain('Modal!')
  })
})
