import React, {useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory, useParams, Link } from 'react-router-dom';
import Banner from '../images/thumbs/05.jpg';
import { Button, Table } from 'reactstrap'

const Recipes = () => {
    const { push } = useHistory();
    const { recipe_id, user_id } = useParams();
    //const userId = Number(localStorage.getItem('user_id'))
    const [recipes, setRecipes] = useState([]);
    const [recipe, setRecipe] = useState([]);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosWithAuth()
        .get('/api/recipes')
        .then(res => {
            console.log(res);
            setRecipes(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    // useEffect(() => {
    //     axiosWithAuth()
    //     .get('/api/auth/users')
    //     .then(res => {
    //         console.log(res);
    //         setUsers(res.data);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }, []);

    // const user = users.find(user => user.user_id === Number(user_id));
    // const username = user.username;

    // useEffect(() => {
    //     axiosWithAuth()
    //     .get(`/api/recipes/${recipe_id}`)
    //     .then(res => {
    //         console.log(res);
    //         setRecipe(res.data);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }, [recipe_id]);
    
    // const handleAdd = () => {
    //     push('/add-recipe');
    // }

    // const handleUpdate = (recipe_id) => {
    //     push(`/update-recipe/${recipes.recipe_id}`);
    // }

    // const deleteRecipe = (recipe_id) => {
    //     setRecipes(recipes.filter(recipe =>(recipe.recipe_id !== Number(recipe_id))));
    // }

    // const handleDelete = (recipe_id) => {
    //     axiosWithAuth()
    //     .delete(`/api/recipes/${recipes.recipe_id}`)
    //     .then(resp => {
    //         deleteRecipe(recipes.recipe_id);
    //         push('/recipes');
    // })
    //     .catch(err => {
    //         console.log(err);
    // })
    // }

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

    // const handleView = (recipe_id) => {
    //     axiosWithAuth()
    //     .get(`/api/recipes/${recipe_id}`)
    //     .then(res => {
    //         console.log(res)
    //         push(`/api/recipes/${recipes.recipes_id}`)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }

    // if (!recipe || (recipe.user_id !== userId && recipe.user_id > 0))
    //     return (
    //         <div className='status'>You don't have access to this recipe</div>
    //     )
    //     else 
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
                                        <Link>
                                            <Button className='btn-icon' type='button' outline color='secondary' size='sm' onClick={() => handleDelete(recipe_id)}>Delete</Button>
                                        </Link>
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
    height: 100vh;
    width: 100vw;
    background-color: #edf2fb;
    /* border: 1px solid black; */
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
    border: 2px solid #85c7de;
    border-radius: .5em;
    margin: 50px auto;
    text-align: center;
    width: 50%;
    height: auto;
    background-color: #edf2fb;
    font-family: 'Montserrat', sans-serif;

    thead{
        background-color: #edf2fb;
    }

    th{
        color: #757575;
        font-size: 1.5rem;
    }
    tr{
        border: 2px solid #85c7de;
    }
    td{
        background-color: #ffffff;
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
