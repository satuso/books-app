import React, { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import { db } from "./config"
import { collection, onSnapshot } from "firebase/firestore"

export const Context = React.createContext()

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const auth = getAuth()
    auth.onAuthStateChanged(setUser)
  }, [])

  const [users, setUsers] = useState(null)
  const [books, setBooks] = useState([])

  useEffect(() => {
    const getUsers = () => {
      onSnapshot(collection(db, "users"), res => {
        const data = res.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setUsers(data)
      })
    }
    getUsers()
  }, [])

  useEffect(() => {
    const getBooks = () => {
      onSnapshot(collection(db, "books"), res => {
        const data = res.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setBooks(data)
      })
    }
    getBooks()
  }, [])

  return (
    <Context.Provider value={{ user, users, books }}>{children}</Context.Provider>
  )
}