import React, { useContext } from "react"
import { Context } from "../context"
import { StyledLink, SmallAvatar, UserLinkWrapper } from "../theme"

const Users = () => {
  const { users } = useContext(Context)

  return (
    <>
      {users && users.map(user => <StyledLink key={user.id} to={`/users/${user.displayName}`}><UserLinkWrapper><SmallAvatar src={user.photoURL} alt={user.displayName}/>{user.displayName}</UserLinkWrapper></StyledLink>)}
    </>
  )
}

export default Users