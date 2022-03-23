import styled from "styled-components"
import { Link, NavLink } from "react-router-dom"

export const HeaderWrapper = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const StyledHeaderLink = styled(Link)`
  font-size: 2em;
  text-align: center;
  color: #262626;
  text-transform: uppercase;
  font-family: Georgia, Times, serif;
  margin: 0;
  padding: .8em;
  font-weight: bold;
  text-decoration: none;
`

export const LoggedIn = styled(NavLink)`
  color: #262626;
  font-weight: bold;
  text-decoration: none;
  transition: .3s;
`

export const Wrapper = styled.div`
  text-align: center;
`

export const Form = styled.form`
  text-align: center;
`

export const Input = styled.input`
  outline: none;
  padding: 0.8em;
  margin-bottom: 0.5em;
  color: tomato;
  background: white;
  font-family: Arial, sans-serif;
  border: 1px solid whitesmoke;
  border-radius: 10px;
  width: 300px;
  letter-spacing: 1px;
  transition: .3s;

  &:hover {
    border-color: lightgray;
  }
`

export const Button = styled.button`
  cursor: pointer;
  background: lightgray;
  border-radius: 10px;
  border: none;
  color: black;
  font-family: Arial, sans-serif;
  padding: 0.6em 1em;
  margin: .5em 0 .5em 0;
  text-transform: uppercase;
  transition: .3s;

  &:hover {
    background-color: dodgerblue;
    color: white;
  }
`

export const FavoriteButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: tomato;
  font-size: 1.2rem;
  font-weight: bold;
  transition: .3s;

  &:hover {
    color: dodgerblue;
  }
`

export const StyledButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border-radius: 3px;
  border: none;
  color: gray;
  font-size: 1.2rem;
  margin-right: 10px;
  transition: .3s;

  &:hover {
    color: dodgerblue;
  }
`

export const EditLink = styled(Link)`
  cursor: pointer;
  background-color: transparent;
  border-radius: 3px;
  border: none;
  color: gray;
  font-size: 1.2rem;
  margin-right: 10px;

  &:hover {
    color: dodgerblue;
  }
`

export const Star = styled.span`
  color: gold;
`

export const BookDiv = styled.div`
  color: #262626;
  text-decoration: none;
  padding: 10px;
  display: flex;
  flex-align: center;
  justify-content: space-between;
  margin: 0;
`

export const BookDetails = styled.div`
  margin: 0;
  padding: 0;
`

export const Average = styled.p`
  color: gray;
  font-size: 1rem;
`

export const BookImage = styled.img`
  height: 200px;
  padding: 2em;
`

export const StyledLink = styled(Link)`
  color: #262626;
  text-decoration: none;
  font-weight: bold;
  transition: .3s;

  &:hover {
    color: dodgerblue;
  }
`

export const UserDiv = styled.div`
  color: #262626;
`

export const Small = styled.span`
  color: gray;
`

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`

export const Navbar = styled.nav`
  text-align: center;
  background-color: #eeeeee;
  margin: 0;
  padding: 10px;
`

export const StyledNavLink = styled(NavLink)`
  color: #262626;
  font-weight: bold;
  text-decoration: none;
  padding: 10px;

  &.active {
    color: tomato;
  }
  &:hover {
    color: tomato;
  }
`

export const ReviewDiv = styled.div`
  color: #262626;
  text-decoration: none;
  padding-left: 10px;
  margin-top: 0;
`
