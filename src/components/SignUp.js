import React, { useState, useContext }  from "react"
import { Context } from "../context"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../config"
import { Input, Button, Form } from "../theme"
import { getStorage, ref, getDownloadURL } from "firebase/storage"

const SignUp = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { notification } = useContext(Context)

  const auth = getAuth()
  const navigate = useNavigate()

  const handleSignUp = (e) => {
    e.preventDefault()
    if (password === confirmPassword){
      const regex = /[^a-zA-Z0-9-._]/g
      if (username.match(regex)){
        notification("Usernames can contain only letters (A-Z), numbers (0-9) and symbols (- . _)")
      } else {
        const storage = getStorage()
        const storageRef = ref(storage, "blank_avatar.png")
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            getDownloadURL(storageRef).then((url) => {
              updateProfile(auth.currentUser, { 
                displayName: username,
                photoURL: url
              })
              const loggedInUser = userCredential.user
              setDoc(doc(db, "users", loggedInUser.uid), {
                displayName: username,
                photoURL: url,
                name: "",
                dateOfBirth: "",
                favorites: []
              })            
            })
            notification("Signed up successfully")
            navigate("/")
          })
          .catch((error) => {
            notification(error.message.toString())
          })
      }
    } else {
      notification("Passwords must match")
    }
  }

  return (
    <Form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      <Input
        type="username"
        placeholder="Username"
        value={username}
        onChange={({target}) => setUsername(target.value)}
        minLength={3}
        maxLength={20}
        required
      /><br/>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={({target}) => setEmail(target.value)}
        required
      /><br/>
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={({target}) => setPassword(target.value)}
        minLength={8}
        required
      /><br/>
      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={({target}) => setConfirmPassword(target.value)}
        minLength={8}
        required
      /><br/>
      <Button type='submit'>Sign Up</Button>
    </Form>
  )
}

export default SignUp