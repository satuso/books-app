import React, { useState } from "react"
import styled from "styled-components"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../config"

const Wrapper = styled.div`
  text-align: center;
`

const Input = styled.input`
  outline: none;
  padding: 0.5em;
  margin: 0.5em;
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
  margin: 0 0em 5px 0em;
  padding: 0.5em 1em;
`

const SignUp = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const auth = getAuth()
  const navigate = useNavigate()

  const handleSignUp = (e) => {
    e.preventDefault()
    if (password === confirmPassword){
      const regex = /[^a-zA-Z0-9-._]/g
      if (username.match(regex)){
        console.log("Usernames may only contain letters (A-Z), numbers (0-9) and symbols (- . _)")
      } else {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            updateProfile(auth.currentUser, { 
              displayName: username
            })
            const loggedInUser = userCredential.user
            setDoc(doc(db, "users", loggedInUser.uid), {
              displayName: username,
              email: email,
              name: "",
              dateOfBirth: "",
              reviews: [],
              favorites: []
            })
            navigate("/")
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode, errorMessage)
          })
      }
    } else {
      console.log("passwords must match")
    }
  }

  return (
    <Wrapper>
      <form onSubmit={handleSignUp}>
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
      </form>
    </Wrapper>
  )
}

export default SignUp