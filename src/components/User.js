import React, { useState }  from "react"
import { doc, deleteDoc } from "firebase/firestore"
import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider} from "firebase/auth"
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
        console.log("user reauthenticated")
        setToggle(false)
        removeUser()
      }).catch((error) => {
        console.log(error)
      })
  }

  const removeUser = () => {
    deleteUser(loggedInUser)
      .then(() => {
        deleteDoc(doc(db, "users", user.id))
        console.log("Deleted user")
      }).catch((error) => {
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
        {user.favorites.length > 0 ? user.favorites.map(favorite => <li key={favorite.id}><StyledLink to={`/categories/${favorite.categories}/${favorite.id}`}><BookItem book={favorite}/></StyledLink><Favorite book={favorite}/></li>) : "No favorites"} 
      </ul>
      <p>Reviews:</p>
      <ul>
        {user.reviews.length > 0 ? user.reviews.map(review => <li key={review.book.id}><StyledLink to={`/categories/${review.book.categories}/${review.book.id}`}><BookItem book={review.book}/></StyledLink> <Rating review={review}/></li>) : "No reviews"}
      </ul>
      {loggedInUser && user.displayName === loggedInUser.displayName &&
      <Wrapper>
        <EditLink to="/edit-profile" aria-label="Edit profile"><FontAwesomeIcon icon={faPen} /></EditLink>
        <StyledButton onClick={() => setToggle(true)} aria-label="Delete profile"><FontAwesomeIcon icon={faTrash}/></StyledButton>
      </Wrapper>
      }
      {toggle &&     
      <Form onSubmit={handleAuth}>
        <h2>Re-Authenticate</h2>
        <p>Please provide password to delete profile</p>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={({target}) => setPassword(target.value)}
        /><br/>
        <Button type='submit'>Reauthenticate</Button>
      </Form>}
    </UserDiv>
  )
}

export default User