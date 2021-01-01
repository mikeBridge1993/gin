import React, { useState, useEffect, useCallback } from "react"
import UserListItem from "./UsersListItem/index"

import useDebounce from "../../utils/useDebounce"
import Keys from "../../utils/keys"

import styles from "./styles.module.scss"

const MAXIMUM_NUMBER_OF_USER_ITEMS = 5
const DEBOUNCE_DELAY_IN_MILISECONDS = 200

const boundedHighlightedIndex = (index, max) =>
  Math.max(0, Math.min(index, max - 1))

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState(null)
  const [usersData, setUsersData] = useState([])
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const debouncedSearchTerm = useDebounce(
    searchTerm || "",
    DEBOUNCE_DELAY_IN_MILISECONDS
  )

  const getUsersData = userName => {
    const fetchUrl = `${process.env.GITHUB_API}?q=${userName}&per_page=${MAXIMUM_NUMBER_OF_USER_ITEMS}`
    fetch(fetchUrl)
      .then(res => res.json())
      .then(res => {
        setHighlightedIndex(0)
        setUsersData(res.items)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleKeyDown = useCallback(
    e => {
      const maximumIndex = usersData?.length
      switch (e.key) {
        case Keys.KEY_ESCAPE:
          e.preventDefault()
          setUsersData([])
          break
        case Keys.KEY_ARROW_UP:
          e.preventDefault()
          setHighlightedIndex(
            boundedHighlightedIndex(highlightedIndex - 1, maximumIndex)
          )
          break
        case Keys.KEY_ARROW_DOWN:
          e.preventDefault()
          setHighlightedIndex(
            boundedHighlightedIndex(highlightedIndex + 1, maximumIndex)
          )
          break
        case Keys.KEY_ENTER:
        case Keys.KEY_RETURN:
        case Keys.KEY_COMMAND:
          e.preventDefault()
          if (usersData) {
            const highlightedUser = usersData[highlightedIndex]
            window.location = highlightedUser?.html_url
          }
          break
        default:
          break
      }
    },
    [highlightedIndex, debouncedSearchTerm]
  )

  useEffect(() => {
    getUsersData(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  return (
    <div className={styles["users-list"]}>
      <div className={styles["users-list__input"]} onKeyDown={handleKeyDown}>
        <input
          name="name"
          type="text"
          required
          autoComplete="off"
          placeholder="Please insert the name of the user that you are looking for"
          onChange={e => setSearchTerm(e.target.value)}
          className={styles["users-list__input-field"]}
          data-testid="search-input"
        ></input>
        <i className="fa fa-search"></i>
      </div>
      {usersData && usersData.length > 0 && (
        <div className={styles["users-list__results-wrapper"]}>
          <ul className={styles["users-list__results"]}>
            {usersData.map((user, index) => (
              <UserListItem
                key={user.login}
                user={user}
                index={index}
                highlightedIndex={highlightedIndex}
                debouncedSearchTerm={debouncedSearchTerm}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default UsersList
