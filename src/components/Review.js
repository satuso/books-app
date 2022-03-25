import React, { useContext} from "react"
import { doc, deleteDoc } from "firebase/firestore"
import Rating from "./Rating"
import { db } from "../config"
import { Context } from "../context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { Gray, StyledLink, StyledButton, ReviewText } from "../theme"

const Review = ({ review }) => {
  const { user } = useContext(Context)
  const { notification } = useContext(Context)

  const username = user?.displayName

  const deleteReview = async () => {
    try {
      await deleteDoc(doc(db, "reviews", review.id))
      notification("Deleted book review")
    } catch (error) {
      notification(error.message.toString())
    }
  }

  return (
    <>
      <p><StyledLink key={review.user} to={`/users/${review.username}`}>{review.username}</StyledLink>: <Gray><Rating review={review}/> {review.date} {user && review.username === username && <StyledButton onClick={deleteReview}><FontAwesomeIcon icon={faTrash}/></StyledButton>}</Gray> <ReviewText>{review.content}</ReviewText></p>
    </>
  )
}

export default Review