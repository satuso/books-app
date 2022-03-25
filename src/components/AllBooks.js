import React, { useContext, useState } from "react"
import { Context } from "../context.js"
import BookItem from "./BookItem"
import AverageRating from "./AverageRating"
import { StyledLink, SortButton, Gray } from "../theme"

const AllBooks = () => {
  const { books } = useContext(Context)
  const { reviews } = useContext(Context)

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
      <ul>
        {allBooks.map(book => <StyledLink key={book.id} to={`/books/${book.id}`}><li><BookItem book={book}/> <Gray><AverageRating bookReviews={reviews.filter(review => review.bookId === book.id)}/></Gray></li></StyledLink>)}
      </ul>
      <p>Total: {books.length} {books.length === 1 ? "book" : "books"} / {reviews.length} {reviews.length === 1 ? "review" : "reviews"}</p>
    </div>
  )
}

export default AllBooks