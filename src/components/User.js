import React, { useContext } from "react"
import { Context } from "../context"
import { Link } from "react-router-dom"
import BookItem from "./BookItem"
import Rating from "./Rating"
import styled from "styled-components"

const UserDiv = styled.div`
  color: #262626;
  text-decoration: none;
`

const BookLink = styled(Link)`
  color: #262626;
  text-decoration: none;
  font-weight: bold;
`

const User = () => {
  const { userMatch } = useContext(Context)

  return (
    <UserDiv>
      <p>Username: {userMatch && userMatch.displayName}</p>
      <p>Name: {userMatch && userMatch.name}</p>
      <p>Date of Birth: {userMatch && userMatch.dateOfBirth}</p>
      <p>Favorites:</p>
      <ul>
        {userMatch && userMatch.favorites && userMatch.favorites.map(book => <li key={book.id}><BookLink to={`/books/${book.id}`}><BookItem book={book}/></BookLink> ❤️</li>)} 
      </ul>
      <p>My Reviews:</p>
      <ul>
        {userMatch && userMatch.reviews && userMatch.reviews.map(book => <li key={book.id}><BookLink to={`/books/${book.id}`}><BookItem book={book}/></BookLink> <Rating review={book}/></li>)}
      </ul>
    </UserDiv>
  )
}

export default User