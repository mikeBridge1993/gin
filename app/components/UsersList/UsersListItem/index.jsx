import React from "react"
import styles from "./styles.module.scss"
import getHighlightedText from "../../../utils/getHighlightedText"

const UsersListItem = ({
  user: { avatar_url, html_url, login },
  index,
  highlightedIndex,
  debouncedSearchTerm
}) => (
  <li data-testid="user">
    <a
      href={html_url}
      className={
        styles[index === highlightedIndex ? `user--highlighted` : `user`]
      }
    >
      {getHighlightedText(login, debouncedSearchTerm)}
      <img className={styles["user__image"]} src={avatar_url}></img>
    </a>
  </li>
)

export default UsersListItem
