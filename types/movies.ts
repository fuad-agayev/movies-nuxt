export interface Movie {
  id: number;
  title: string;
  name: string;
  profile_path: string | null;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  [key: string]: any
}

export interface Video {
  id: string;
  type: string;
  site: string;
  key: string;
 name: string;
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
