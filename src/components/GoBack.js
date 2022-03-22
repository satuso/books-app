import React from "react"
import { useNavigate } from "react-router-dom"
import { Button, Wrapper } from "../theme"

const GoBack = () => {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </Wrapper>
  )
}

export default GoBack