import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../config"
import { Context } from "../context"
import SearchForm from "./SearchForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { StyledButton, Wrapper } from "../theme"

const AddBookForm = () => {
  const [filter, setFilter] = useState("")
  const [search, setSearch] = useState("")
  const [bookMatch, setBookMatch] = useState([])

  const { user } = useContext(Context)
  const { books } = useContext(Context)
  const { notification } = useContext(Context)

  const booksCollectionRef = collection(db, "books")

  const API_KEY = process.env.REACT_APP_BOOKS_API_KEY

  useEffect(() => {
    if (filter){
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${filter}&key=${API_KEY}`)
        .then(res => {
          if (res.status === 200){
            setBookMatch(res.data.items.map(book => book))
          } else {
            notification("No results", 10)
          }
        })
        .catch(error =>
          notification(error.message.toString(), 10)
        )
    }
  }, [filter])

  const submitSearch = (e) => {
    e.preventDefault()
    setFilter(search)
  }

  const addBook = async (index) => {
    try {
      if (books.find(book => book.isbn === bookMatch[index]?.volumeInfo.industryIdentifiers[0].identifier)){
        notification("Book is already in database", 10)
      } else {
        await addDoc(booksCollectionRef, {
          title: bookMatch[index]?.volumeInfo.title ? bookMatch[index]?.volumeInfo.title : "Untitled",
          authors: bookMatch[index]?.volumeInfo.authors ? bookMatch[index]?.volumeInfo.authors : ["Unknown Author"],
          description: bookMatch[index]?.volumeInfo.description ? bookMatch[index]?.volumeInfo.description : "No description",
          publishedDate: bookMatch[index]?.volumeInfo.publishedDate,
          isbn: bookMatch[index]?.volumeInfo.industryIdentifiers[0].identifier ? bookMatch[index]?.volumeInfo.industryIdentifiers[0].identifier : "No ISBN",
          image: bookMatch[0]?.volumeInfo.imageLinks?.thumbnail ? bookMatch[0]?.volumeInfo.imageLinks.thumbnail : null,
          categories: bookMatch[index]?.volumeInfo.categories ? bookMatch[index]?.volumeInfo.categories : ["Uncategorized"],
          reviews: [],
          user: {
            id: user.uid,
            displayName: user.displayName
          }
        })
        notification("Added book to database", 10)
      }
    } catch (error) {
      notification(error.message.toString())
    }
  }

  function getAuthors(arr) {
    if (arr === undefined){
      return "Unknown Author"
    }
    if (arr.length > 1){
      const result = arr.slice(0, -1).join(", ") + " and " + arr.slice(-1)
      return result
    } else {
      return arr
    }
  }

  return (
    <Wrapper>
      <h2>Search Google Books</h2>
      <SearchForm 
        submitSearch={submitSearch}
        search={search}
        setSearch={setSearch}
      />
      {bookMatch && bookMatch.map((book, index) => <p key={index}>{getAuthors(book.volumeInfo.authors)}: {book.volumeInfo.title} <StyledButton onClick={() => addBook(index)} aria-label="Add to database"><FontAwesomeIcon icon={faCirclePlus}/></StyledButton></p>)}
    </Wrapper>
  )
}

export default AddBookForm