import { videoTmdb } from './videoUrlTmdb'
import type { ApiResponseVideo, Video, Movie } from '~/types/movies'

export const useTrailers = () => {
  const { fetchVideo } = videoTmdb()

  const globalSeen = new Set<string>()

  const pickTrailers = async (
    movies: Movie[],
    perFilm = 1,
    maxFilms = 2
  ): Promise<Video[]> => {
    const tasks = movies.slice(0, maxFilms).map(async m => {
      const raw = await fetchVideo(`movie/${m.id}/videos`)
      const vids = (raw?.results ?? [])
        .filter(v => v.site === 'YouTube' && v.type === 'Trailer')
        .sort((a, b) => Number(b.official) - Number(a.official))
        .sort(
          (a: any, b: any) =>
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime()
        )

      // ▶︎ tekilleştir
      const firstUnique = vids.find(v => {
        const k = v.key ?? v.id
        if (globalSeen.has(k)) return false
        globalSeen.add(k)
        return true
      })
      if (!firstUnique) return [] // o filmden hiç benzersiz trailer kalmadıysa
      return perFilm === 1 ? firstUnique : [firstUnique]
    })

    const res = await Promise.all(tasks)
    return res.flat().filter(Boolean)
  }

  return { pickTrailers }
}
