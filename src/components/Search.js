import React, { useState } from "react"
import { Link } from "react-router-dom"
import AverageRating from "./AverageRating"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

const BookLink = styled(Link)`
  color: #262626;
  text-decoration: none;
  font-weight: bold;
`

const Form = styled.form`
  text-align: center;
`

const Input = styled.input`
  outline: none;
  padding: 0.5em;
  margin: 0.5em;
  color: tomato;
  background: white;
  border: 1px solid gray;
  border-radius: 3px;
  width: 300px;
`

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  color: dodgerblue;
  font-weight: bold;
  font-size: 1rem;
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
    <div>
      <Form onSubmit={submitSearch} className='form search-form'>
        <h2>Search Books</h2>
        <Input
          type='text'
          placeholder='Search'
          onFocus={(e) => e.target.placeholder = ""}
          onBlur={(e) => e.target.placeholder = "Search"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        >
        </Input>
        <Button><FontAwesomeIcon icon={faMagnifyingGlass}/></Button>
      </Form>
      {filteredBooks.map(book => 
        <div key={book.id}>
          <p><BookLink to={`${book.id}`}>{book.authors.map(author => author + " ")}: {book.title} <AverageRating book={book}/></BookLink></p>
        </div>
      )}
    </div>
  )
}

export default Search