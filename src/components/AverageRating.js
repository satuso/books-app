import React from "react"

const AverageRating = ({ book }) => {
  const getAverage = () => {
    if (book.reviews){
      const sum = book.reviews.map(review => Number(review.rating)).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      const average = sum / book.reviews.length
      const star = "⭐️"
      return star.repeat(average)
    }
  }
  return (
    <>{getAverage()}</>
  )
}
export default AverageRating