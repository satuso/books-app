import React, { useContext, useState } from "react"
import { Context } from "../context.js"
import BookItem from "./BookItem"
import { StyledLink, SortButton } from "../theme"

const AllBooks = () => {
  const { books } = useContext(Context)

  const [allBooks, setAllBooks] = useState(books)
  const [toggle, setToggle] = useState(false)

  let booksCopy = [...books]

  const unsort = () => {
    booksCopy = [...books]
    return setAllBooks(booksCopy)
  }

  const sortByAuthor = () => {
    setToggle(!toggle)
    if (toggle){
      booksCopy.sort((a, b) => a.authors[0].localeCompare(b.authors[0]))
      return setAllBooks(booksCopy)
    } else {
      booksCopy.sort((a, b) => b.authors[0].localeCompare(a.authors[0]))
      return setAllBooks(booksCopy)
    }
  }

  const sortByTitle = () => {
    setToggle(!toggle)
    if (toggle){
      booksCopy.sort((a, b) => a.title.localeCompare(b.title))
      return setAllBooks(booksCopy)
    } else {
      booksCopy.sort((a, b) => b.title.localeCompare(a.title))
      return setAllBooks(booksCopy)
    }
  }

  const sortByYear = () => {
    setToggle(!toggle)
    if (toggle){
      booksCopy.sort((a, b) => a.publishedDate.localeCompare(b.publishedDate))
      return setAllBooks(booksCopy)
    } else {
      booksCopy.sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
      return setAllBooks(booksCopy)
    }
  }

  return (
    <div>
      <SortButton onClick={sortByAuthor}>Sort by Author</SortButton>
      <SortButton onClick={sortByTitle}>Sort by Title</SortButton>
      <SortButton onClick={sortByYear}>Sort by Year</SortButton>
      <SortButton onClick={unsort}>Unsort</SortButton>
      {allBooks.map(book => <StyledLink key={book.id} to={`/books/${book.id}`}><p><BookItem book={book}/></p></StyledLink>)}
    </div>
  )
}

export default AllBooks