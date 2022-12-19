import { useRouter } from "next/router";
import { useState } from "react";
import Seo from "../../Components/Seo";
import styles from "../../styles/Intro.module.css";


// export default function Detail({params}:{params: string[]}) {
export default function Detail() {
  const router = useRouter();
  // const [title, id] = params || [];
  // console.log(title, id);
  // console.log('param: ', params, typeof(params));
  // console.log(router);
  const [click, setClick] = useState(false);
  const url = `https://image.tmdb.org/t/p/original${router.query.backdrop_path}`;
  const [mouseOver, letMouseOver] = useState(false);
  // if(typeof router.query.title !== "string") {
  //   console.log("올바른 경로로 접속해주세요.");
  //   return <></>
  // }
  return(
    <div className={styles.bg} style={{backgroundImage: `url(${url})`}}>
      <div className={styles.titleAndPoster}>
      <div className={styles.title}>{router.query.title}</div>
      {/* <Seo title={router.query.title}></Seo> */}
      <div className={styles.wrapper}>
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
/*
 return (
    // <div className={click === true ? `${styles.wrapper} ${styles.clicked}` : styles.wrapper}>
    <div className={styles.bg} style={{backgroundImage: `url(${url})`}}>
      <Seo title={title}></Seo>
      <div className={styles.title}>{title}</div>
      <img onClick={() => {
        setClick(true);
        setTimeout(() => {
          router.push({
            pathname: `/introduction/${title}/${id}`,
            query: {
              title: title,
              poster: router.query.poster,
              overview: router.query.overview,
              popularity: router.query.popularity,
              release_date: router.query.release_date,
              vote_average: router.query.vote_average,
              genre_ids: router.query.genre_ids,
              backdrop_path: router.query.backdrop_path,
              lang: router.query.lang,
            },
          },
          `/introduction/${title}/${id}`
          )
        }, 1000)
        
      }
      } className={styles.poster} src={`https://image.tmdb.org/t/p/w500/${router.query.poster}`}></img>
    </div>
  );
interface Params {
  params : [
    title: string,
    id: string,
  ]
}
// export function getServerSideProps({params : {params}} : {params : Params}) {
//   // console.log(params);
//   return {
//     props: {
//       params
//     },
//   };
// }

*/