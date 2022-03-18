import React from "react"
import books from "../images/books.png"
import styled from "styled-components"

const Image = styled.img`
  width: 100%;
`
const Text = styled.h2`
  font-family: Georgia, Times, serif;
  text-align: center;
`

const Home = () => {
  return (
    <>
      <Image src={books}/>
      <Text>Find Books and Write Book Reviews!</Text>
    </>
  )
}

export default Home