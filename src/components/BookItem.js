import React from "react"

const BookItem = ({ book }) => {
  function getAuthors(arr) {
    if (arr === undefined){
      return "Unknown Author"
    }
    if (arr.length > 1){
      const result = arr.slice(0, -1).join(", ") + " and " + arr.slice(-1)
      return result
    } else {
      return arr
    }
  }
  return (
    <>{getAuthors(book.authors)}: {book.title}</>
  )
}

export default BookItem