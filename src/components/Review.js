import React, { useContext} from "react"
import { doc, updateDoc, arrayRemove } from "firebase/firestore"
import Rating from "./Rating"
import { db } from "../config"
import { Context } from "../context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { Small, StyledLink, StyledButton } from "../theme"

const Review = ({ review, book, }) => {
  const { user } = useContext(Context)
  const userReview = book.reviews?.filter(review => review.user === user?.displayName)
  const username = user?.displayName

  const deleteReview = async () => {
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
      user: user.displayName
    }
    const userFields = {
      reviews: arrayRemove(reviewObject)
    }
    const bookFields = {
      reviews: arrayRemove(reviewObject)
    }
    const userDoc = doc(db, "users", user.uid)
    const bookDoc = doc(db, "books", book.id)
    await updateDoc(userDoc, userFields)
    await updateDoc(bookDoc, bookFields)
    console.log("deleted review")
  }

  return (
    <p><StyledLink key={review.user} to={`/users/${review.user}`}>{review.user}</StyledLink>: {review.review} <Small><Rating review={review}/> {review.date} {user && review.user === username && <StyledButton onClick={deleteReview}><FontAwesomeIcon icon={faTrash}/></StyledButton>}</Small></p>
  )
}

export default Review