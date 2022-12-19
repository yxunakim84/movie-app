import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { ModuleDetectionKind } from 'typescript';
import Seo from '../Components/Seo';
import styles from '../styles/Home.module.css';
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

export const rowVars = {
  start: {
    opacity: 0,
  },
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
  },
};

interface PopularMovies {
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

interface PopularShows {
  id: number,
  name: string,
  poster_path: string,
  overview: string,
  popularity: number,
  first_air_date: string,
  vote_average: number,
  backdrop_path: string,
  original_language: string,
  origin_country: string,
  original_name: string,
}

// {results} : {results : Results[]}
// export default function Home({results} : {results : Results[]}) {
export default function Home({popularMovies, popularShows, trendingMovies, trendingShows}: {popularMovies: PopularMovies[], popularShows: PopularShows[], trendingMovies: PopularMovies[], trendingShows: PopularShows[]}) {
  // const [movies, setMoives] = useState<MovieData[]>([]);
  // useEffect(() => {
  //   (async() => {
  //     const {results} = await (await fetch (`/api/movies`)).json();
  //     setMoives(results);
  //     console.log(movies);
  //   })();
  // }, []);
  const router = useRouter();
  const [light, setLight] = useState(true);
  
  const [index, setIndex] = useState(0);
  const increaseIndex = () => {
    if (popularMovies) {
      const total = 10;
      setIndex((prev) => (prev === total ? 0 : prev + 1));
    }
  };
  
  const decreaseIndex = () => {
    if (popularMovies) {
      const total = 0;
      setIndex((prev) => (prev === total ? 10 : prev - 1));
    }
  };

  const popularMovieFunc = (
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
        title: title,
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

  const popularShowFunc = (
    id: number,
    name: string,
    poster: string,
    overview: string,
    popularity: number,
    first_air_date: string,
    vote_average: number,
    backdrop_path: string,
    lang: string,
    origin_country: string,
    original_name: string,
  ) => {
    router.push({
      pathname: `/shows/${name}/${id}`,
      query: {
        name: name,
        poster: poster,
        overview: overview,
        popularity: popularity,
        first_air_date: first_air_date,
        vote_average: vote_average,
        backdrop_path: backdrop_path,
        lang: lang,
        origin_country: origin_country,
        original_name: original_name,
      },
    },
    `/shows/${name}/${id}`
    );
  };

  return (
    <div className={styles.main}>
      <Seo title="Movies"/>
      <div className={styles.bg}>

      <div className={styles.lightBtn}>
        <button onClick={() => {setLight(true)}} className={styles.bright}>light</button>|<button onClick={() => {setLight(false)}} className={styles.dark}>dark</button>
      </div>

      <AnimatePresence exitBeforeEnter>
        <motion.div layout
          className={styles.bgList}
        // variants={rowVars}
        // initial={{ x: 40, opacity: 0 }}
        // animate={{ x: 0, opacity: 1}}
        // exit={{ x: -40, opacity: 0 }}
          
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 0 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ duration: 0.2 }}
          key={index}
          >
          {popularMovies?.slice(index, index+1).map((movie) => (
            
            <div key={movie.id} className={styles.relative}>
                <img onClick={()=>{decreaseIndex();}} className={styles.arrowL} src='/arrowL.svg'/>
                <img onClick={()=>{increaseIndex();}} className={styles.arrowR} src='/arrowR.svg'/>
                  <motion.img
                  className={styles.motionImg}
                  key={movie.id}
                  initial="normal"
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  >
                </motion.img>
                <div className={styles.motionImgTitle}>{movie.title}</div>
              </div>
              
              )  
              )}
        </motion.div>
      </AnimatePresence>

      </div>

      <div className={styles.movieWrapper} style={light===true ? {backgroundColor: "white"} : {backgroundColor: "black"}}>
        <div className={styles.popularMovieBox}>
          <span className={styles.popularMovieTitle} style={light === true ? {color: "black"} : {color: "white"}}>현재 인기있는 영화 Top 20 🎈</span>
          <div className={styles.popularMovieWrapper}>
            {popularMovies?.map((movie) => (
              <div key={movie.id} onClick={() => {
                popularMovieFunc(
                  movie.id,
                  movie.title,
                  movie.poster_path,
                  movie.overview,
                  movie.popularity,
                  movie.release_date,
                  movie.vote_average,
                  movie.genre_ids,
                  movie.backdrop_path,
                  movie.original_language,
                )}} className={styles.popularMovie}>
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className={styles.movieImg}></img>
                  <h4 className={styles.movieTitle} style={light === true ? {color: "black"} : {color: "white"}}>{movie.title}</h4>
                
              </div>
            ))}
          </div>
        </div>

        <div className={styles.popularShowBox}>
          <span className={styles.popularMovieTitle} style={light === true ? {color: "black"} : {color: "white"}}>현재 인기있는 드라마 Top 20 💫</span>
          <div className={styles.popularMovieWrapper}>
            {popularShows?.map((show) => (
              <div key={show.id} onClick={() => {
                popularShowFunc(
                  show.id, 
                  show.name, 
                  show.poster_path,
                  show.overview,
                  show.popularity,
                  show.first_air_date,
                  show.vote_average,
                  show.backdrop_path,
                  show.original_language,
                  show.origin_country,
                  show.original_name,
                )}} className={styles.popularMovie}>
                  <img src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} className={styles.movieImg}></img>
                  <h4 className={styles.movieTitle} style={light === true ? {color: "black"} : {color: "white"}}>{show.name}</h4>
                
              </div>
            ))}
          </div>
        </div>
      

      <div className={styles.popularShowBox}>
          <span className={styles.popularMovieTitle} style={light === true ? {color: "black"} : {color: "white"}}>현재 트렌드인 영화 Top 20 💥</span>
          <div className={styles.popularMovieWrapper}>
          {trendingMovies?.map((movie) => (
              <div key={movie.id} onClick={() => {
                popularMovieFunc(
                  movie.id, 
                  movie.title, 
                  movie.poster_path,
                  movie.overview,
                  movie.popularity,
                  movie.release_date,
                  movie.vote_average,
                  movie.genre_ids,
                  movie.backdrop_path,
                  movie.original_language,
                )}} className={styles.popularMovie}>
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className={styles.movieImg}></img>
                  <h4 className={styles.movieTitle} style={light === true ? {color: "black"} : {color: "white"}}>{movie.title}</h4>
                
              </div>
            ))}
          </div>
        </div>

        <div className={styles.popularShowBox}>
          <span className={styles.popularMovieTitle} style={light === true ? {color: "black"} : {color: "white"}}>현재 트렌드인 드라마 Top 20 💖</span>
          <div className={styles.popularMovieWrapper}>
            {trendingShows?.map((show) => (
              <div key={show.id} onClick={() => {
                popularShowFunc(
                  show.id, 
                  show.name, 
                  show.poster_path,
                  show.overview,
                  show.popularity,
                  show.first_air_date,
                  show.vote_average,
                  show.backdrop_path,
                  show.original_language,
                  show.origin_country,
                  show.original_name,
                )}} className={styles.popularMovie}>
                  <img src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} className={styles.movieImg}></img>
                  <h4 className={styles.movieTitle} style={light === true ? {color: "black"} : {color: "white"}}>{show.name}</h4>
                
              </div>
            ))}
          </div>
        </div>


      {/* 데이터 전체 wrapper */}
      </div> 
    </div>
  )
}


// export async function getServerSideProps() {
//   const { results } = await (await (await fetch(`http://localhost:3000/api/movies`)).json())
//   return {
//     props: {
//       results
//     },
//   }
// }

export async function getServerSideProps() {
  let [popularMoviesRes, popularShowsRes, trendingMoviesRes, trendingShowsRes] = await Promise.all([
    fetch(`http://localhost:3000/api/movies`),
    fetch(`http://localhost:3000/api/tvShows`),
    fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=423cc5224bbd89593b1368578e4fc7fc'),
    fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=423cc5224bbd89593b1368578e4fc7fc'),
  ]);
  let [popularMovies, popularShows, trendingMovies, trendingShows] = await Promise.all([
    popularMoviesRes.json(),
    popularShowsRes.json(),
    trendingMoviesRes.json(),
    trendingShowsRes.json(),
  ])
  // console.log(popularMovies.results);
  popularMovies = popularMovies.results;
  popularShows = popularShows.results;
  trendingMovies = trendingMovies.results;
  trendingShows = trendingShows.results;
  // console.log(trendingShows);
  return {
    props: {
      popularMovies,
      popularShows,
      trendingMovies,
      trendingShows,
    },
  }
}
