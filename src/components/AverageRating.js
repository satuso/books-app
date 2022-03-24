import React from "react"
import { Star } from "../theme"

const AverageRating = ({ bookReviews }) => {
  const getAverage = () => {
    if (bookReviews){
      const sum = bookReviews.map(review => Number(review.rating)).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      const average = sum / bookReviews.length
      const star = "★"
      return star.repeat(average)
    }
  }
  return (
    <Star>{getAverage()}</Star>
  )
}
export default AverageRating