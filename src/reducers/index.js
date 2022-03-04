import { 
    LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL,
    REGISTER_START, REGISTER_SUCCESS, REGISTER_FAIL,
    FETCH_USERS_START, FETCH_USERS_SUCCESS, FETCH_USERS_FAIL,
    FETCH_RECIPES_START, FETCH_RECIPES_SUCCESS, FETCH_RECIPES_FAIL, 
    ADD_RECIPE_START, ADD_RECIPE_SUCCESS, ADD_RECIPE_FAIL,
    UPDATE_RECIPE_START, UPDATE_RECIPE_SUCCESS, UPDATE_RECIPE_FAIL,
    DELETE_RECIPE_START, DELETE_RECIPE_SUCCESS, DELETE_RECIPE_FAIL,
    // LOGOUT,
    // SET_ERROR
    } from '../actions';

export const initialState = {
    users: [],
    recipes: [],
    error: '',
    loggingIn: false,
    registering: false,
    fetchingUsers: false,
    fetchingRecipes: false,
    addingRecipe: false,
    updatingRecipe: false,
    deletingRecipe: false,
    // selectedRecipe: null,
    // filteredRecipes: []
};

const reducer = (state = initialState, action) => {
    switch(action.type) { 
        case LOGIN_START:
            return {
                ...state,
                loggingIn: true,
                error: ''
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                error: ''
            };
        case LOGIN_FAIL:
            return { 
                ...state,
                loggingIn: false,
                error: action.payload
            };

        case REGISTER_START:
            return {
                ...state,
                registering: true,
                error: ''
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                registering: false,
                error: action.payload
            };
        case REGISTER_FAIL:
            return { 
                ...state,
                registering: false,
                error: action.payload
            };

        case FETCH_USERS_START:
            return {
                ...state,
                users: [],
                fetchingUsers: true,
                error: ''
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                fetchingUsers: false,
                error: ''
            };
        case FETCH_USERS_FAIL:
            return { 
                ...state,
                users: [],
                fetchingUsers: false,
                error: action.payload
            };

        case FETCH_RECIPES_START:
            return {
                ...state,
                recipes: [],
                fetchingRecipes: true,
                error: ''
            };
        case FETCH_RECIPES_SUCCESS:
            return {
                ...state,
                recipes: action.payload,
                fetchingRecipes: false,
                error: ''
            };
        case FETCH_RECIPES_FAIL:
            return { 
                ...state,
                recipes: [],
                fetchingRecipes: false,
                error: action.payload
            };

        case ADD_RECIPE_START:
            return {
                ...state,
                addingRecipe: true,
                error: '',
                recipes: action.payload
            };
        case ADD_RECIPE_SUCCESS:
            return {
                ...state,
                addingRecipe: false,
                error: '',
                recipes: action.payload,
            };
        case ADD_RECIPE_FAIL:
            return {
                ...state,
                addingRecipe: false,
                error: action.payload
            };

        case UPDATE_RECIPE_START:
            return {
                ...state,
                updatingRecipe: true,
                error: ''
            };
        case UPDATE_RECIPE_SUCCESS:
            return {
                ...state,
                updatingRecipe: false,
                error: '',
                recipes: action.payload
            };
        case UPDATE_RECIPE_FAIL:
            return {
                ...state,
                updatingRecipe: false,
                error: action.payload,
            };

        case DELETE_RECIPE_START:
            return {
                ...state,
                deletingRecipe: true,
                error: ''
            };
        case DELETE_RECIPE_SUCCESS:
            return {
                ...state,
                deletingRecipe: false,
                error: '',
                recipes: action.payload
            };
        case DELETE_RECIPE_FAIL:
            return {
                ...state,
                deletingRecipe: false,
                error: action.payload
            };

        // case LOGOUT:
        //     return {
        //         ...state,
        //         token: null
        //     }

        // case SET_ERROR:
        //     const errorMessage = 'Recipe name, source, ingredients, instructions, and category are required.';
        //     return {
        //         ...state,
        //         recipes: [],
        //         fetchingRecipes: false,
        //         error: errorMessage
        //     };

        default:
            return state;
    }
}

export default reducer;