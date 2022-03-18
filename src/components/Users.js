import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Context } from "../context"
import styled from "styled-components"

const UserLink = styled(Link)`
  color: #262626;
  text-decoration: none;
  font-weight: bold;
`
const Users = () => {
  const { users } = useContext(Context)

  return (
    <div>
      {users && users.map(user => <UserLink key={user.id} to={`/users/${user.id}`}><p>{user.displayName}</p></UserLink>)}
    </div>
  )
}

export default Users