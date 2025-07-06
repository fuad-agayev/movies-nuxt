

import { useRuntimeConfig } from '#imports'
import type { TvShow, TvShowApiResponse } from '~/types/movies'

export const useTvShows = () => {
  const config = useRuntimeConfig()

  const fetchTvShows = async (endpoint: string): Promise<TvShow[]> => {
    try {
      const res = await $fetch<TvShowApiResponse>(
        `${config.public.apiBaseUrl}/tv/${endpoint}`,
        {
          params: {
            api_key: config.public.apiKey,
            language: 'en-US' // Dil parametresi ekleyebilirsiniz
          }
        }
      )
      return res.results ?? []
    } catch (error) {
      console.error('TV API error:', error)
      return [] // Hata durumunda boş dizi döndür
    }
  }

  return { fetchTvShows }
}