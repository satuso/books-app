import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Context } from "../context"
import AverageRating from "./AverageRating"
import BookItem from "./BookItem"
import styled from "styled-components"

const BookLink = styled(Link)`
  color: #262626;
  text-decoration: none;
  font-weight: bold;
`

const Category = ({ category }) => {
  const { books } = useContext(Context)
  const filteredBooks = books.filter(b => b.categories.includes(category))
  return (
    <>
      <h2>Books in {category}</h2>
      {filteredBooks.map(book => <BookLink key={book.id} to={`${book.id}`}><p><BookItem book={book}/> <AverageRating book={book}/></p></BookLink>)}
    </>
  )
}

export default Category