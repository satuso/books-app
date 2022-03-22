import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { doc, updateDoc, deleteDoc, arrayRemove } from "firebase/firestore"
import { db } from "../config"
import { Context } from "../context.js"
import GoBack from "./GoBack"
import AddReviewForm from "./AddReviewForm"
import AverageRating from "./AverageRating"
import Favorite from "./Favorite"
import { replacePath } from "../helpers"
import Review from "./Review"
import BookItem from "./BookItem"
import styled from "styled-components"

const BookDiv = styled.div`
  color: #262626;
  text-decoration: none;
  padding: 10px;
  display: flex;
  flex-align: center;
  justify-content: space-between;
  margin: 0;
`

const BookDetails = styled.div`
  margin: 0;
  padding: 0;
`

const Average = styled.p`
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
  const userReview = book.reviews?.filter(review => review.user === user?.displayName)
  const username = user?.displayName

  const deleteBook = async () => {
    if (window.confirm("Are you sure you want to delete this book?")){
      await deleteDoc(doc(db, "books", book.id))
      const userDoc = doc(db, "users", user.uid)
      
      const reviewObject = {
        book: {
          id: book.id,
          title: book.title,
          authors: book.authors,
        },
        date: userReview[0].date,
        id: book.id,
        rating: userReview[0].rating,
        review: userReview[0].review,
        user: userReview[0].user
      }
      const reviewFields = {
        reviews: arrayRemove(reviewObject)
      }
      await updateDoc(userDoc, reviewFields)

      const favoriteObject = {
        id: book.id,
        title: book.title,
        authors: book.authors
      }
      const favoriteFields = {
        favorites: arrayRemove(favoriteObject)
      }
      await updateDoc(userDoc, favoriteFields)
      console.log("deleted book", book.id, "from database and user's favorites and reviews")
    }
  }

  if (!book) return null

  return (
    <>
      <BookDiv>
        <BookDetails>
          <h2><BookItem book={book}/></h2>
          <Average>Average rating: <AverageRating book={book}/> / {book.reviews.length} {book.reviews.length === 1 ? "review" : "reviews"}</Average>
          <p>{book.description}</p>
          <p>Published: {book.publishedDate}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Category: {book.categories?.map(category => <CategoryLink to={`/categories/${replacePath(category)}`} key={category}>{category}</CategoryLink>)}</p>
          <Favorite book={book}/>
          {user && book.user.displayName === username && <DeleteButton onClick={deleteBook} aria-label="Delete Book">🗑</DeleteButton>}
          <h3>Reviews</h3>
          {book.reviews && book.reviews.map((review, index) => <Review key={index} review={review} book={book}/>)}
          {book.reviews.length === 0 && "No Reviews"}
        </BookDetails>
        {book.image && <Image src={book.image} alt='book'/>}
      </BookDiv>
      {user && <AddReviewForm book={book} />}
      <GoBack/>
    </>
  )
}

export default Book