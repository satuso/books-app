import React, { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

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

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const auth = getAuth()
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const signedInUser = userCredential.user
        console.log(signedInUser)
        navigate("/")
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  return (
    <Wrapper>
      <form onSubmit={handleLogin}>
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
      </form>
    </Wrapper>
  )
}

export default Login