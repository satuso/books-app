import React, { useContext } from "react"
import { Context } from "../context.js"
import Search from "./Search"
import Categories from "./Categories"

const Books = () => {
  const { books } = useContext(Context)
  return (
    <div>
      <Search books={books}/>
      <Categories books={books}/>
    </div>
  )
}

export default Books