import React, { useContext } from "react"
import { Context } from "../context"
import { StyledLink } from "../theme"

const Users = () => {
  const { users } = useContext(Context)

  return (
    <div>
      {users && users.map(user => <StyledLink key={user.id} to={`/users/${user.displayName}`}><p>{user.displayName}</p></StyledLink>)}
    </div>
  )
}

export default Users