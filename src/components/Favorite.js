import React, { useContext }  from "react"
import { db } from "../config"
import { Context } from "../context.js"
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeartCirclePlus, faHeartCircleMinus } from "@fortawesome/free-solid-svg-icons"
import { FavoriteButton } from "../theme"

const Favorite = ({ book }) => {
  const { user } = useContext(Context)

  const addToFavorites = async () => {
    const userDoc = doc(db, "users", user.uid)
    const docSnap = await getDoc(userDoc)
    const userData = docSnap.data()
    if (userData.books?.includes(book.id)){
      console.log("book already in list")
    } else {
      const bookObject = {
        id: book.id,
        title: book.title,
        authors: book.authors,
        categories: book.categories
      }
      const newFields = {
        favorites: arrayUnion(bookObject)
      }
      await updateDoc(userDoc, newFields)
      console.log("added book", book.id, "to favorites")
    }
  }

  const removeFromFavorites = async () => {
    const bookObject = {
      id: book.id,
      title: book.title,
      authors: book.authors,
      categories: book.categories
    }
    const newFields = {
      favorites: arrayRemove(bookObject)
    }
    const userDoc = doc(db, "users", user.uid)
    await updateDoc(userDoc, newFields)
    console.log("removed book", book.id, "from favorites")
  }

  return (
    <>
      {user &&
      <>
        <FavoriteButton onClick={() => {
          addToFavorites()
        }} aria-label="Add to Favorites"><FontAwesomeIcon icon={faHeartCirclePlus}/></FavoriteButton>
      
        <FavoriteButton onClick={() => {
          removeFromFavorites()
        }} aria-label="Remove from Favorites"><FontAwesomeIcon icon={faHeartCircleMinus}/></FavoriteButton>
      </>
      }
    </>
  )
}

export default Favorite