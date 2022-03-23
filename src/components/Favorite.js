import React, { useContext }  from "react"
import { db } from "../config"
import { Context } from "../context.js"
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeartCirclePlus, faHeartCircleMinus } from "@fortawesome/free-solid-svg-icons"
import { FavoriteButton } from "../theme"

const Favorite = ({ book }) => {
  const { user } = useContext(Context)
  const { notification } = useContext(Context)

  const addToFavorites = async () => {
    try {
      const userDoc = doc(db, "users", user.uid)
      const docSnap = await getDoc(userDoc)
      const userData = docSnap.data()
      if (userData.books?.includes(book.id)){
        notification("Book is already in favorites")
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
        notification("Added book to favorites")
      }
    } catch (error) {
      notification(error.message.toString())
    }
  }

  const removeFromFavorites = async () => {
    try {
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
      notification("Removed book from favorites")
    } catch (error) {
      notification(error.message.toString())
    }
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