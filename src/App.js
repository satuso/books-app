import React, { useContext } from "react"
import { Context } from "./context"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Nav from "./components/Nav"
import Books from "./components/Books"
import styled from "styled-components"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Book from "./components/Book"
import Search from "./components/Search"
import Home from "./components/Home"
import Footer from "./components/Footer"
import Users from "./components/Users"
import User from "./components/User"
import AddBookForm from "./components/AddBookForm"
import EditProfileForm from "./components/EditProfileForm"
import Category from "./components/Category"
import { replacePath } from "./helpers"

const Container = styled.div`
  min-height: 100vh;
`

const Wrapper = styled.section`
  margin: 1em;
  padding: 1em;
  width: 50%;
  margin: 0 auto;
  min-height: 55vh;
`

const App = () => {
  const { books } = useContext(Context)
  const { users } = useContext(Context)
  const { user } = useContext(Context)

  return (
    <Container>
      <Header/>
      <Nav/>
      <Wrapper>
        <Routes>
          <Route exact path="*" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/books" element={<Books />}></Route>
          <Route path="/addbook" element={<AddBookForm />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/users" element={<Users />}></Route>
          {books.map(book => <Route key={book.id} path={`/categories/:category/${book.id}`} element={<Book book={book}/>}></Route>)}
          {books?.map(book => book.categories?.map(category => <Route key={book.id} path={`/categories/${replacePath(category)}`} element={<Category category={category}/>}></Route>))}
          {users && users.map(user => <Route key={user.id} path={`/users/${user.id}`} element={<User user={user}/>}></Route>)}
          <Route path="/edit-profile" element={<EditProfileForm user={user}/>}></Route>
        </Routes>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default App