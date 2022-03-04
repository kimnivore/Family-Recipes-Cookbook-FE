import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import styled from 'styled-components';
// import PrivateRoute from './utils/PrivateRoute';

import { connect } from 'react-redux';

import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Recipes from './components/Recipes';
import RecipeCard from './components/RecipeCard';
import Users from './components/Users';
import UserRecipes from './components/UserRecipes';


function App() {
  return (
    <AppContainer>
  
        <Navigation />
    
        <Switch>
          <Route path='/users/:user_id' component={UserRecipes} />
          <Route path='/users' component={Users} />
          <Route path='/recipes/:id' component={RecipeCard} />
          <Route path='/recipes' component={Recipes} />
          <Route path='/logout' component={Logout} />
          <Route path='/register' component={Register} /> 
          <Route path='/login' component={Login} />
          <Route path='/'>{localStorage.getItem('token') ? (<Redirect to='/recipes' /> ) : (<Redirect to='/login' />)} </Route>
        </Switch>
      
    </AppContainer>
  );
}

const mapStateToProps = (state) => {
  return ({
    users: state.users,
    recipes: state.recipes,
    token: state.token
  })
}

export default connect(mapStateToProps, {})(App);


const AppContainer = styled.div`
  height: 100%;
  border: 1px solid black;
`


// <HeaderStyle>
    //      <h1>Family Recipes Cookbook</h1>
    //      <Navigation />
    //      <NavStyle>
    //        {this.props.token ? null : <Link to='/login' className='navlink'>Login</Link>}
    //        {this.props.token ? null : <Link to='/register' className='navlink'>Register</Link>}
    //        <Link to='/login' className='navlink'>Login</Link>
    //        <Link to='/register' className='navlink'>Register</Link>
    //        <Link to='/recipes' className='navlink'>Recipes Dashboard</Link>
    //        <Link to='/add-recipe' className='navlink'>Add Recipe</Link>
    //        <Link to='/update-recipe' className='navlink'>Recipe</Link>
    //        <Link to='/logout' className='navlink'>Logout</Link>
    //      </NavStyle
    //    </HeaderStyle> 