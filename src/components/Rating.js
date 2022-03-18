import React from "react"

const Rating = ({ review }) => {
  const getRating = (rating) => {
    const star = "⭐️"
    return star.repeat(rating)
  }

  return (
    <>{getRating(review.rating)}</>
  )
}
export default Rating