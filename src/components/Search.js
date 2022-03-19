import React, { useState } from "react"
import { Link } from "react-router-dom"
import AverageRating from "./AverageRating"
import SearchForm from "./SearchForm"
import styled from "styled-components"

const Wrapper = styled.div`
  text-align: center;
`

const BookLink = styled(Link)`
  color: #262626;
  text-decoration: none;
  font-weight: bold;
`

const Search = ({ books }) => {
  const [filter, setFilter] = useState("")
  const [search, setSearch] = useState("")

  const booksCopy = [...books]

  const filterByValue = (array, string) => {
    return array.filter(o => Object.keys(o).some(k => o[k].toString().toLowerCase().includes(string.toString().toLowerCase())))
  }

  const submitSearch = (e) => {
    e.preventDefault()
    setFilter(search)
    filterByValue(booksCopy, filter)
    setSearch("")
  }

  const filteredBooks = filter ? filterByValue(booksCopy, filter) : []
  
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
          <p><BookLink to={`${book.id}`}>{book.authors.map(author => author + " ")}: {book.title} <AverageRating book={book}/></BookLink></p>
        </div>
      )}
    </Wrapper>
  )
}

export default Search