import React, { useState, useContext } from "react"
import { Context } from "../context.js"
import { Link } from "react-router-dom"
import AverageRating from "./AverageRating"
import SearchForm from "./SearchForm"
import BookItem from "./BookItem"
import styled from "styled-components"

const Wrapper = styled.div`
  text-align: center;
`

const BookLink = styled(Link)`
  color: #262626;
  text-decoration: none;
  font-weight: bold;
`

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
          <p><BookLink to={`/categories/${book.categories}/${book.id}`}><BookItem book={book}/><AverageRating book={book}/></BookLink></p>
        </div>
      )}
    </Wrapper>
  )
}

export default Search