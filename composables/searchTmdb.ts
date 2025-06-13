
import { useRuntimeConfig} from '#imports'

export const useSearchTmdb = () => {
      const config = useRuntimeConfig()

      const useSearch = async (type: 'movie' | 'tv' | 'multi',  query: string, page=1) => {
            try {
              const response = await $fetch(`${config.public.apiBaseUrl}/search/${type}`, {
                params: {
                  api_key: config.public.apiKey,
                  query,
                  page,
                  include_adult: false
                }
              })
              return response
      
            }
            catch(error){
                
                   console.error("Search not Found: ", error)
            }
      }

      return { useSearch }
}