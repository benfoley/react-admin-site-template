import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const NavBar = () => {
  return (
    <Menu className="fixed">
      <a href="https://firstlanguages.org.au"><img alt="First Languages Australia logo" src="/fla-logo-hoz.png" className="logo fla-logo" /></a>
      <Menu.Item as={NavLink} exact to="/" name="about" />
      <Menu.Item as={NavLink} to="/entries" name="entries" />
    </Menu>
  )
}

export default NavBar
