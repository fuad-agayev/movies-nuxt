export interface Movie {
  id: number
  title: string
  name: string
  profile_path: string | null
  overview: string
  release_date: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  genre_ids: number[]
  [key: string]: any
  type: 'movie' | 'tv'
}

export interface TvShow {
  id: number
  name: string              // Dizinin adı
  original_name?: string    // Orijinal adı (isteğe bağlı)
  overview: string
  first_air_date: string    // İlk yayın tarihi
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  genre_ids: number[]
  [key: string]: any
  type: 'tv'
}

export interface Video {
  id: string
  type: string
  site: string
  key: string
  name: string
  official?: boolean
  published_at?: string
}

export interface ApiResponseList<T> {
  results: T[]
  page?: number
  total_results?: number
  total_pages?: number
}

export interface ApiResponseVideo {
  id: number
  results: Video[]
}
export interface TvShowApiResponse {
  page: number
  results: TvShow[]
  total_pages: number
  total_results: number
}

export interface Props {
  title: string
  movies: Movie[]
}

export interface CarouselBreakpoints {
  [key: number]: {
    itemsToShow: number
    snapAlign: 'start' | 'center' | 'end'
  }
}


export interface SearchResult {
  id: number
  media_type: string
  title?: string
  name?: string
  poster_path?: string
  profile_path?: string
  vote_average?: number
}
 
export type FilterOption = {
  key: string,
  label: string,
  icon: string
}

export interface TmdbItem {
  id: number
  title?: string
  name?: string
  media_type: string
  poster_path?: string
  profile_path?: string
  vote_average?: number
  onWatchlist?: boolean
  release_date: string
  overview: string
}