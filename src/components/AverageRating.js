import React from "react"
import { Star } from "../theme"

const AverageRating = ({ book }) => {
  const getAverage = () => {
    if (book.reviews){
      const sum = book.reviews.map(review => Number(review.rating)).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      const average = sum / book.reviews.length
      const star = "★"
      return star.repeat(average)
    }
  }
  return (
    <Star>{getAverage()}</Star>
  )
}
export default AverageRating