import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';

const RecipeCard = ({ recipe }) => {
    const { push } = useHistory();
    const route = e => {
        e.preventDefault()
        push(`/recipes/${recipe.recipe_id}`)
    }

    return (
        <RecipeCardContainer>
            <h2>Recipe Name: {recipe.recipe_name} </h2>
            <p>Source: {recipe.recipe_source}</p>
            <p>Category: {recipe.recipe_category}</p>
            <p>Ingredients: {recipe.recipe_ingredients}</p>
            <p>Instructions: {recipe.recipe_instructions}</p>
            <button onClick={route}>View Recipe</button>
        </RecipeCardContainer>
    )
}

export default RecipeCard;

const RecipeCardContainer = styled.div`
  height: 40vh;
    border: 1px solid black;
    width: 20vw;
    margin: auto;
    form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        width: 25%;
        padding: 20px;
        margin: 50px auto ; 
        font-size: 1.5rem;
        }
    button{
        display:flex;
        flex-direction:row;
        background-color:black;
        color:white;
        border-radius: 10px;
        font-size: 1.75rem;
        font-family: 'Roboto Mono', monospace;
        padding:1rem;
        margin: 1rem;
        border: none;
        }
    label{
        margin: 10px;
    }

`