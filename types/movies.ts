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
}