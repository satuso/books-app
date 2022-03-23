import React, { useContext } from "react"
import { Context } from "../context"
import { getAuth, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  border-radius: 3px;
  border: none;
  color: black;
  font-weight: bold;
  font-size: 1rem;
  margin-right: 1em;
`

const SignOut = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const { notification } = useContext(Context)
  
  const handleSignOut = () => {
    signOut(auth).then(() => {
      notification("Signed out succesfully")
      navigate("/")
    }).catch((error) => {
      notification(error.message.toString())
    })
  }
  return (
    <Button onClick={handleSignOut} aria-label="Sign Out"><FontAwesomeIcon icon={faRightFromBracket}/></Button>
  )
}
export default SignOut