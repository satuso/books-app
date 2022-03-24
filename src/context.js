import React, { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import { db } from "./config"
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore"

export const Context = React.createContext()

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const auth = getAuth()
    auth.onAuthStateChanged(setUser)
  }, [])

  const [users, setUsers] = useState(null)
  const [books, setBooks] = useState([])
  const [reviews, setReviews] = useState([])
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

  
  useEffect(() => {
    const getReviews = () => {
      onSnapshot(collection(db, "reviews"), res => {
        const data = res.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setReviews(data)
      })
    }
    getReviews()
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

  const notification = (message) => {
    return setMessage(message), 
    setTimeout(() => {
      setMessage(null)
    }, 10000)

  }

  return (
    <Context.Provider value={{ user, users, books, reviews, userMatch, message, notification }}>{children}</Context.Provider>
  )
}