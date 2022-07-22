import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import PrivateRoute from './utils/PrivateRoute';

import { connect } from 'react-redux';

import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Recipes from './components/Recipes';
import RecipeCard from './components/RecipeCard';
import AddRecipe from './components/AddRecipe';
import UpdateRecipe from './components/UpdateRecipe';


function App() {
  return (
    <div className='App'>
    <AppContainer>
  
        <Navigation />
    
        <Switch>
          <PrivateRoute path='/update-recipe/:recipe_id' component={UpdateRecipe} />
          <PrivateRoute path='/add-recipe' component={AddRecipe} />
          <PrivateRoute path='/recipes/:recipe_id' component={RecipeCard} />
          <PrivateRoute path='/recipes' component={Recipes} />
          <PrivateRoute path='/logout' component={Logout} />
          <Route path='/register' component={Register} /> 
          <Route path='/login' component={Login} />
          <Route path='/home' component={Home} />
          <Route path='/'>{localStorage.getItem('token') ? (<Redirect to='/recipes' /> ) : (<Redirect to='/home' />)} </Route>
        </Switch>
      
    </AppContainer>
    </div>
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
`