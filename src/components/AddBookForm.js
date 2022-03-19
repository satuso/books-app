import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../config"
import { Context } from "../context"
import SearchForm from "./SearchForm"
import styled from "styled-components"

const Wrapper = styled.div`
  text-align: center;
`

const AddBookForm = () => {
  const [filter, setFilter] = useState("")
  const [search, setSearch] = useState("")
  const [bookMatch, setBookMatch] = useState([])

  const { user } = useContext(Context)
  const { books } = useContext(Context)

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
            console.log("no results")
          }
        })
        .catch(error=> console.log(error))
    }
  }, [filter])

  const submitSearch = (e) => {
    e.preventDefault()
    setFilter(search)
  }

  const addBook = async (index) => {
    if (books.find(book => book.isbn === bookMatch[index]?.volumeInfo.industryIdentifiers[0].identifier)){
      console.log("book already in db")
    } else {
      await addDoc(booksCollectionRef, {
        title: bookMatch[index]?.volumeInfo.title ? bookMatch[index]?.volumeInfo.title : "Untitled",
        authors: bookMatch[index]?.volumeInfo.authors ? bookMatch[index]?.volumeInfo.authors : "Unknown Author",
        description: bookMatch[index]?.volumeInfo.description ? bookMatch[index]?.volumeInfo.description : "No description",
        publishedDate: bookMatch[index]?.volumeInfo.publishedDate,
        isbn: bookMatch[index]?.volumeInfo.industryIdentifiers[0].identifier ? bookMatch[index]?.volumeInfo.industryIdentifiers[0].identifier : "No ISBN",
        image: bookMatch[0]?.volumeInfo.imageLinks?.thumbnail ? bookMatch[0]?.volumeInfo.imageLinks.thumbnail : null,
        categories: bookMatch[index]?.volumeInfo.categories ? bookMatch[index]?.volumeInfo.categories : [],
        reviews: [],
        user: {
          id: user.uid,
          displayName: user.displayName
        }
      })
      console.log("added book from google books")
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
      {bookMatch && bookMatch.map((book, index) => <p key={index}>{book.volumeInfo.authors?.map(author => author + " ")}: {book.volumeInfo.title} <button onClick={() => addBook(index)}>Add to database</button></p>)}
    </Wrapper>
  )
}

export default AddBookForm