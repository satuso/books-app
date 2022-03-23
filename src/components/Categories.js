import React from "react"
import { replacePath } from "../helpers"
import {  StyledLink } from "../theme"

const Categories = ({ books }) => {
  const list = []
  books?.map(book => book.categories?.map(category => list.push(category)))
  const categories = [...new Set(list)].sort()

  return (
    <>
      <h3>Categories</h3>
      {categories.map(category => <StyledLink to={`/categories/${replacePath(category)}`} key={category}><p>{category}</p></StyledLink>)}
    </>
  )
}

export default Categories