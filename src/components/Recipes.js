import React, {useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory, useParams, Link } from 'react-router-dom';


const Recipes = () => {
    const { push } = useHistory();
    const { recipe_id } = useParams();
    //const userId = Number(localStorage.getItem('user_id'))
    const [recipes, setRecipes] = useState([]);
   // const [recipe, setRecipe] = useState([]);

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
    //     .get(`/api/recipes/${recipe_id}`)
    //     .then(res => {
    //         console.log(res);
    //         setRecipe(res.data);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }, [recipe_id]);
    
    const handleAdd = () => {
        push('/add-recipe');
    }

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

    // if (!recipe || (recipe.user_id !== userId && recipe.user_id > 0))
    //     return (
    //         <div className='status'>You don't have access to this recipe</div>
    //     )
    //     else 
    return (
    <RecipesContainer>
        <h1>All Recipes</h1>
      
            <div className='top'>
                <button className='button' onClick={() => {handleAdd()}}> Add Recipe</button> 
                {/* <button className='button' onClick={() => {handleUpdate()}}> Update Recipe</button>  */}
                {/* <button className='button' onClick={() => {handleDelete()}}> Delete Recipe</button>  */}
            </div>

            <div>
                <table className='table table-striped table-hover'>
                    <thead>
                    <tr>
                        <th>Recipe Name</th>
                        <th>Source</th>
                        <th>Category</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                        {
                            recipes.map(recipe => {
                                return(
                                    <tr className='recipe' key={recipe.recipe_id}>
                                        <td className='recipe'>{recipe.recipe_name}</td>
                                        <td className='recipe'>{recipe.recipe_source}</td>
                                        <td className='recipe'>{recipe.recipe_category}</td> 
                                        {/* <td>{recipe.recipe_ingredients}</td>  
                                        <td>{recipe.recipe_instructions}</td> */}
                                        <Link to={`/recipes/${recipe.recipe_id}`} className='view'>
                                            <button className='view'>View</button>
                                        </Link>
                                        <Link to={`/recipes/${recipe.recipe_id}`} className='view'>
                                            <button className='view'>Update</button>
                                        </Link>
                                        {/* <button className='view' onClick={() => {handleDelete()}}> Delete</button>  */}
                                        <button className='view' onClick={() => handleDelete(recipe_id)}>Delete</button>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        
    </RecipesContainer>
    )
    }


export default Recipes;


const RecipesContainer = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: flex-start;
    font-family: 'Roboto Mono', monospace;
    font-size: 1rem;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    min-width: 100%;
    min-height: 100vh;
    border: 1px solid black;
    padding: 10px;

    h1{
        font-size: 60px;
        font-weight: 400;
        padding: 20px;
        margin: 10px;
        text-align: center;
        width: auto;
        color: black;
        align-items: center;
        /* border: 1px solid black; */
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
        margin: 5px 0;
    }
    .body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto;
    }
   
   .button{
        height: 40px;
        color: #133C55;
        padding: 5px;
        font-size: 1rem;
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

table {
  font-size: 20px;
  min-height: 400px;
  border:#d2d2d2 1px solid;
}

table.table tr th, table.table tr td {
	border-color: #e9e9e9;
	padding: 12px 15px;
	vertical-align: middle;
    width: 100%

}
table.table tr th:first-child {
	width: 60%;
}
table.table tr th:last-child {
	width: 100%;
}
table.table-striped tbody tr:nth-of-type(odd) {
	background-color: #fcfcfc;
}
table.table-striped.table-hover tbody tr:hover {
	background: #f5f5f5;
}
table.table th i {
	font-size: 13px;
	margin: 0 5px;
	cursor: pointer;
}	
table.table td:last-child i {
	opacity: 0.9;
	font-size: 22px;
	margin: 0 5px;
}
table.table td a {
	font-weight: bold;
	color: #566787;
	display: inline-block;
	text-decoration: none;
	outline: none !important;
    border: 1px solid black;
}
table.table td a:hover {
	color: #2196F3;
}

table.table .avatar {
	border-radius: 50%;
	vertical-align: middle;
	margin-right: 10px;
}


.view{
    display: flex;
    text-align: center;
    width: 100px;
    color:#435d7d;
	font-size: 1rem !important;
    text-decoration: none;
    align-self: center;
    vertical-align: middle;

}

.recipe{
    border: 1px solid black
}

thead{
    background-color: gray;
}

`
