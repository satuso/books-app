import React from "react"
import books from "../images/books.png"
import { Wrapper, HomePageImage } from "../theme"

const Home = () => {
  return (
    <Wrapper>
      <HomePageImage src={books}/>
      <h2>Find Books and Write Book Reviews!</h2>
    </Wrapper>
  )
}

export default Home