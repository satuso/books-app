import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  background-color: whitesmoke;
  width: 100%;
  margin-bottom: 0;
  bottom: 0;
`

const Text = styled.p`
  text-align: center;
  margin: 0;
  padding: 4em;
  color: gray;
  font-size: .8rem;
`

const Footer = () => {
  return (
    <Wrapper>
      <Text>&copy; Books App 2022</Text>
    </Wrapper>
  )
}

export default Footer