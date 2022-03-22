import React, { useState, useContext } from "react"
import { doc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "../config"
import styled from "styled-components"
import { Context } from "../context"

const Input = styled.input`
  outline: none;
  padding: 0.5em;
  margin-bottom: 0.5em;
  color: tomato;
  background: white;
  border: 1px solid gray;
  border-radius: 3px;
  width: 300px;
`

const Button = styled.button`
  cursor: pointer;
  background: dodgerblue;
  border-radius: 3px;
  border: none;
  color: white;
  margin: 5px 0 5px 0;
  padding: 0.5em 1em;
`

const ReviewDiv = styled.div`
  color: #262626;
  text-decoration: none;
  padding-left: 10px;
  margin-top: 0;
`

const ReviewForm = ({ book }) => {
  const [newReview, setNewReview] = useState("")
  const [newRating, setNewRating] = useState(0)

  const { user } = useContext(Context)

  const convertDate = (date) => {
    const day = date.split("T")
    const time = date.slice(11, 16)
    return `${day[0]} ${time}`
  }

  const addReview = async (e) => {
    e.preventDefault()
    const bookDoc = doc(db, "books", book.id)
    const userDoc = doc(db, "users", user.uid)
    if (book.reviews?.find(review => review.user === user.displayName)){
      console.log("book has already been reviewed")
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
            authors: book.authors
          },
          id: book.id
        }
        const reviewFields = {
          reviews: arrayUnion(reviewObject)
        }
        await updateDoc(bookDoc, reviewFields)
        await updateDoc(userDoc, reviewFields)
        console.log("added book review", book.id)
      } else {
        console.log("please select rating")
      }
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