import React, { useState, useContext }  from "react"
import { Context } from "../context"
import { useNavigate } from "react-router-dom"
import { getAuth, updateEmail, updatePassword } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../config"
import { Form, Input, Button, DeleteButton } from "../theme"

const EditProfileForm = ({ user }) => {
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newName, setNewName] = useState("")
  const [newDateOfBirth, setNewDateOfBirth] = useState("")
  const [image, setImage] = useState("")

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

  const uploadImage = (e) => {
    e.preventDefault()
    try {
      const storage = getStorage()
      const storageRef = ref(storage, user.uid)
      uploadBytes(storageRef, image).then((snapshot) => {
        notification("Uploading image...")
        getDownloadURL(storageRef).then((url) => {
          const newFields = {
            photoURL: url
          }
          const userDoc = doc(db, "users", user.uid)
          updateDoc(userDoc, newFields)
          notification("Image uploaded!", snapshot.metadata.fullPath)
          navigate(`/users/${user.displayName}`)
        })
      })
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

  const updateProfile = async (e) => {
    e.preventDefault()
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

  const deleteImage = (e) => {
    e.preventDefault()
    try {
      const storage = getStorage()
      const storageRef = ref(storage, "blank_avatar.png")
      const avatarRef = ref(storage, user.uid)
      deleteObject(avatarRef).then(() => {
        notification("Image deleted!")
      }).catch((error) => {
        notification(error.message.toString())
      })
      getDownloadURL(storageRef).then((url) => {
        const newFields = {
          photoURL: url
        }
        const userDoc = doc(db, "users", user.uid)
        updateDoc(userDoc, newFields)

        navigate(`/users/${user.displayName}`)
      })
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
        />
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
        />
        <Button type='submit'>Submit</Button>
      </Form>
      <Form onSubmit={uploadImage}>
        <h3>Upload Image</h3>
        <Input
          type="file"
          onChange={({target}) => setImage(target.files[0])}
          required
        />
        <Button type='submit'>Submit</Button>
      </Form>
      <Form onSubmit={deleteImage}>
        <DeleteButton type='submit'>Delete Image</DeleteButton>
      </Form>
      <Form onSubmit={updateProfile}>
        <h3>Update Profile Details</h3>
        <Input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={({target}) => setNewName(target.value)}
        />
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