import Router from "next/router";
import NavBar from "../Components/NavBar";
import Seo from "../Components/Seo";
import styles from "../styles/Show.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

interface Results {
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

export default function TVshows({ onTheAirShows, topRatedShows } : {onTheAirShows: Results[], topRatedShows: Results[]}) {
  // console.log("results", results);
  const router = useRouter();
  const [light, setLight] = useState(true);
  const showFunc = (
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
    <div className={styles.main} style={light===true ? {backgroundColor: "white"} : {backgroundColor: "black"}}>
      <Seo title="TV-shows" />
      <div className={styles.lightBtn}>
        <button onClick={() => {setLight(true)}} className={styles.bright}>light</button>|<button onClick={() => {setLight(false)}} className={styles.dark}>dark</button>
      </div>
      <div className={styles.showBox}>
        <span className={styles.onAirShowTitle} style={light === true ? {color: "black"} : {color: "white"}}>Top Rated Shows 🎠</span>
        <div className={styles.showWrapper}>
        {
          topRatedShows.map((show) => (
            <div key={show.id} className={styles.show} onClick={() => {
              showFunc(
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
                show.original_language,
              )
            }}>
              <h4 className={styles.showTitle} style={light === true ? {color: "black"} : {color: "white"}}>{show.name}</h4>
              <img className={styles.showImg} src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}></img>
            </div>
          ))
        }</div>
      </div>


      <div className={styles.showBox}>
        <span className={styles.onAirShowTitle} style={light === true ? {color: "black"} : {color: "white"}}>On The Air 🔊</span>
        <div className={styles.showWrapper}>
        {
          onTheAirShows.map((show) => (
            <div key={show.id} className={styles.show} onClick={() => {
              showFunc(
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
                show.original_language,
              )
            }}>
              <h4 className={styles.showTitle} style={light === true ? {color: "black"} : {color: "white"}}>{show.name}</h4>
              <img className={styles.showImg} src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}></img>
            </div>
          ))
        }</div>
      </div>
    </div>
  )
}


export async function getServerSideProps() {
  let [onTheAirShowsRes, topRatedShowsRes] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=423cc5224bbd89593b1368578e4fc7fc`),
    fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=423cc5224bbd89593b1368578e4fc7fc`)
  ]);
  let [onTheAirShows, topRatedShows] = await Promise.all([
    onTheAirShowsRes.json(),
    topRatedShowsRes.json(),
  ])
  onTheAirShows = onTheAirShows.results;
  topRatedShows = topRatedShows.results;
  const { results } = await (await (await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=423cc5224bbd89593b1368578e4fc7fc`)).json())
  // console.log('results', results);
  return {
    props: {
      onTheAirShows,
      topRatedShows,
    },
  }
}


// https://api.themoviedb.org/3/tv/top_rated