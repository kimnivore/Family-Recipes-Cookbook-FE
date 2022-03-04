import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Banner from '../images/thumbs/04.jpg';

const Navigation = () => {
  return (
    <HeaderStyle>
      <h1>Secret Family Recipes Cookbook</h1>
      <NavStyle>
    {
        localStorage.getItem('token') ? (
        <div className='loggedin'>
          <Link to='/users' className='navlink'>Users</Link> 
          <Link to='/recipes' className='navlink'>Recipes</Link>
          <Link to='/add-recipe' className='navlink'>Add Recipe</Link>
          <Link to='/logout' className='navlink'>Logout</Link>
        </div>
      ) : (
        <div className='loggedout'>
          <Link to='/login' className='navlink'>Login</Link>
          <Link to='/register'  className='navlink'>Register</Link>
        </div>
      )
    }
    </NavStyle>
    </HeaderStyle>
    
  )
}

export default Navigation


    const HeaderStyle = styled.div`
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            background-image: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${Banner});
     `
    const NavStyle = styled.div`
        .navlink{
            margin: 20px;
            color: black;
            text-decoration: none;
            font-weight: bold;
        }
        .navlink:focus{
            color: gray;
            font-weight: bold;
        }
     `