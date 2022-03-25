import React, { useState, useContext }  from "react"
import { Context } from "../context"
import { useNavigate } from "react-router-dom"
import { getAuth, reauthenticateWithCredential, EmailAuthProvider} from "firebase/auth"
import Favorite from "./Favorite"
import BookItem from "./BookItem"
import Rating from "./Rating"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { StyledLink, UserDiv, StyledButton, Avatar, Wrapper, Form, Input, Button } from "../theme"

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
        navigate(`/${user.displayName}/editprofile`)
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
      {loggedInUser && user.displayName === loggedInUser.displayName &&
      <><p>Favorites:</p><ul>
        {user.favorites.length > 0 ? user.favorites.map(favorite => <li key={favorite.id}><StyledLink to={`/books/${favorite.id}`}><BookItem book={favorite} /></StyledLink><Favorite book={favorite} /></li>) : "No favorites"}
      </ul></>}
      <p>Reviews:</p>
      <ul>
        {userReviews.length > 0 ? userReviews.map(review => <li key={review.bookId}><StyledLink to={`/books/${review.bookId}`}><BookItem book={review}/></StyledLink> <Rating review={review}/></li>) : "No reviews"}
      </ul>
      {loggedInUser && user.displayName === loggedInUser.displayName &&
      <Wrapper>
        <StyledButton onClick={() => setToggle(!toggle)} aria-label="Edit profile"><FontAwesomeIcon icon={faPen} /></StyledButton>
      </Wrapper>
      }
      {toggle &&
      <Form onSubmit={handleAuth}>
        <h2>Re-authenticate</h2>
        <p>Please provide your password before you can access settings</p>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={({target}) => setPassword(target.value)}
        /><br/>
        <Button type='submit'>Submit</Button>
      </Form>}
    </UserDiv>
  )
}

export default User