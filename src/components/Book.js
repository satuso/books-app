import React, { useContext } from "react"
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

  const userReview = book.reviews?.filter(review => review.user === user?.displayName)

  const username = user?.displayName

  const deleteBook = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this book?")){
        await deleteDoc(doc(db, "books", book.id))
        const userDoc = doc(db, "users", user.uid)
        const reviewObject = {
          book: {
            id: book.id,
            title: book.title,
            authors: book.authors,
            categories: book.categories
          },
          date: userReview[0].date,
          id: book.id,
          rating: userReview[0].rating,
          review: userReview[0].review,
          user: userReview[0].user
        }
        const favoriteObject = {
          id: book.id,
          title: book.title,
          authors: book.authors,
          categories: book.categories
        }
        const fields = {
          reviews: arrayRemove(reviewObject),
          favorites: arrayRemove(favoriteObject)
        }
        await updateDoc(userDoc, fields)
        notification("Deleted book from database")
      }
    } catch (error) {
      notification(error.message.toString())
    }
  }

  if (!book) return null

  return (
    <>
      <BookDiv>
        <BookDetails>
          <h2><BookItem book={book}/></h2>
          <Average>Average rating: <AverageRating book={book}/> {book.reviews.length > 0 ? book.reviews.length + " / " : "No "} {book.reviews.length === 1 ? " review" : "reviews"}</Average>
          <p>{book.description}</p>
          <p>Published: {book.publishedDate}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Category: {book.categories?.map(category => <StyledLink to={`/categories/${replacePath(category)}`} key={category}>{category}</StyledLink>)}</p>
          <Favorite book={book}/>
          {user && book.user.displayName === username && <StyledButton onClick={deleteBook} aria-label="Delete Book"><FontAwesomeIcon icon={faTrash}/></StyledButton>}
          <h3>Reviews</h3>
          {book.reviews && book.reviews.map((review, index) => <Review key={index} review={review} book={book}/>)}
          {book.reviews.length === 0 && "No reviews"}
        </BookDetails>
        {book.image && <BookImage src={book.image} alt='book'/>}
      </BookDiv>
      {user && <AddReviewForm book={book} />}
      <GoBack/>
    </>
  )
}

export default Book