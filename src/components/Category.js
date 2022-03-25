import React, { useContext } from "react"
import { Context } from "../context"
import BookItem from "./BookItem"
import GoBack from "./GoBack"
import { StyledLink } from "../theme"

const Category = ({ category }) => {
  const { books } = useContext(Context)
  const filteredBooks = books.filter(b => b.categories.includes(category))
  return (
    <>
      <h2>Books in {category}</h2>
      {filteredBooks.map(book => <StyledLink key={book.id} to={`/books/${book.id}`}><p><BookItem book={book}/></p></StyledLink>)}
      <GoBack />
    </>
  )
}

export default Category