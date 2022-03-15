import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';

// setRecipes(recipes.filter(item =>(item.recipe_id !== Number(recipe_id))));

const RecipeCard = (props) => {
    const { recipe_id } = useParams();
    const userId = Number(localStorage.getItem('user_id'))
    const { push } = useHistory();
    const [recipe, setRecipe] = useState([]);
    // const recipe = recipes.find(recipe => recipe.recipe_id === Number(recipe_id));

    useEffect(() => {
        axiosWithAuth()
        .get(`/api/recipes/${recipe_id}`)
        .then(res => {
            console.log(res);
            setRecipe(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [recipe_id]);

    const routeToUpdate = (e, recipe) => {
        e.preventDefault()
        push(`/update-recipe/${recipe.recipe_id}`)
    }

    const handleDelete = (recipe_id) => {
        axiosWithAuth()
        .delete(`/api/recipes/${recipe_id}`)
        .then(res => {
            console.log(res)
            push('/recipes')
        })
        .catch(err => {
            console.log(err);
        })
    }

    if (!recipe || (recipe.user_id !== userId && recipe.user_id > 0))
        return (
            <div className='status'>You don't have access to this recipe</div>
        )
        else 
       
    // const handleDelete = (recipe_id) => {
    //     axiosWithAuth()
    //     .delete(`/api/recipes/${recipe_id}`)
    //     .then(resp => {
    //         deleteRecipe(recipe_id);
    //         push('/recipes');
    // })
    //     .catch(err => {
    //         console.log(err);
    // })
    // }

    // const handleUpdate = 

    return (
        <RecipeCardContainer>
             <h1>Recipe Detail</h1>
            <div className='form'>
                <h3 className='item'>{recipe.recipe_name} </h3>
                <p className='item'>Source: {recipe.recipe_source}</p>
                <p className='item'>Category: {recipe.recipe_category}</p>
                <p className='item'>Ingredients: {recipe.recipe_ingredients}</p>
                <p className='item'>Instructions: {recipe.recipe_instructions}</p>
                <div className='button'>    
                    <button onClick={() => handleDelete(recipe_id)}>Delete</button>
                    <button onClick={e => routeToUpdate(e, recipe)} key={recipe.recipe_id}>Update</button>
                </div>
            </div>
        </RecipeCardContainer>
    )
}


export default RecipeCard;

const RecipeCardContainer = styled.div`
    /* height: 100vh; */
    border: 1px solid black;
    width: 60vw;
    margin: auto;
    margin-top: 10px;
    background-color: gray;

    h1{
        font-size: 60px;
        font-weight: 400;
        /* padding: 20px; */
        margin: 10px;
        text-align: center;
        width: auto;
        color: black;
        align-items: center;
        background-color: white;
        border: 1px solid black;
    }
    .form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 10px;
        padding: 20px;
        margin: auto ; 
        font-size: 1.5rem;
        background-color: gray;
        }
    .item{ 
        border: 1px solid black;
        width: 50vw;
        padding: 10px;
        background-color: white;
    }

    .button{
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    button{
      
        align-items: center;
        background-color:black;
        color:white;
        font-size: 1rem;
        font-family: 'Roboto Mono', monospace;
        padding:0.5rem;
        margin: 10px;
        }
    label{
        margin: 10px;
    }

`