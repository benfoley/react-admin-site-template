import React from "react"
import { Container } from 'semantic-ui-react'
import NavBar from "./NavBar"

const Home = () => {
  return (
    <Container>
      <NavBar />
      <h1>Home</h1>
      <p>This is the home page.</p>
    </Container>
  )
}
export default Home

