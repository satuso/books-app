import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { doc, updateDoc, deleteDoc, arrayUnion, getDoc } from "firebase/firestore"
import { db } from "../config"
import { Context } from "../context.js"
import GoBack from "./GoBack"
import AddReviewForm from "./AddReviewForm"
import AverageRating from "./AverageRating"
import Rating from "./Rating"
import { replacePath } from "../helpers"
import styled from "styled-components"

const BookDiv = styled.div`
  color: #262626;
  text-decoration: none;
  padding: 10px;
  display: flex;
  flex-align: center;
  justify-content: space-between;
`

const AddButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: tomato;
  font-size: 1.2rem;
  font-weight: bold;
`

const DeleteButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border-radius: 3px;
  border: none;
  color: tomato;
  font-size: .8rem;
  padding: 10px 15px;
  font-family: Arial, sans-serif;
`

const Image = styled.img`
  height: 200px;
  padding: 2em;
`

const CategoryLink = styled(Link)`
  color: #262626;
  text-decoration: none;
  font-weight: bold;
`

const Book = ({ book }) => {
  const { user } = useContext(Context)

  const addToFavorites = async () => {
    const userDoc = doc(db, "users", user.uid)
    const docSnap = await getDoc(userDoc)
    const userData = docSnap.data()
    if (userData.books?.includes(book.id)){
      console.log("book already in list")
    } else {
      const bookObject = {
        id: book.id,
        title: book.title,
        authors: book.authors
      }
      const newFields = {
        favorites: arrayUnion(bookObject)
      }
      await updateDoc(userDoc, newFields)
      console.log("added book", book.id, " to favorites")
    }
  }

  const deleteBook = async () => {
    if (window.confirm("Are you sure you want to delete this book?")){
      await deleteDoc(doc(db, "books", book.id))
    }
  }

  const username = user?.displayName
  if (!book) return null

  return (
    <>
      <BookDiv>
        <div>
          <h2>{book.authors.map(author => author + " ")}: {book.title}</h2>
          <p>Average rating: <AverageRating book={book}/> / {book.reviews.length} {book.reviews.length === 1 ? "review" : "reviews"}</p>
          <p>{book.description}</p>
          <p>Published: {book.publishedDate}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Category: {book.categories?.map(category => <CategoryLink to={`/categories/${replacePath(category)}`} key={category}>{category}</CategoryLink>)}</p>
          {user && <AddButton onClick={addToFavorites} aria-label="Add to Favorites">❤️</AddButton>}
          {user && book.user.displayName === username && <DeleteButton onClick={deleteBook} aria-label="Delete Book">🗑</DeleteButton>}
          <h3>Reviews</h3>
          {book.reviews && book.reviews.map((review, index) => <p key={index}>{review.user}: {review.review} <Rating review={review}/> {review.date}</p>)}
        </div>
        {book.image && <Image src={book.image} alt='book'/>}
      </BookDiv>
      {user && <AddReviewForm book={book} />}
      <GoBack/>
    </>
  )
}

export default Book