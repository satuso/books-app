import React from "react"
import styled from "styled-components"

const Color = styled.span`
  color: gold;
`

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
    <Color>{getAverage()}</Color>
  )
}
export default AverageRating