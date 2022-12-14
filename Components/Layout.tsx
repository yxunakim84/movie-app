import { ReactNode } from "react";
import NavBar from "./NavBar";
import { useState } from "react";
import styles from "../styles/Layout.module.css";

export default function Layout({ children } : { children: ReactNode }) {
  const [light, setLight] = useState(true);
  return(
    <>
      <NavBar />
      {/* <div className={styles.lightBtn}>
        <button onClick={() => {setLight(true)}} className={styles.bright}>light</button>|<button onClick={() => {setLight(false)}} className={styles.dark}>dark</button>
      </div> */}
      <div>{children}</div>
    </>
  )
}