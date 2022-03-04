import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Banner from './images/thumbs/04.jpg'
//import PrivateRoute from './components/PrivateRoute';

import { connect } from 'react-redux';

import Login from './components/Login';
import Register from './components/Register';
//import Logout from './components/Logout';


function App() {
  return (
    <AppContainer>
      <HeaderStyle>
        <h1>Family Recipes Cookbook</h1>
        <NavStyle>

          {/* {this.props.token ? null : <Link to='/login' className='navlink'>Login</Link>}
          {this.props.token ? null : <Link to='/register' className='navlink'>Register</Link>} */}
          <Link to='/login' className='navlink'>Login</Link>
          <Link to='/register' className='navlink'>Register</Link>
          <Link to='/add-recipe' className='navlink'>Add Recipe</Link>
          <Link to='/my-recipes' className='navlink'>My Recipes</Link>
          <Link to='/all-recipes' className='navlink'>All Recipes</Link>
          <Link to='/logout' className='navlink'>Logout</Link>
        </NavStyle>
      </HeaderStyle>
        <Switch>
          <Route exact path ='/register' component={Register} />
          <Route exact path ='/login' component={Login} />
        </Switch>
    </AppContainer>
  );
}

const mapStateToProps = (state) => {
  return{
    users: state.users,
    recipes: state.recipes,
    token: state.token
  }
}

export default connect(mapStateToProps, {})(App);


const AppContainer = styled.div`
  height: 100%;
  border: 1px solid black;
`
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
`