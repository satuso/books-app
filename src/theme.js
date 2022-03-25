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
  &.active {
    color: teal;
  }
  &:hover {
    color: teal;
  }
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

export const EditForm = styled.form`
  text-align: left;
  background-color: whitesmoke;
  border-radius: 10px;
  padding-left: 10px;
  margin: 5px 10px 10px 5px;
`

export const Input = styled.input`
  outline: none;
  padding: 0.6em 1em;
  margin: 0px 5px 5px 0px;
  color: tomato;
  background: white;
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: .8rem;
  border: 1px solid whitesmoke;
  border-radius: 10px;
  width: 300px;
  transition: .3s;

  &:hover {
    border-color: lightgray;
  }
`

export const Textarea = styled.textarea`
  outline: none;
  padding: 0.6em 1em;
  margin-top: 5px;
  color: tomato;
  background: white;
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: .8rem;
  border: 1px solid whitesmoke;
  border-radius: 10px;
  width: 300px;
  transition: .3s;
  width: 100%;
  height: 80px;

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
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: .8rem;
  padding: 0.6em 1em;
  margin: 2px 0px 2px 0px;
  text-transform: uppercase;
  transition: .3s;

  &:hover {
    background-color: gray;
    color: white;
  }
`
export const DeleteButton = styled.button`
  cursor: pointer;
  background: tomato;
  border-radius: 10px;
  border: none;
  color: whitesmoke;
  font-family: 'Open Sans', Arial, sans-serif;
  font-size: .8rem;
  padding: 0.6em 1em;
  margin: 2px 0px 2px 0px;
  text-transform: uppercase;
  transition: .3s;

  &:hover {
    background-color: gold;
    color: black;
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
  background-color: whitesmoke;
  padding: 5px;
  border-radius: 10px;
  color: black;
  font-size: .8rem;
  margin: 10px 10px 10px 0px;
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

export const Star = styled.span`
  color: gold;
`

export const BookTitle = styled.h3`
  margin: 0;
  padding: 0;
`

export const BookText = styled.p`
  margin: 0;
  padding: 0;
  line-height: 1;
`

export const BookDiv = styled.div`
  color: #262626;
  text-decoration: none;
  display: flex;
  flex-align: center;
  justify-content: space-between;
  background-color: whitesmoke;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin: 0;
  width: 100%;
`

export const BookDivBottom = styled.div`
  color: #262626;
  text-decoration: none;
  display: flex;
  flex-align: center;
  justify-content: space-between;
  background-color: whitesmoke;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin: 0;
  width: 100%;
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
    color: teal;
  }
`

export const UserDiv = styled.div`
  color: #262626;
`

export const Gray = styled.span`
  color: gray;
  font-weight: normal;
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

export const ReviewDiv = styled.div`
  color: #262626;
  text-decoration: none;
  margin: 0;
  padding: 10px;
`

export const ReviewText = styled.span`
  font-size: .9rem;
  white-space: pre-wrap;
  display: block;
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
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