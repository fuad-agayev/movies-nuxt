import { describe, it, expect, vi } from 'vitest'
import { useTmdb } from '~/composables/useTmdb'

// Mock runtime config
vi.mock('#imports', () => ({
  useRuntimeConfig: () => ({
    public: {
      apiBaseUrl: 'https://api.example.com',
      apiKey: '123abc',
    },
  }),
}))

describe('useTmdb api a bare test', () => {
  it('calls API and returns results', async () => {
    // Mock $fetch
    // (global as any).$fetch = vi.fn().mock...
    // @ts-expect-error: mock global $fetch for test)
    global.$fetch = vi.fn().mockResolvedValue({
      results: [{ id: 1, title: 'Test Movie' }],
    })

    const { fetchMovies } = useTmdb()
    const data = await fetchMovies('movies')

    expect($fetch).toHaveBeenCalledOnce()
    expect(data).toEqual([{ id: 1, title: 'Test Movie' }])
  })
})
