import React, { useContext } from "react"
import { Context } from "../context"
import { StyledNavLink, Navbar } from "../theme"

const Nav = () => {
  const { user } = useContext(Context)

  return (
    <Navbar>
      <StyledNavLink className={({ isActive }) => (isActive ? "active" : "inactive")} to='/books'>Books</StyledNavLink>
      {!user ?
        <>
          <StyledNavLink className={({ isActive }) => (isActive ? "active" : "inactive")} to='/login'>Login</StyledNavLink>
          <StyledNavLink className={({ isActive }) => (isActive ? "active" : "inactive")} to='/signup'>Sign Up</StyledNavLink>
        </>
        : 
        <StyledNavLink className={({ isActive }) => (isActive ? "active" : "inactive")} to='/addbook'>Add Book</StyledNavLink>
      }
      <StyledNavLink className={({ isActive }) => (isActive ? "active" : "inactive")} to='/users'>Users</StyledNavLink>
    </Navbar>
  )
}

export default Nav