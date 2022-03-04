import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';


export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const login = (credentials) => dispatch => {
    dispatch({ type: LOGIN_START });
    axios
        .post('https://family-recipes-cookbook1.herokuapp.com/api/auth/login', credentials)
        .then(res => {
            console.log(res)
            dispatch({ type: LOGIN_SUCCESS, payload: res.data});
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user_id', res.data.user_id);
        })
        .catch(err => {
            console.log(err);
            dispatch({type: LOGIN_FAIL, payload: err })
        })
}

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const register = (credentials) => dispatch => {
    //const creds = { username: credentials.username, password: credentials.password }
    dispatch({ type: REGISTER_START });
    axios
        .post('https://family-recipes-cookbook1.herokuapp.com/api/auth/register', credentials)
        .then(res => {
            dispatch({ type: REGISTER_SUCCESS });
           localStorage.setItem('token', res.data.token);
           localStorage.setItem('user_id', res.data.user_id)
        })
        .catch(err => {
            dispatch({type: REGISTER_FAIL, payload: err })
        })
}
export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';
export const getUsers = () => dispatch => {
    dispatch({ type: FETCH_USERS_START });
    axiosWithAuth()
        .get('/api/auth/users')
        .then(res => {
            dispatch({ type: FETCH_USERS_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: FETCH_USERS_FAIL, payload: err});
        })
}

export const FETCH_RECIPES_START = 'FETCH_RECIPES_START';
export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPES_FAIL = 'FETCH_RECIPES_FAIL';
export const getRecipes = () => dispatch => {
    dispatch({ type: FETCH_RECIPES_START });
    axiosWithAuth()
        .get('/api/recipes')
        .then(res => {
            dispatch({ type: FETCH_RECIPES_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: FETCH_RECIPES_FAIL, payload: err });
        })
}

export const ADD_RECIPE_START = 'ADD_RECIPE_START';
export const ADD_RECIPE_SUCCESS = 'ADD_RECIPE_SUCCESS';
export const ADD_RECIPE_FAIL = 'ADD_RECIPE_FAIL';
export const addRecipe = newRecipe => dispatch => {
    dispatch({ type: ADD_RECIPE_START});
    axiosWithAuth()
        .post('/api/recipes', newRecipe)
        .then(res => {
            dispatch({ type: ADD_RECIPE_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: ADD_RECIPE_FAIL, payload: err });
        })
}

export const UPDATE_RECIPE_START = 'UPDATE_RECIPE_START';
export const UPDATE_RECIPE_SUCCESS = 'UPDATE_RECIPE_SUCCESS';
export const UPDATE_RECIPE_FAIL = 'UPDATE_RECIPE_FAIL';
export const updateRecipe = recipe => dispatch => {
    dispatch({ type: UPDATE_RECIPE_START });
    axiosWithAuth()
        .put(`/api/recipes/${recipe.recipe_id}`, recipe)
        .then(res => {
            dispatch({ type: UPDATE_RECIPE_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: UPDATE_RECIPE_FAIL, payload: err });
        })
}


export const DELETE_RECIPE_START = 'DELETE_RECIPE_START';
export const DELETE_RECIPE_SUCCESS = 'DELETE_RECIPE_SUCCESS';
export const DELETE_RECIPE_FAIL = 'DELETE_RECIPE_FAIL';
export const deleteRecipe = recipe_id => dispatch => {
    dispatch({ type: DELETE_RECIPE_START });
    axiosWithAuth()
        .delete(`/api/recipes/${recipe_id}`)
        .then(res => {
            dispatch({ type: DELETE_RECIPE_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: DELETE_RECIPE_FAIL, payload: err });
        })
}

// export const LOGOUT = 'LOGOUT';
// export const logout = () => dispatch => {
//     dispatch({ type: LOGOUT });
//     localStorage.clear();
// }

// export const SET_ERROR = 'SET_ERROR';
// export const setError = (err) => {
//     return({ type: SET_ERROR, payload: err });
// }


