import React, { useState, useContext }  from "react"
import { Context } from "../context"
import { useNavigate } from "react-router-dom"
import { doc, deleteDoc } from "firebase/firestore"
import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider} from "firebase/auth"
import { getStorage, ref, deleteObject } from "firebase/storage"
import { db } from "../config"
import Favorite from "./Favorite"
import BookItem from "./BookItem"
import Rating from "./Rating"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { StyledLink, UserDiv, StyledButton, EditLink, Avatar, Wrapper, Form, Input, Button } from "../theme"

const User = ({ user }) => {
  const [password, setPassword] = useState("")
  const [toggle, setToggle] = useState(false)
  
  const { notification } = useContext(Context)
  const { reviews } = useContext(Context)

  const userReviews = reviews.filter(review => review.userId === user.id)

  const navigate = useNavigate()
  const auth = getAuth()
  const loggedInUser = auth.currentUser
  
  const handleAuth = async (e) => {
    e.preventDefault()
    const credential = EmailAuthProvider.credential(
      loggedInUser.email,
      password
    )
    reauthenticateWithCredential(loggedInUser, credential)
      .then(() => {
        setToggle(false)
        removeUser()
      })
      .catch((error) => {
        notification(error.message.toString())
      })
  }

  const removeUser = () => {
    const storage = getStorage()
    const avatarRef = ref(storage, loggedInUser.uid)
    deleteObject(avatarRef)
    deleteUser(loggedInUser)
      .then(() => {
        userReviews.forEach(element => deleteDoc(doc(db, "reviews", element.id)))
        deleteDoc(doc(db, "users", user.id))
        notification("Deleted user successfully")
        navigate("/")
      })
      .catch((error) => {
        notification(error.message.toString())
      })
  }

  if (!user) return null

  return (
    <UserDiv>
      <Wrapper>
        <Avatar src={user.photoURL} alt="avatar" />
        <p><b>{user.displayName}</b></p>
        <p>{user.name}</p>
        <p>{user.dateOfBirth}</p>
        {loggedInUser && user.displayName === loggedInUser.displayName &&<p>{loggedInUser.email}</p>}
      </Wrapper>
      <p>Favorites:</p>
      <ul>
        {user.favorites.length > 0 ? user.favorites.map(favorite => <li key={favorite.id}><StyledLink to={`/categories/${favorite.categories}/${favorite.id}`}><BookItem book={favorite}/></StyledLink><Favorite book={favorite}/></li>) : "No favorites"} 
      </ul>
      <p>Reviews:</p>
      <ul>
        {userReviews.length > 0 ? userReviews.map(review => <li key={review.bookId}><StyledLink to={`/categories/${review.categories}/${review.bookId}`}><BookItem book={review}/></StyledLink> <Rating review={review}/></li>) : "No reviews"}
      </ul>
      {loggedInUser && user.displayName === loggedInUser.displayName &&
      <Wrapper>
        <EditLink to={`/${user.displayName}/edit-profile`} aria-label="Edit profile"><FontAwesomeIcon icon={faPen} /></EditLink>
        <StyledButton onClick={() => setToggle(true)} aria-label="Delete profile"><FontAwesomeIcon icon={faTrash}/></StyledButton>
      </Wrapper>
      }
      {toggle &&
      <Form onSubmit={handleAuth}>
        <h2>Delete account</h2>
        <p>Please provide your password to permanently delete your account</p>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={({target}) => setPassword(target.value)}
        /><br/>
        <Button type='submit'>Delete account</Button>
      </Form>}
    </UserDiv>
  )
}

export default User