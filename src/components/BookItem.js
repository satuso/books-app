import React from "react"

const BookItem = ({ book }) => {
  return (
    <>{book.authors?.map(author => author + " ")}: {book.title}</>
  )
}

export default BookItem