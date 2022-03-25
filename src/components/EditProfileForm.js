import React, { useState, useContext }  from "react"
import { Context } from "../context"
import { useNavigate } from "react-router-dom"
import { getAuth, updateEmail, updatePassword, deleteUser } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "../config"
import { Input, Button, DeleteButton, EditForm, Wrapper } from "../theme"

const EditProfileForm = ({ user }) => {
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newName, setNewName] = useState("")
  const [newDateOfBirth, setNewDateOfBirth] = useState("")
  const [image, setImage] = useState("")

  const { notification } = useContext(Context)
  const { reviews } = useContext(Context)

  const userReviews = reviews.filter(review => review.userId === user.id)
  
  const auth = getAuth()
  const loggedInUser = auth.currentUser
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
      deleteObject(avatarRef)
        .then(() => {
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

  return (
    <Wrapper>
      <h3>Edit Profile</h3>
      <EditForm onSubmit={changeEmail}>
        <h4>Change Email</h4>
        <Input
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={({target}) => setNewEmail(target.value)}
          required
        />
        <Button type='submit'>Submit</Button>
      </EditForm>
      <EditForm onSubmit={changePassword}>
        <h4>Change Password</h4>
        <Input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={({target}) => setNewPassword(target.value)}
          minLength={8}
          required
        />
        <Button type='submit'>Submit</Button>
      </EditForm>
      <EditForm onSubmit={uploadImage}>
        <h4>Upload Avatar</h4>
        <Input
          type="file"
          onChange={({target}) => setImage(target.files[0])}
          required
        />
        <Button type='submit'>Submit</Button>
      </EditForm>
      <EditForm onSubmit={deleteImage}>
        <h4>Delete Avatar</h4>
        <DeleteButton type='submit'>Delete Avatar</DeleteButton>
      </EditForm>
      <EditForm onSubmit={updateProfile}>
        <h4>Update Profile Details</h4>
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
      </EditForm>
      <EditForm onSubmit={removeUser}>
        <h4>Delete account</h4>
        <p>This permanently deletes your account</p>
        <DeleteButton type='submit'>Delete Account</DeleteButton>
      </EditForm>
    </Wrapper>
  )
}

export default EditProfileForm