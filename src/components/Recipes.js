import React, {useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory, useParams, Link } from 'react-router-dom';
import Banner from '../images/thumbs/05.jpg';
import { Button, Table } from 'reactstrap'

const Recipes = () => {
    const { push } = useHistory();
    const { recipe_id } = useParams();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axiosWithAuth()
        .get('/api/recipes')
        .then(res => {
            setRecipes(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    const deleteRecipe = (recipe_id) => {
        setRecipes(recipes.filter(recipe => (recipe.recipe_id !== Number(recipe_id))));
    }

    const handleDelete = (recipe_id) => {
        axiosWithAuth()
        .delete(`/api/recipes/${recipe_id}`)
        .then(res => {
            deleteRecipe(recipe_id);
            push('/recipes')
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
    <All>
        <h1>Delicious recipes </h1>
        <h2>...saved for future generations</h2>
        <RecipesContainer>
            <div>
                <Table bordered responsive hover>
                    <thead>
                    <tr>
                        <th className='text-center'>Recipe</th>
                        <th className='text-center'>Author</th>
                        <th className='text-center'>Category</th>
                        <th className='text-center'></th>
                    </tr>
                    </thead>

                    <tbody>
                        {
                            recipes.map(recipe => {
                                return(
                                    <tr key={recipe.recipe_id}>
                                        <td className='text-center'>{recipe.recipe_name}</td>
                                        <td className='text-center'>{recipe.recipe_source}</td>
                                        <td className='text-center'>{recipe.recipe_category}</td> 
                        
                                      <td className='text-center'>
                                        <Link to={`/recipes/${recipe.recipe_id}`}>
                                            <Button className='btn-icon' type='button'  size='sm' outline color='primary' >View</Button>
                                        </Link>
                                        <Button className='btn-icon' type='button' outline color='secondary' size='sm' onClick={() => handleDelete(recipe.recipe_id)}>Delete</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        
    </RecipesContainer>
    </All>
    )
    }

export default Recipes;

const All = styled.div`
    height: 100vw;
    width: 100vw;
    background-color: #edf2fb;
    background-image: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${Banner});
    background-repeat: no-repeat;
    background-position: left top;
    background-size: cover;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    
    h1{
        font-size: 3rem;
        margin: 50px auto 0;
        font-family: 'Montserrat', sans-serif;
    }
    h2{
        font-size: 1.8rem;
        font-style: italic;
        margin-left: 150px;
        margin-top: 10px;
        font-family: 'Hurricane', cursive;
    }
     /* tablet */
     @media (max-width: 768px) {
    h1{
    font-size: 2rem;
    }
    h2{
    font-size: 1.5rem;
    }
    }

    /* mobile */
    @media (max-width: 480px) {
    h2{
    font-size: 2rem;
    }
    h2{
    font-size: 1.5rem;
    }
`

const RecipesContainer = styled.div`
    border-radius: .5em;
    margin: 50px auto;
    text-align: center;
    width: 50%;
    height: auto;
    font-family: 'Montserrat', sans-serif;

    thead{
        background-color: #40531b;
        color: white;
    }

    th{
        color: white;
        font-size: 1.5rem;
    }
    tr{
        border: 2px solid #40531b;
    }
    td{
        background-color: #afbc88;
        text-align: center;
        font-size: 1.2rem;
    }

    Button{
        margin: 10px;
        font-size: 0.9rem;
    }

     /* tablet */
    @media (max-width: 768px) {
    width: 80%;
    h1{
    font-size: 1.5rem;
    }
    h2{
    font-size: 1rem;
    }
    }

    /* mobile */
    @media (max-width: 480px) {
    width: 90%;
    h2{
    font-size: 1.3rem;
    }
    h2{
    font-size: 1rem;
    }
    }
`
