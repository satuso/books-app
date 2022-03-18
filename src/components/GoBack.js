import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Wrapper = styled.div`
  text-align: center;
`

const Button = styled.button`
  cursor: pointer;
  background: lightgray;
  border-radius: 3px;
  border: none;
  color: black;
  margin: 0;
  padding: 0.5em 1em;
`

const GoBack = () => {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </Wrapper>
  )
}

export default GoBack