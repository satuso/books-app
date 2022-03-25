import React, { useState, useContext } from "react"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../config"
import { Context } from "../context"
import { Textarea, Button } from "../theme"

const ReviewForm = ({ book, bookReviews }) => {
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
      if (bookReviews?.find(review => review.username === user.displayName)){
        notification("You have already reviewed this book")
      } else {
        if (newRating > 0 && newRating <= 5){
          await addDoc(collection(db, "reviews"), {
            username: user.displayName,
            userId: user.uid,
            content: newReview,
            rating: newRating,
            bookId: book.id,
            title: book.title,
            authors: book.authors,
            categories: book.categories,
            date: convertDate(new Date().toISOString())
          })
          notification("Added book review")
          setNewReview("")
          setNewRating(0)
        } else {
          notification("Please select rating")
        }
      }
    } catch (error) {
      notification(error.message.toString())
    }      
  }

  return (
    <form onSubmit={addReview}>
      <h3>Review Book</h3>
      <label htmlFor="rating">Rating: </label>
      <select
        name="rating" 
        id="rating"  
        value={newRating} 
        onChange={({target}) => setNewRating(target.value)}
      >
        <option value="">Select Rating</option>
        <option value={1}>1/5 ★</option>
        <option value={2}>2/5 ★★</option>
        <option value={3}>3/5 ★★★</option>
        <option value={4}>4/5 ★★★★</option>
        <option value={5}>5/5 ★★★★★</option>
      </select><br/>
      <Textarea
        type="text"
        placeholder="Review"
        value={newReview}
        onChange={({target}) => setNewReview(target.value)}
        minLength={1}
        maxLength={1000}
        required
      /><br/>
      <Button type='submit'>Submit</Button>
    </form>
  )
}

export default ReviewForm