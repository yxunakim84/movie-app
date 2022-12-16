import { useRouter } from "next/router";
import styles from "../../styles/Intro.module.css";
import Seo
 from "../../Components/Seo";
import { useState } from "react";
import { url } from "inspector";
export default function Intro() {
  const router = useRouter();
  // console.log(router);
  const [click, setClick] = useState(false);
  const url = `https://image.tmdb.org/t/p/original${router.query.backdrop_path}`;
  const [mouseOver, letMouseOver] = useState(false);
  if(typeof router.query.title !== "string") {
    console.log("올바른 경로로 접속해주세요.");
    return <></>
  }
  return(
    <div className={styles.bg} style={{backgroundImage: `url(${url})`}}>
      <div className={styles.titleAndPoster}>
      <div className={styles.title}>{router.query.title}</div>
      <div className={styles.wrapper}>
        <Seo title={router.query.title}></Seo>
        <div className={styles.posterWrap}>
          <img onMouseOver={() => {letMouseOver(true)}} onMouseOut={() => {letMouseOver(false)}} className={styles.poster} src={`https://image.tmdb.org/t/p/w500/${router.query.poster}`}>
          </img>
          {mouseOver === true ?
            <div className={styles.textBox}>
              <div>popularity</div>
              <hr/>
              <div>{router.query.popularity}</div> 
              <div className={styles.voteScore}>vote_average</div>
              <hr/>
              <div>{router.query.vote_average}</div> 
            </div>
            : ""
          }
        </div>
        <div className={styles.overviewWrap}>
          <div className={styles.release}>{router.query.release_date || router.query.first_air_date} / {router.query.lang} {router.query.origin_country !== undefined ? `/ ${router.query.origin_country}` : ""}</div>
          <br />
          <span className={styles.overview}>{router.query.overview}</span>
        </div>
      </div>
      </div>

    </div>
  )
}