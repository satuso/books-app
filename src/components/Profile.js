import React, { useContext } from "react"
import styled from "styled-components"
import { Context } from "../context"
import { Link } from "react-router-dom"
import { doc, deleteDoc } from "firebase/firestore"
import { getAuth, deleteUser } from "firebase/auth"
import { db } from "../config"
import User from "./User"

const UserDiv = styled.div`
  color: #262626;
  text-decoration: none;
  padding: 10px;
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

const Profile = () => {
  const { user } = useContext(Context)

  const removeUser = () => {
    const auth = getAuth()
    const loggedInUser = auth.currentUser
    deleteDoc(doc(db, "users", user.uid))
      .then(() => {
        deleteUser(loggedInUser)
        console.log("Deleted user")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  if (!user) return null

  return (
    <UserDiv>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <User />
      <UpdateButton to="/edit-profile">Edit Profile</UpdateButton>
      <DeleteButton onClick={removeUser}>Delete User</DeleteButton>
    </UserDiv>
  )
}

export default Profile