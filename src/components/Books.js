import React, { useContext } from "react"
import { Context } from "../context.js"
import AllBooks from "./AllBooks.js"
import Categories from "./Categories"

const Books = () => {
  const { books } = useContext(Context)

  return (
    <div>
      <h3>Categories</h3>
      <Categories books={books}/>
      <br/>
      <h3>All Books</h3>
      <AllBooks />
    </div>
  )
}

export default Books