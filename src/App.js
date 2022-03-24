import React, { useContext } from "react"
import { Context } from "./context"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Nav from "./components/Nav"
import Books from "./components/Books"
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
import { Container, PageWrapper, Notification } from "./theme"
import NotFoundPage from "./components/NotFoundPage"

const App = () => {
  const { books } = useContext(Context)
  const { users } = useContext(Context)
  const { user } = useContext(Context)
  const { message } = useContext(Context)

  return (
    <Container>
      <Header/>
      <Nav/>
      <PageWrapper>
        <Notification>{message ? message : ""}</Notification>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/books" element={<Books />}></Route>
          <Route path="/addbook" element={<AddBookForm />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/users" element={<Users />}></Route>
          {books.map(book => <Route key={book.id} path={`/categories/:category/${book.id}`} element={<Book book={book}/>}></Route>)}
          {books?.map(book => book.categories?.map(category => <Route key={book.id} path={`/categories/${replacePath(category)}`} element={<Category category={category}/>}></Route>))}
          {users && users.map(user => <Route key={user.id} path={`/users/${user.displayName}`} element={<User user={user}/>}></Route>)}
          {user && <Route path={`/${user.displayName}/edit-profile`} element={<EditProfileForm user={user}/>}></Route>}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageWrapper>
      <Footer/>
    </Container>
  )
}

export default App