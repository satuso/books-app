import React, { useContext } from "react"
import { Context } from "../context"
import SignOut from "./SignOut"
import { HeaderWrapper, StyledHeaderLink, LoggedIn } from "../theme"



const Header = () => {
  const { user } = useContext(Context)

  return (
    <HeaderWrapper>
      <StyledHeaderLink className={({ isActive }) => (isActive ? "active" : "inactive")} to='/'>Books.</StyledHeaderLink>
      <div>
        {user && 
        <><LoggedIn className={({ isActive }) => (isActive ? "active" : "inactive")} to={`/users/${user.displayName}`}>{user.displayName ? user.displayName : user.email}</LoggedIn> is signed in <SignOut/></>}
      </div>
    </HeaderWrapper>
  )
}

export default Header