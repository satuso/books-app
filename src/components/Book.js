import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { doc, updateDoc, deleteDoc, arrayRemove } from "firebase/firestore"
import { db } from "../config"
import { Context } from "../context.js"
import { replacePath } from "../helpers"
import GoBack from "./GoBack"
import AddReviewForm from "./AddReviewForm"
import AverageRating from "./AverageRating"
import Favorite from "./Favorite"
import Review from "./Review"
import BookItem from "./BookItem"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { BookDiv, BookDetails, StyledButton, Average, StyledLink, BookImage } from "../theme"

const Book = ({ book }) => {
  const { user } = useContext(Context)
  const { notification } = useContext(Context)
  const { reviews } = useContext(Context)

  const bookReviews = reviews.filter(review => review.bookId === book.id)
  const username = user?.displayName
  const navigate = useNavigate()

  const deleteBook = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this book?")){
        await deleteDoc(doc(db, "books", book.id))
        bookReviews.forEach(element => deleteDoc(doc(db, "reviews", element.id)))
        const userDoc = doc(db, "users", user.uid)
        const favoriteObject = {
          id: book.id,
          title: book.title,
          authors: book.authors,
          categories: book.categories
        }
        const fields = {
          favorites: arrayRemove(favoriteObject)
        }
        await updateDoc(userDoc, fields)
        notification("Deleted book from database")
        navigate("/")
      }
    } catch (error) {
      notification(error.message.toString())
    }
  }

  const converLink = (link) => {
    return link.replace("http", "https")
  }

  if (!book) return null

  return (
    <>
      <BookDiv>
        <BookDetails>
          <h2><BookItem book={book}/></h2>
          <Average>Average rating: <AverageRating bookReviews={bookReviews}/> {bookReviews.length > 0 ? bookReviews.length + " / " : "No "} {bookReviews.length === 1 ? " review" : "reviews"}</Average>
          <p>{book.description}</p>
          <p>Published: {book.publishedDate}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Category: {book.categories?.map(category => <StyledLink to={`/categories/${replacePath(category)}`} key={category}>{category}</StyledLink>)}</p>
          <Favorite book={book}/>
          {user && book.user.displayName === username && <StyledButton onClick={deleteBook} aria-label="Delete Book"><FontAwesomeIcon icon={faTrash}/></StyledButton>}
          <h3>Reviews</h3>
          {bookReviews.length === 0 && "No reviews"}
          {bookReviews.map((review, index) => <Review key={index} review={review} book={book}/>)}
        </BookDetails>
        {book.image && <BookImage src={converLink(book.image)} alt='book'/>}
      </BookDiv>
      {user && <AddReviewForm book={book} bookReviews={bookReviews} />}
      <GoBack/>
    </>
  )
}

export default Book