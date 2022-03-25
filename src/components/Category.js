import React, { useContext } from "react"
import { Context } from "../context"
import BookItem from "./BookItem"
import AverageRating from "./AverageRating"
import GoBack from "./GoBack"
import { StyledLink, Gray } from "../theme"

const Category = ({ category }) => {
  const { books } = useContext(Context)
  const { reviews } = useContext(Context)
  
  const filteredBooks = books.filter(b => b.categories.includes(category))
  return (
    <>
      <h2>Books in {category}</h2>
      <ul>
        {filteredBooks.map(book => <StyledLink key={book.id} to={`/books/${book.id}`}><li><BookItem book={book}/> <Gray><AverageRating bookReviews={reviews.filter(review => review.bookId === book.id)}/></Gray></li></StyledLink>)}
      </ul>
      <GoBack />
    </>
  )
}

export default Category