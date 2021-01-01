import React from "react"
import styles from "./styles.module.scss"

import UsersList from "../components/UsersList"

const MainPage = () => (
  <div className={styles.main}>
    <div className={styles["main__overlay"]}></div>
    <h2 className={styles["main__title"]}>
      Github search powered by{" "}
      <span className={styles["main__brand"]}>GINETTA</span>
    </h2>
    <UsersList />
  </div>
)

export default MainPage
