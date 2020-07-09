import React from "react"
import { NavLink } from 'react-router-dom'
import { Container, Segment, List, ListItem } from 'semantic-ui-react'
import NavBar from "Components/NavBar"

const Home = () => {

  return (
    <div className="home-page">
      <NavBar />

      <Container className="splash">
        <h1 className="splash-head">
          Site title
        </h1>
      </Container>

      <Container className="home-page-content">
        <p>home page info</p>
      </Container>
    </div>
  )
}

export default Home
