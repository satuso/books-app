import React, { useContext } from "react"
import { Context } from "../context"
import AverageRating from "./AverageRating"
import BookItem from "./BookItem"
import { StyledLink } from "../theme"

const Category = ({ category }) => {
  const { books } = useContext(Context)
  const filteredBooks = books.filter(b => b.categories.includes(category))
  return (
    <>
      <h2>Books in {category}</h2>
      {filteredBooks.map(book => <StyledLink key={book.id} to={`${book.id}`}><p><BookItem book={book}/> <AverageRating book={book}/></p></StyledLink>)}
    </>
  )
}

export default Category