import React, { useContext } from "react"
import { Context } from "../context"
import { NavLink, Link } from "react-router-dom"
import SignOut from "./SignOut"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledLink = styled(Link)`
  font-size: 2em;
  text-align: center;
  color: #262626;
  text-transform: uppercase;
  font-family: Georgia, Times, serif;
  margin: 0;
  padding: .8em;
  font-weight: bold;
  text-decoration: none;
`

const LoggedIn = styled(NavLink)`
  color: #262626;
  font-weight: bold;
  text-decoration: none;

  &.active {
    color: tomato;
  }
`

const Header = () => {
  const { user } = useContext(Context)

  return (
    <Wrapper>
      <StyledLink className={({ isActive }) => (isActive ? "active" : "inactive")} to='/'>Books.</StyledLink>
      <div>
        {user && 
        <><LoggedIn className={({ isActive }) => (isActive ? "active" : "inactive")} to={`/users/${user.uid}`}>{user.displayName ? user.displayName : user.email}</LoggedIn> is signed in <SignOut/></>}
      </div>
    </Wrapper>
  )
}

export default Header