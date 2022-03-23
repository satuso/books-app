import React, { useState, useContext }  from "react"
import { Context } from "../context"
import { useNavigate } from "react-router-dom"
import { getAuth, updateEmail, updatePassword } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../config"
import { Form, Input, Button } from "../theme"

const EditProfileForm = ({ user }) => {
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newName, setNewName] = useState("")
  const [newDateOfBirth, setNewDateOfBirth] = useState("")

  const { notification } = useContext(Context)

  const auth = getAuth()
  const navigate = useNavigate()

  const changeEmail = async (e) => {
    e.preventDefault()
    try {
      await updateEmail(auth.currentUser, newEmail)
      notification("Changed email successfully")
      navigate(`/users/${user.displayName}`)
    } catch (error) {
      notification(error.message.toString())
    }
  }

  const changePassword = async (e) => {
    e.preventDefault()
    try {
      await updatePassword(user, newPassword)
      notification("Changed password successfully")
      navigate(`/users/${user.displayName}`)
    } catch (error) {
      notification(error.message.toString())
    }
  }

  const updateProfile = async () => {
    try {
      const userDoc = doc(db, "users", user.uid)
      const newFields = {
        name: newName,
        dateOfBirth: newDateOfBirth
      }
      await updateDoc(userDoc, newFields)
      notification("Updated profile successfully")
      navigate(`/users/${user.displayName}`)
    } catch (error) {
      notification(error.message.toString())
    }
  }

  return (
    <>
      <Form onSubmit={changeEmail}>
        <h3>Change Email</h3>
        <Input
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={({target}) => setNewEmail(target.value)}
          required
        /><br/>
        <Button type='submit'>Submit</Button>
      </Form>
      <Form onSubmit={changePassword}>
        <h3>Change Password</h3>
        <Input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={({target}) => setNewPassword(target.value)}
          minLength={8}
          required
        /><br/>
        <Button type='submit'>Submit</Button>
      </Form>
      <Form onSubmit={(e) => {
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
      </Form>
    </>
  )
}

export default EditProfileForm