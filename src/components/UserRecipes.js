import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory, useParams } from 'react-router-dom';


const UserRecipes = () => {
    const [recipes, setRecipes ] = useState([]);
    const { push } = useHistory();
    const { recipe_id } = useParams();
   
    useEffect(() => {
        axiosWithAuth()
        .get('/api/recipes')
        .then(resp => {
            console.log(resp.data);
            setRecipes(resp.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);


    const deleteRecipe = (recipe_id ) => {
        setRecipes(recipes.filter(recipe =>(recipe.recipe_id !== Number(recipe_id))));
    }

    const handleDelete = (recipe_id) => {
            axiosWithAuth()
            .delete(`/api/recipes/${recipe_id}`)
            .then(resp => {
                deleteRecipe(recipe_id);
                push('/user-recipes');
        })
            .catch(err => {
                console.log(err);
        })
    }

    const handleAdd = () => {
        push('/add-recipe');
    }

    const handleUpdate = () => {
        push('/update-recipe');
     }

    return (
        <ComponentContainer>        
            <h1>My Recipes</h1>
            <div className='body'>
                <div >
                <button className='button' onClick={() => {handleAdd()}}> Add Recipe</button> 
                <button className='button' onClick={() => {handleUpdate()}}> Update Recipe</button> 
                <button className='button' onClick={() => {handleDelete()}}> Delete Recipe</button> 
                </div>
                <div className='all-recipes'>
                    {
                        recipes.map(recipe => {
                            return (
                                <div className='recipe' key={recipe.recipe_id}>
                                    {/* <img alt='' src={item.img}/> */}
                                    <h2>{recipe.recipe_name}</h2>
                                    <h3>Source: {recipe.recipe_source}</h3>
                                    <h3>Category: {recipe.recipe_category}</h3>
                                    <h3>Ingredients: ${recipe.recipe_ingredients}</h3>
                                    <p>Instructions: {recipe.recipe_instructions}</p>
                                    <button onClick={() => {handleDelete(recipe.recipe_id)}}>Delete</button>
                                    </div>
                                )
                        })
                    }
                </div>
                
        </div>
        </ComponentContainer>
    )
}
export default UserRecipes;


const ComponentContainer = styled.div`
    background-color: #386FA4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;

    font-family: 'Roboto Mono', monospace;
    font-size: 1rem;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    min-width: 100%;
    min-height: 100vh;
    border: 1px solid black;
    h1{
        font-size: 60px;
        font-weight: 400;
        padding: 20px;
        margin: auto;
        width: 100%;
        color: white;
        align-items: center;
    }
    h2 {
        text-decoration: underline;
    }
    p{
        color: white;
        font-weight: bold;
        font-size: 1rem;
    }
    .all-items{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        width: 80%;
    }
    .item{
        border: 1px black solid;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        margin: 10px;
        padding: 20px;
        width: 25%;
        background-color: #84D2F6;
    }
    img{
        width: 100px;
        height: 100px;
        border: #386FA4 solid 1px;
    }
    button {
        border-radius: 10%;
        font-size: 1rem;
        margin: 15px;
    }
    .body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto;
    }
   
   .button{
        min-width: 130px;
        height: 40px;
        color: #133C55;
        padding: 5px 10px;
        font-size: 2rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        display: inline-block;
        outline: none;
        border-radius: 5px;
        border: none;
        background: #F4B860;
        box-shadow: 0 5px #ffd819;
        margin-bottom: 40px;
    }
    .button:hover {
        box-shadow: 0 3px #ffd819;
        top: 1px;
        }
    .button:active {
        box-shadow: 0 0 #ffd819;
        top: 5px;
}
`
