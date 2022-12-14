import { useRouter } from "next/router";
import Seo from "../../Components/Seo";
import styles from "../../styles/Movie.module.css";
import { useState } from "react";
export default function thumbnail ({params}:{params: string[]}) {
  const router = useRouter();
  const [title, id] = params || [];
  const [click, setClick] = useState(false);

  return (
    <div className={click === true ? `${styles.wrapper} ${styles.clicked}` : styles.wrapper}>
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
              first_air_date: router.query.first_air_date,
              vote_average: router.query.vote_average,
              // genre_ids: router.query.genre_ids,
              backdrop_path: router.query.backdrop_path,
              lang: router.query.lang,
              origin_country: router.query.origin_country,
            },
          },
          `/introduction/${title}/${id}`
          )
        }, 1000)
        
      }
      } className={styles.poster} src={`https://image.tmdb.org/t/p/w500/${router.query.poster}`}></img>
    </div>
  )
}

interface Params {
  params : [
    title: string,
    id: string,
  ]
}

export function getServerSideProps({params : {params}} : {params : Params}) {
  // console.log(params);
  return {
    props: {
      params
    },
  };
}