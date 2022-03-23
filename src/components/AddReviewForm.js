import React, { useState, useContext } from "react"
import { doc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "../config"
import { Context } from "../context"
import { ReviewDiv, Input, Button } from "../theme"

const ReviewForm = ({ book }) => {
  const [newReview, setNewReview] = useState("")
  const [newRating, setNewRating] = useState(0)

  const { user } = useContext(Context)
  const { notification } = useContext(Context)

  const convertDate = (date) => {
    const day = date.split("T")
    const time = date.slice(11, 16)
    return `${day[0]} ${time}`
  }

  const addReview = async (e) => {
    e.preventDefault()
    try {
      const bookDoc = doc(db, "books", book.id)
      const userDoc = doc(db, "users", user.uid)
      if (book.reviews?.find(review => review.user === user.displayName)){
        notification("You have already reviewed this book")
      } else {
        if (newRating > 0 && newRating <= 5){
          const reviewObject = {
            user: user.displayName, 
            review: newReview,
            rating: newRating,
            date: convertDate(new Date().toISOString()),
            book: {
              id: book.id,
              title: book.title,
              authors: book.authors,
              categories: book.categories
            },
            id: book.id
          }
          const reviewFields = {
            reviews: arrayUnion(reviewObject)
          }
          await updateDoc(bookDoc, reviewFields)
          await updateDoc(userDoc, reviewFields)
          notification("Added book review")
        } else {
          notification("Please select rating")
        }
      }
    } catch (error) {
      notification(error.message.toString())
    }      
  }

  return (
    <ReviewDiv>
      <form onSubmit={addReview}>
        <h3>Review Book</h3>
        <Input
          type="text"
          placeholder="Review"
          value={newReview}
          onChange={({target}) => setNewReview(target.value)}
          minLength={1}
          maxLength={100}
          required
        /><br/>
        <label htmlFor="rating">Rating: </label>
        <select 
          name="rating" 
          id="rating"  
          value={newRating} 
          onChange={({target}) => setNewRating(target.value)}
        >
          <option value="">Select Rating</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select><br/>
        <Button type='submit'>Submit</Button>
      </form>
    </ReviewDiv>
  )
}

export default ReviewForm