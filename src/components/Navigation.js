import React, { useState } from 'react'
import Banner from '../images/thumbs/08.jpg';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  NavItem,
  NavbarToggler,
  Collapse,
  NavLink,
  Nav,
  NavbarBrand
} from 'reactstrap';


const Navigation = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
 
    <NavContainer>
    {
        localStorage.getItem('token') ? (
        <Navbar color='light' light expand='md' className='loggedin'>
          <NavbarBrand className='title' href='/'>Family Recipes Cookbook</NavbarBrand>
          <NavbarToggler onClick={() => {setIsOpen(!isOpen) }} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem className='NavItem'>
                <NavLink href='/recipes' >Recipes</NavLink>
                <NavLink href='/add-recipe' >Add Recipe</NavLink>
                <NavLink href='/logout' >Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      ) : (
        <Navbar color='light' light expand='md' className='loggedout'>
          <NavbarBrand href='/'>Family Recipes Cookbook</NavbarBrand>
          <NavbarToggler onClick={() => {setIsOpen(!isOpen) }} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem className='NavItem'>
                <NavLink href='/login' >Login</NavLink>
                <NavLink href='/register'>Register</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      )
    }
     </NavContainer>
  )
}

export default Navigation


const NavContainer = styled.div`
  height: auto;


  .loggedin, .loggedout{
    background-image: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${Banner});
    background-size: 300px;
  
    margin: 10px 0;
    border: solid black 1px;
  }
  .title{
    font-size: 2.5rem;
  }
  .NavItem {
    display: flex;
    justify-content: space-between;
    align-items: space-between;
    
  }
`

 