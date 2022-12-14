import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import Seo from '../Components/Seo';
import styles from '../styles/Home.module.css';

// const API_KEY = "423cc5224bbd89593b1368578e4fc7fc";
// interface MovieData {
//   id: number;
//   original_title: string;
//   poster_path: string;
// }
interface Results {
  id: number,
  original_title: string,
  poster_path: string,
  popularity: number,
  release_date: string,
  vote_average: number,
  overview: string,
  genre_ids: string,
  backdrop_path: string,
  original_language: string,
}
export default function Home({ results } : { results: Results[] }) {
  // const [movies, setMoives] = useState<MovieData[]>([]);
  // useEffect(() => {
  //   (async() => {
  //     const {results} = await (await fetch (`/api/movies`)).json();
  //     setMoives(results);
  //     console.log(movies);
  //   })();
  // }, []);
  // console.log('results:', results);
  const router = useRouter();
  const [light, setLight] = useState(true);
  // const onClick = (id: number, title: string) => {
  //   router.push(`/movies/${title}/${id}`);
  // }
  /*
  interface Params {
    id: number,
    title: string,
    poster: string,
    overview: string,
    popularity: number,
    release_date: string,
    vote_average: number,
    genre_ids: string,
    backdrop_path: string,
  }
  */
  const onClick = (
      id : number, 
      title : string, 
      poster : string, 
      overview : string, 
      popularity: number, 
      release_date: string, 
      vote_average: number, 
      genre_ids: string, 
      backdrop_path: string,
      original_language: string,
    ) => {
    router.push({
      pathname: `/movies/${title}/${id}`,
      query: {
        poster: poster,
        overview: overview,
        popularity: popularity,
        release_date: release_date,
        vote_average: vote_average,
        genre_ids: genre_ids,
        backdrop_path: backdrop_path,
        lang: original_language,
      },
    },
      `/movies/${title}/${id}`
    );
  };


  return (
    <div>
      <Seo title="Movies"/>
      <div className={styles.lightBtn}>
        <button onClick={() => {setLight(true)}} className={styles.bright}>light</button>|<button onClick={() => {setLight(false)}} className={styles.dark}>dark</button>
      </div>
      <div className={styles.movieWrapper} style={light===true ? {backgroundColor: "white"} : {backgroundColor: "black"}}>
        {results?.map((movie) => (
          // <div onClick={() => {onClick(movie.id, movie.original_title, movie.poster_path)}} className={styles.movie}>
          <div key={movie.id} onClick={() => {
            onClick(
              movie.id, 
              movie.original_title, 
              movie.poster_path,
              movie.overview,
              movie.popularity,
              movie.release_date,
              movie.vote_average,
              movie.genre_ids,
              movie.backdrop_path,
              movie.original_language,
            )}} className={styles.movie}>
            <h4 className={styles.movieTitle} style={light === true ? {color: "black"} : {color: "white"}}>{movie.original_title}</h4>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className={styles.movieImg}></img>
            {/* <Link href={{
              pathname: `/movies/${movie.original_title}/${movie.id}`,
              query: {
                title: movie.original_title,
              },
            }}
            as={`/movies/${movie.original_title}/${movie.id}`}
            >
            </Link> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const { results } = await (await (await fetch(`http://localhost:3000/api/movies`)).json())
  console.log('json: ', results);
  return {
    props: {
      results
    },
  }
}