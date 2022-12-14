import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/NavBar.module.css";

export default function NavBar() {
  const router = useRouter();
  console.log(router);
  return (
    <nav className={styles.nav}>
      {/* <img src="/vercel.svg" className={styles.img}/> */}
      <div>
        <Link href="/" className={`${styles.link} ${router.pathname === "/" ? styles.active : "" }`}>
          Movies
        </Link>
        <Link href="/tvShows" className={`${styles.link} ${router.pathname === "/tvShows" ? styles.active : "" }`}>
          TV-shows
        </Link>
      </div>
    </nav>
  );
}