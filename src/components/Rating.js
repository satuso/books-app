import React from "react"
import styled from "styled-components"

const Color = styled.span`
  color: gold;
`

const Rating = ({ review }) => {
  const getRating = (rating) => {
    const star = "★"
    return star.repeat(rating)
  }

  return (
    <Color>{getRating(review.rating)}</Color>
  )
}
export default Rating