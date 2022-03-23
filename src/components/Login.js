import React, { useState, useContext } from "react"
import { Context } from "../context"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { Input, Button, Form } from "../theme"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { notification } = useContext(Context)

  const auth = getAuth()
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const signedInUser = userCredential.user
        notification(`${signedInUser.displayName} logged in successfully`)
        navigate("/")
      })
      .catch((error) => {
        notification(error.message.toString())
      })
  }

  return (
    <Form onSubmit={handleLogin}>
      <h2>Login</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={({target}) => setEmail(target.value)}
      /><br/>
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={({target}) => setPassword(target.value)}
      /><br/>
      <Button type='submit'>Log In</Button>
    </Form>
  )
}

export default Login