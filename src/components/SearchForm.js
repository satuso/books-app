import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { Input, StyledButton, Form } from "../theme"

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
      <StyledButton aria-label="Search for books"><FontAwesomeIcon icon={faMagnifyingGlass}/></StyledButton>
    </Form>
  )
}
export default SearchForm 