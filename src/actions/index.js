import axios from 'axios';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const login = formValues => dispatch => {
    dispatch({ type: LOGIN_START });
    axios
        .post('https://family-recipes-cookbook1.herokuapp.com/api/auth/login', formValues)
        .then(resp => {
            console.log(resp.data)
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('user_id', resp.data.user_id);
            dispatch({ type: LOGIN_SUCCESS, payload: resp.data});
            return true;
        })
        .catch(err => {
            dispatch({type: LOGIN_FAILURE, payload: err })
            console.log(err);
        })
}



export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';


export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';


export const FETCH_RECIPES_START = 'FETCH_RECIPES_START';
export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPES_FAILURE = 'FETCH_RECIPES_FAILURE';


export const ADD_RECIPES_START = 'ADD_RECIPES_START';
export const ADD_RECIPES_SUCCESS = 'ADD_RECIPES_SUCCESS';
export const ADD_RECIPES_FAILURE = 'ADD_RECIPES_FAILURE';

export const UPDATE_RECIPES_START = 'UPDATE_RECIPES_START';
export const UPDATE_RECIPES_SUCCESS = 'UPDATE_RECIPES_SUCCESS';
export const UPDATE_RECIPES_FAILURE = 'UPDATE_RECIPES_FAILURE';


export const DELETE_RECIPES_START = 'DELETE_RECIPES_START';
export const DELETE_RECIPES_SUCCESS = 'DELETE_RECIPES_SUCCESS';
export const DELETE_RECIPES_FAILURE = 'DELETE_RECIPES_FAILURE';

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

