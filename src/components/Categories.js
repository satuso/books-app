import React from "react"
import { Link } from "react-router-dom"
import { replacePath } from "../helpers"
import styled from "styled-components"

const CategoryLink = styled(Link)`
  color: #262626;
  text-decoration: none;
  font-weight: bold;
`

const Categories = ({ books }) => {
  const list = []
  books?.map(book => book.categories?.map(category => list.push(category)))
  const categories = [...new Set(list)].sort()

  return (
    <>{categories.map(category => <CategoryLink to={`/categories/${replacePath(category)}`} key={category}><p>{category}</p></CategoryLink>)}</>
  )
}

export default Categories