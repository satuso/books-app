import styled from "styled-components"
import { Link, NavLink } from "react-router-dom"

export const Container = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
`

export const PageWrapper = styled.section`
  margin: 1em;
  padding: 1em;
  width: 50%;
  margin: 0 auto;
  min-height: 55vh;
`
export const Notification = styled.p`
  text-align: center;
  color: teal;
  font-weight: bold;
`

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

export const HeaderLinkWrapper = styled.div`
  margin-right: 20px;
`

export const LoggedIn = styled(NavLink)`
  color: #262626;
  font-weight: bold;
  text-decoration: none;
  transition: .3s;
`

export const HomePageImage = styled.img`
  width: 100%;
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
  font-weight: bold;
  transition: .3s;

  &:hover {
    border-color: lightgray;
  }
`

export const Textarea = styled.textarea`
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
  font-weight: bold;
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
  padding: 0.7em 1.1em;
  margin: .5em 0 .5em 0;
  text-transform: uppercase;
  font-weight: bold;
  transition: .3s;

  &:hover {
    background-color: dodgerblue;
    color: white;
  }
`
export const DeleteButton = styled.button`
  cursor: pointer;
  background: tomato;
  border-radius: 10px;
  border: none;
  color: black;
  font-family: Arial, sans-serif;
  padding: 0.6em 1em;
  margin: .5em 0 .5em 0;
  text-transform: uppercase;
  font-weight: bold;
  transition: .3s;

  &:hover {
    background-color: gold;
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
export const SortButton = styled.span`
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: gray;
  font-size: .8rem;
  margin-right: 10px;
  transition: .3s;

  &:hover {
    color: dodgerblue;
  }
`

export const StyledButton = styled.span`
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: gray;
  font-size: 1.2rem;
  font-weight: bold;
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

export const Gray = styled.span`
  color: gray;
`

export const UserLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  margin: 1em;
`

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`
export const SmallAvatar = styled.img`
  width: 40px;
  height: 40px;
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

export const TextLink = styled.h3`
  cursor: pointer;
  
  &:hover {
    color: dodgerblue;
  }
`

export const ReviewDiv = styled.div`
  color: #262626;
  text-decoration: none;
  padding-left: 10px;
  margin-top: 0;
`

export const ReviewText = styled.span`
  white-space: pre-wrap;
  display: block;
  margin: 0;
  padding: 0;
`

export const FooterWrapper = styled.div`
  background-color: whitesmoke;
  width: 100%;
  margin-bottom: 0;
  bottom: 0;
`

export const FooterText = styled.p`
  text-align: center;
  margin: 0;
  padding: 4em;
  color: gray;
  font-size: .8rem;
`