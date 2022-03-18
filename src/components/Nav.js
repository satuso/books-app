import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { Context } from "../context"
import styled from "styled-components"

const Navbar = styled.nav`
  text-align: center;
  background-color: #eeeeee;
  margin: 0;
  padding: 10px;
`

const StyledLink = styled(NavLink)`
  color: #262626;
  font-weight: bold;
  text-decoration: none;
  padding: 10px;

  &.active {
    color: tomato;
  }
`

const Nav = () => {
  const { user } = useContext(Context)

  return (
    <Navbar>
      <StyledLink className={({ isActive }) => (isActive ? "active" : "inactive")} to='/books'>Books</StyledLink>
      <StyledLink className={({ isActive }) => (isActive ? "active" : "inactive")} to='/users'>Users</StyledLink>
      {!user ?
        <>
          <StyledLink className={({ isActive }) => (isActive ? "active" : "inactive")} to='/login'>Login</StyledLink>
          <StyledLink className={({ isActive }) => (isActive ? "active" : "inactive")} to='/signup'>Sign Up</StyledLink>
        </>
        : 
        <StyledLink className={({ isActive }) => (isActive ? "active" : "inactive")} to='/addbook'>Add Book</StyledLink>
      }
    </Navbar>
  )
}

export default Nav