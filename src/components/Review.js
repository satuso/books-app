import React, { useContext} from "react"
import { doc, updateDoc, arrayRemove } from "firebase/firestore"
import { Link } from "react-router-dom"
import Rating from "./Rating"
import { db } from "../config"
import { Context } from "../context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

const UserLink = styled(Link)`
  color: #262626;
  text-decoration: none;
  font-weight: bold;
`

const Small = styled.span`
  color: gray;
  font-size: .8rem;
`

const DeleteButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border-radius: 3px;
  border: none;
  color: tomato;
  font-size: .8rem;
  font-family: Arial, sans-serif;
`

const Review = ({ review, book, }) => {
  const { user } = useContext(Context)
  const userReview = book.reviews?.filter(review => review.user === user?.displayName)
  const username = user?.displayName

  const deleteReview = async () => {
    const reviewObject = {
      book: {
        id: book.id,
        title: book.title,
        authors: book.authors
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
  console.log(review.user)
  return (
    <p><UserLink key={review.user} to={`/users/${review.user}`}>{review.user}</UserLink>: {review.review} <Small><Rating review={review}/> {review.date}</Small> {user && review.user === username && <DeleteButton onClick={deleteReview}><FontAwesomeIcon icon={faCircleXmark}/></DeleteButton>}</p>
  )
}

export default Review