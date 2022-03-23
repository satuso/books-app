import React, { useState, useContext } from "react"
import { Context } from "../context.js"
import AverageRating from "./AverageRating"
import SearchForm from "./SearchForm"
import BookItem from "./BookItem"
import { StyledLink, Wrapper } from "../theme"

const Search = () => {
  const [filter, setFilter] = useState("")
  const [search, setSearch] = useState("")

  const { books } = useContext(Context)

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
    <>
      <Wrapper>
        <h2>Search Books</h2>
        <SearchForm 
          submitSearch={submitSearch}
          search={search}
          setSearch={setSearch}
        />
      </Wrapper>
      {filter && <h3>Search Results</h3>}
      {(filteredBooks.length === 0 && filter) && "No results"}
      {filteredBooks.map(book => 
        <p key={book.id}><StyledLink to={`/categories/${book.categories}/${book.id}`}><BookItem book={book}/><AverageRating book={book}/></StyledLink></p>
      )}
    </>
  )
}

export default Search