import { useRuntimeConfig } from '#imports'

export const videoTmdb = () => {
  const config = useRuntimeConfig()

  const fetchVideo = async (idVideo: string) => {
    try {
      const response = await $fetch(`${config.public.apiBaseUrl}/${idVideo}`, {
        params: {
          api_key: config.public.apiKey
        }
      })
      return response
    } catch (error) {
      console.error('API error: ', error)
    }
  }

  return { fetchVideo }
}
