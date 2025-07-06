import { useRuntimeConfig } from '#imports'
import type { Video, Movie, ApiResponseVideo}  from '../types/movies'
export const videoTmdb = () => {
  const config = useRuntimeConfig()

  const fetchVideo = async (idVideo: string) => {
    try {
      const response = await $fetch<ApiResponseVideo>(`${config.public.apiBaseUrl}/${idVideo}`, {
        params: {
          api_key: config.public.apiKey
        }
      })
      return response ?? []
    } catch (error) {
      console.error('API error: ', error)
    }
  }

  return { fetchVideo }
}
