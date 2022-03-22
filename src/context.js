import React, { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import { db } from "./config"
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore"

export const Context = React.createContext()

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const auth = getAuth()
    auth.onAuthStateChanged(setUser)
  }, [])

  const [users, setUsers] = useState(null)
  const [books, setBooks] = useState([])
  const [userMatch, setUserMatch] = useState([])

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

  useEffect(() =>{
    const getUserMatch = async () => {
      if (user){
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUserMatch({...docSnap.data(), id: user.uid})
        } else {
          console.log("No such document!")
        }
      }
    }
    getUserMatch()
  }, [user])

  return (
    <Context.Provider value={{ user, users, books, userMatch }}>{children}</Context.Provider>
  )
}