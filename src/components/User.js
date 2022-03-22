import React, { useContext } from "react"
import { Context } from "../context"
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore"
import { getAuth, deleteUser } from "firebase/auth"
import { db } from "../config"
import Favorite from "./Favorite"
import BookItem from "./BookItem"
import Rating from "./Rating"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { StyledLink, UserDiv, StyledButton, EditLink, Avatar, Wrapper } from "../theme"

const User = ({ user }) => {
  const auth = getAuth()
  const loggedInUser = auth.currentUser

  const { books } = useContext(Context)
  const book = books.filter(book => book.reviews.user === user.uid)
  const userReviews = book.reviews?.filter(review => review.user === user?.displayName)

  const removeUser = () => {
    const reviewObject = {
      book: {
        id: book.id,
        title: book.title,
        authors: book.authors,
        categories: book.categories
      },
      date: userReviews,
      id: book.id,
      rating: userReviews,
      review: userReviews,
      user: user.displayName
    }
    const bookFields = {
      reviews: arrayRemove(reviewObject)
    }
    const bookDoc = doc(db, "books", book.id)
    updateDoc(bookDoc, bookFields)
    deleteDoc(doc(db, "users", user.uid))
      .then(() => {
        deleteUser(loggedInUser)
        console.log("Deleted user and their reviews from books")
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <UserDiv>
      <Wrapper>
        <Avatar src={user.photoURL} alt="avatar" />
        <p><b>{user.displayName}</b></p>
        <p>{user.name}</p>
        <p>{user.dateOfBirth}</p>
      </Wrapper>
      <p>Favorites:</p>
      <ul>
        {user.favorites.length > 0 ? user.favorites.map(favorite => <li key={favorite.book.id}><StyledLink to={`/categories/${favorite.book.categories}/${favorite.book.id}`}><BookItem book={favorite.book}/></StyledLink><Favorite book={favorite.book}/></li>) : "No favorites"} 
      </ul>
      <p>Reviews:</p>
      <ul>
        {user.reviews.length > 0 ? user.reviews.map(review => <li key={review.book.id}><StyledLink to={`/categories/${review.book.categories}/${review.book.id}`}><BookItem book={review.book}/></StyledLink> <Rating review={review}/></li>) : "No reviews"}
      </ul>
      {loggedInUser && user.displayName === loggedInUser.displayName &&
      <Wrapper>
        <EditLink to="/edit-profile" aria-label="Edit profile"><FontAwesomeIcon icon={faPen} /></EditLink>
        <StyledButton onClick={removeUser} aria-label="Delete profile"><FontAwesomeIcon icon={faTrash}/></StyledButton>
      </Wrapper>
      }
    </UserDiv>
  )
}

export default User