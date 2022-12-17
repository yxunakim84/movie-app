import { GetServerSideProps } from "next"
export interface popularMovies {
  id: number,
  title: string,
  poster_path: string,
  popularity: number,
  release_date: string,
  vote_average: number,
  overview: string,
  genre_ids: string,
  backdrop_path: string,
  original_language: string,
}

export async function getPopularMovies() {
  const results : Array<popularMovies>= await (await (await fetch(`http://localhost:3000/api/movies`)).json())
  // console.log('json: ', results);
  return {
    props: {
      results
    },
  }
}