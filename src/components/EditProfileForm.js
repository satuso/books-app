import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAuth, updateEmail, updatePassword } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../config"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
`

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
  margin: 0 0em 5px 5px;
  padding: 0.5em 1em;
`

const EditProfileForm = ({ user }) => {
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newName, setNewName] = useState("")
  const [newDateOfBirth, setNewDateOfBirth] = useState("")

  const auth = getAuth()
  const navigate = useNavigate()

  const changeEmail = async (e) => {
    e.preventDefault()
    await updateEmail(auth.currentUser, newEmail)
    console.log("updated")
    navigate("/profile")
  }

  const changePassword = async (e) => {
    e.preventDefault()
    await updatePassword(user, newPassword)
    console.log("updated")
    navigate("/profile")
  }

  const updateProfile = async () => {
    const userDoc = doc(db, "users", user.uid)
    const newFields = {
      name: newName,
      dateOfBirth: newDateOfBirth
    }
    await updateDoc(userDoc, newFields)
    navigate("/profile")
  }

  return (
    <Wrapper>
      <form onSubmit={changeEmail}>
        <h3>Change Email</h3>
        <Input
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={({target}) => setNewEmail(target.value)}
        />
        <Button type='submit'>Submit</Button>
      </form>
      <form onSubmit={changePassword}>
        <h3>Change Password</h3>
        <Input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={({target}) => setNewPassword(target.value)}
        />
        <Button type='submit'>Submit</Button>
      </form>
      <form onSubmit={(e) => {
        e.preventDefault()
        updateProfile()
      }}>
        <h3>Update Profile</h3>
        <Input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={({target}) => setNewName(target.value)}
        /><br/>
        <Input
          type="date"
          placeholder="Date of Birth"
          value={newDateOfBirth}
          onChange={({target}) => setNewDateOfBirth(target.value)}
        /><br/>
        <Button type='submit'>Submit</Button>
      </form>
    </Wrapper>
  )
}

export default EditProfileForm