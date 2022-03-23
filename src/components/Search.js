import React, { useState, useContext } from "react"
import { Context } from "../context.js"
import AverageRating from "./AverageRating"
import SearchForm from "./SearchForm"
import BookItem from "./BookItem"
import { StyledLink, Wrapper } from "../theme"

const Search = () => {
  const { books } = useContext(Context)
  const [filter, setFilter] = useState("")
  const [search, setSearch] = useState("")

  const filterByValue = (array, string) => {
    if (books){
      return array.filter(o =>
        Object.keys(o).some(k => String(o[k]).toLowerCase().includes(string.toLowerCase())))
    }
  }

  const submitSearch = (e) => {
    e.preventDefault()
    setFilter(search)
    filterByValue(books, filter)
    setSearch("")
  }

  const filteredBooks = filter ? filterByValue(books, filter) : []

  return (
    <Wrapper>
      <h2>Search Books</h2>
      <SearchForm 
        submitSearch={submitSearch}
        search={search}
        setSearch={setSearch}
      />
      {filteredBooks.map(book => 
        <div key={book.id}>
          <p><StyledLink to={`/categories/${book.categories}/${book.id}`}><BookItem book={book}/><AverageRating book={book}/></StyledLink></p>
        </div>
      )}
    </Wrapper>
  )
}

export default Search