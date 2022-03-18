import React, { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../config"
import styled from "styled-components"

const Input = styled.input`
  outline: none;
  padding: 0.5em;
  margin-bottom: 0.5em;
  color: tomato;
  background: white;
  border: 1px solid gray;
  border-radius: 3px;
  width: 300px;
`

const Button = styled.button`
  cursor: pointer;
  background: gray;
  border-radius: 3px;
  border: none;
  color: white;
  margin: 0 0em 5px 0em;
  padding: 0.5em 1em;
`

const AddUserForm = () => {
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newAddress, setNewAddress] = useState("")
  const [newPostalCode, setNewPostalCode] = useState("")
  const [newCity, setNewCity] = useState("")
  const usersCollectionRef = collection(db, "users")

  const addUser = async (e) => {
    e.preventDefault()
    await addDoc(usersCollectionRef, { 
      name: newName,
      email: newEmail,
      address: newAddress,
      postalCode: newPostalCode,
      city: newCity,
      loans: []
    })
  }

  return (
    <form onSubmit={addUser}>
      <h2>Add New User</h2>
      <Input
        type="text"
        placeholder="Name"
        value={newName}
        onChange={({target}) => setNewName(target.value)}
      /><br/>
      <Input
        type="email"
        placeholder="Email"
        value={newEmail}
        onChange={({target}) => setNewEmail(target.value)}
      /><br/>
      <Input
        type="text"
        placeholder="Address"
        value={newAddress}
        onChange={({target}) => setNewAddress(target.value)}
      /><br/>
      <Input
        type="number"
        placeholder="Postal Code"
        value={newPostalCode}
        onChange={({target}) => setNewPostalCode(target.value)}
      /><br/>
      <Input
        type="text"
        placeholder="City"
        value={newCity}
        onChange={({target}) => setNewCity(target.value)}
      /><br/>
      <Button type='submit'>Submit</Button>
    </form>
  )
}

export default AddUserForm