export const useTmdb = () => {
  const config = useRuntimeConfig()

  const fetchMovies = async (endpoint: string) => {
    try {
      const res = await $fetch(`${config.public.apiBaseUrl}/${endpoint}`, {
        params: {
          api_key: config.public.apiKey
        }
      })
      return res.results
    } catch (error) {
      console.error('API error:', error)
    }
  }

  return { fetchMovies }
}
