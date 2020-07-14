import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const NavBar = () => {
  return (
    <Menu>
      <Menu.Item as={NavLink} exact to="/" name="home" />
      <Menu.Item as={NavLink} to="/pages" name="pages" />
    </Menu>
  )
}

export default NavBar
