import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

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

const SearchForm = ({ submitSearch, search, setSearch }) => {
  return (
    <Form onSubmit={submitSearch} className='form search-form'>
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
  )
}
export default SearchForm 