import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { ModuleDetectionKind } from 'typescript';
import Seo from '../Components/Seo';
import styles from '../styles/Home.module.css';
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

// const API_KEY = "423cc5224bbd89593b1368578e4fc7fc";
// interface MovieData {
//   id: number;
//   title: string;
//   poster_path: string;
// }

export const rowVars = {
  start: {
    opacity: 0,
  },
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
  },
};

interface Results {
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
  
  const [index, setIndex] = useState(0);
  const increaseIndex = () => {
    if (results) {
      const total = 10;
      setIndex((prev) => (prev === total ? 0 : prev + 1));
    }
  };
  console.log(index);
  const decreaseIndex = () => {
    if (results) {
      const total = 0;
      setIndex((prev) => (prev === total ? 10 : prev - 1));
    }
  };

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
          {results?.slice(index, index+1).map((movie) => (

              <div className={styles.relative}>
                <img onClick={()=>{decreaseIndex();}} className={styles.arrowL} src='/arrowL.svg'/>
                <img onClick={()=>{increaseIndex();}} className={styles.arrowR} src='/arrowR.svg'/>
                {/* <img className={styles.motionImg} src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}></img> */}
                <motion.img
                  // variants={rowVars}
                  className={styles.motionImg}
                  key={movie.id}
                  initial="normal"
                  // transition={{ type: "tween" }}
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  >
                </motion.img>
                <div className={styles.motionImgTitle}>{movie.title}</div>
              </div>
              
            )  
          )}
        </motion.div>
      </AnimatePresence>
      {/* </div> */}


      <div className={styles.movieWrapper} style={light===true ? {backgroundColor: "white"} : {backgroundColor: "black"}}>
        {results?.map((movie) => (
          // <div onClick={() => {onClick(movie.id, movie.title, movie.poster_path)}} className={styles.movie}>
          <div key={movie.id} onClick={() => {
            onClick(
              movie.id, 
              // movie.title, 
              movie.title, 
              movie.poster_path,
              movie.overview,
              movie.popularity,
              movie.release_date,
              movie.vote_average,
              movie.genre_ids,
              movie.backdrop_path,
              movie.original_language,
            )}} className={styles.movie}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className={styles.movieImg}></img>
              <h4 className={styles.movieTitle} style={light === true ? {color: "black"} : {color: "white"}}>{movie.title}</h4>
            {/* <Link href={{
              pathname: `/movies/${movie.title}/${movie.id}`,
              query: {
                title: movie.title,
              },
            }}
            as={`/movies/${movie.title}/${movie.id}`}
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