import React, { useContext, useState } from "react"
import { Context } from "../context.js"
import AllBooks from "./AllBooks.js"
import Categories from "./Categories"
import { TextLink } from "../theme"

const Books = () => {
  const [toggleAll, setToggleAll] = useState(false)
  const [toggleCategories, setToggleCategories] = useState(false)

  const { books } = useContext(Context)
  
  const showAll = () => {
    setToggleAll(!toggleAll)
  }

  const showCategories = () => {
    setToggleCategories(!toggleCategories)
  }

  return (
    <div>
      <TextLink onClick={showCategories}>Categories</TextLink>
      {toggleCategories ? <Categories books={books}/> : "Show all categories"}
      <br/>
      <TextLink onClick={showAll}>All Books</TextLink>
      {toggleAll ? <AllBooks /> : `Show ${books.length} ${books.length === 1 ? "book" : "books"} added by users in database`}
    </div>
  )
}

export default Books