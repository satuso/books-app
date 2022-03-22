import React, { useContext } from "react"
import { Link } from "react-router-dom"
import BookItem from "./BookItem"
import Rating from "./Rating"
import { Context } from "../context"
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore"
import { getAuth, deleteUser } from "firebase/auth"
import { db } from "../config"
import styled from "styled-components"
import Favorite from "./Favorite"

const UserDiv = styled.div`
  color: #262626;
  text-decoration: none;
`

const BookLink = styled(Link)`
  color: #262626;
  text-decoration: none;
  font-weight: bold;
`

const UpdateButton = styled(Link)`
  cursor: pointer;
  background: dodgerblue;
  border-radius: 3px;
  border: none;
  color: white;
  padding: 10px 15px;
  margin-right: 5px;
  font-size: .8rem;
  text-decoration: none;
  font-family: Arial, sans-serif;
`

const DeleteButton = styled.button`
  cursor: pointer;
  background: tomato;
  border-radius: 3px;
  border: none;
  color: white;
  font-size: .8rem;
  padding: 10px 15px;
  font-family: Arial, sans-serif;
`

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
        authors: book.authors
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
      <p>Username: {user.displayName}</p>
      <p>Name: {user.name}</p>
      <p>Date of Birth: {user.dateOfBirth}</p>
      <p>Favorites:</p>
      <ul>
        {user.favorites.map(book => <li key={book.id}><BookLink to={`/categories/${book.category}/${book.id}`}><BookItem book={book}/></BookLink><Favorite book={book}/></li>)} 
      </ul>
      <p>Reviews:</p>
      <ul>
        {user.reviews.map(book => <li key={book.id}><BookLink to={`/categories/${book.category}/${book.book.id}`}><BookItem book={book.book}/></BookLink> <Rating review={book}/></li>)}
      </ul>
      {loggedInUser && user.displayName === loggedInUser.displayName &&
      <>
        <UpdateButton to="/edit-profile">Edit Profile</UpdateButton>
        <DeleteButton onClick={removeUser}>Delete User</DeleteButton>
      </>
      }
    </UserDiv>
  )
}

export default User