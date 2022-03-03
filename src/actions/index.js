import axios from 'axios';
//import axiosWithAuth from '../utils/axiosWithAuth';


export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const login = (credentials, history) => dispatch => {
    dispatch({ type: LOGIN_START });
    axios
        .post('https://family-recipes-cookbook1.herokuapp.com/api/auth/login', credentials)
        .then(resp => {
            //console.log(resp.data)
            dispatch({ type: LOGIN_SUCCESS, payload: resp.data});
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('user_id', resp.data.user_id);
            history.push('/');
            return true;
        })
        .catch(err => {
            dispatch({type: LOGIN_FAIL, payload: err })
            return false;
            //console.log(err);
        })
}

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const register = (credentials, history) => dispatch => {
    const creds = { username: credentials.username, password: credentials.password }
    dispatch({ type: REGISTER_START });
    axios
        .post('https://family-recipes-cookbook1.herokuapp.com/api/auth/register', creds)
        .then(resp => {
            dispatch({ type: REGISTER_SUCCESS });
            if(resp.data.token) {
                localStorage.setItem('token', resp.data.token);
                history.push('/');
            } else {
                credentials.history.push('/login');
            }
            return true;
        })
        .catch(err => {
            dispatch({type: REGISTER_FAIL, payload: err })
            return false;
        })
}
export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';


export const FETCH_RECIPES_START = 'FETCH_RECIPES_START';
export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPES_FAIL = 'FETCH_RECIPES_FAIL';


export const ADD_RECIPE_START = 'ADD_RECIPE_START';
export const ADD_RECIPE_SUCCESS = 'ADD_RECIPE_SUCCESS';
export const ADD_RECIPE_FAIL = 'ADD_RECIPE_FAIL';

export const UPDATE_RECIPE_START = 'UPDATE_RECIPE_START';
export const UPDATE_RECIPE_SUCCESS = 'UPDATE_RECIPE_SUCCESS';
export const UPDATE_RECIPE_FAIL = 'UPDATE_RECIPE_FAIL';


export const DELETE_RECIPE_START = 'DELETE_RECIPE_START';
export const DELETE_RECIPE_SUCCESS = 'DELETE_RECIPE_SUCCESS';
export const DELETE_RECIPE_FAIL = 'DELETE_RECIPE_FAIL';

export const LOGOUT = 'LOGOUT';
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
}

export const SET_ERROR = 'SET_ERROR';
export const setError = (error) => {
    return({type:SET_ERROR, payload: error});
}


export const fetchRecipes = () => (dispatch) => {
    dispatch(fetchStart());
    axios.get('')
        .then(resp => {
            dispatch(fetchSuccess(resp.data));
        })
        .catch(err => {
            dispatch(fetchFail(err));
        })
}   

export const FETCH_START = 'FETCH_START';
export const fetchStart = () => {
    return({type:FETCH_START});
}

export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const fetchSuccess = (person) => {
    return({type:FETCH_SUCCESS, payload: person});
}

export const FETCH_FAIL = 'FETCH_FAIL';
export const fetchFail = (errorMessage) => {
    return({type:FETCH_FAIL, payload: errorMessage});
}

export const ADD_RECIPE = 'ADD_RECIPE';
export const addRecipe = (newRecipe) => {
    return({type: ADD_RECIPE, payload: newRecipe});
}

