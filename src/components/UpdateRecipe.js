import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory, useParams, Link} from 'react-router-dom';
import styled from 'styled-components';
import Banner from '../images/thumbs/06.jpg';

const UpdateRecipe = () => {
    const { recipe_id } = useParams();
    const { push } = useHistory();
    const [recipe, setRecipe] = useState({
        recipe_name: '',
        recipe_source: '',
        recipe_ingredients: '',
        recipe_instructions: '',
        recipe_category: '', 
    })

    const [recipes, setRecipes] = useState([]);

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
    }, [])

    useEffect(() => {
        axiosWithAuth()
        .get(`/api/recipes/${recipe_id}`)
        .then(res => {
            console.log(res);
            setRecipe(res.data)
        })
        .catch(err => {
            console.log(err)
        })
}, [recipe_id])

    const handleChange = e => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        });
    };

    const updateRecipe = (newRecipe) => {
        setRecipe(newRecipe);
    }

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
        .put(`api/recipes/${recipe_id}`, recipe)
        .then(res => {
            console.log(res);
            updateRecipe(res.data)
            setRecipes(res.data)
            push('/recipes')
        })
        .catch(err => {
            console.log(err)
        })
    };

    
    return (
    <ComponentContainer>
        {/* <div className="tabs-container">
            <Link className="tab" to="/recipes">
            All Recipes
            </Link>
            <Link className="tab" to="/user-recipes">
            My Recipes
            </Link>
            <Link className="tab active" to="/add-recipe">
            Add Recipe
            </Link>
        </div> */}
        <div>
            <h1>Update Recipe</h1>
            <form onSubmit={handleSubmit}>
            <div className='form-container'>
                {/* <img src={Pic} alt='sample pic'/> */}
                <div className='label-container'>
                <div className='label'>
                    <label>Recipe Name:
                        <input
                            type='text'
                            name='recipe_name'
                            value={recipe.recipe_name}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className='label'>
                    <label>Source:
                        <input
                            type='text'
                            name='recipe_source'
                            value={recipe.recipe_source}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className='label'>
                    <label>Category:
                        <input
                            type='text'
                            name='recipe_category'
                            value={recipe.recipe_category}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className='label'>
                    <label>Ingredients:
                        <input
                            type='text'
                            name='recipe_ingredients'
                            value={recipe.recipe_ingredients}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className='label'>
                    <label>Instructions:
                        <input 
                            type='text'
                            name='recipe_instructions'
                            value={recipe.recipe_instructions}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button>Update Recipe</button>
                <Link to={`/recipes`}><input type="button" className='button' value="Cancel"/></Link>
                </div>
            </div>
            </form>
        </div>
        </ComponentContainer>
    )

}

// const mapStateToProps = state => {
//     return ({
//       updateRecipe: state.updateRecipe
//     });
//   };

// export default connect(mapStateToProps, { updateRecipe })(UpdateRecipe);

export default UpdateRecipe;

const ComponentContainer = styled.div`
    height: 100vh;
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
        margin-top: 50px;
        font-family: 'Montserrat', sans-serif;
    }

    h1{
    font-size: 60px;
    font-weight: 400;
    padding: 20px;
    margin: auto;
    width: 100%;
    align-items: center;
    color: white;
    }

    .form-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 50px;
        width: 80%;
    }
    label{
        display: flex;
        justify-content: space-between;
        color: white;
        margin: 20px;
        font-size: 20px;
    }

    input {
        margin-left: 40px;
    }
    button{
        font-size: 16px;
        background-color: black;
        border-radius: 10%;
        color: white;
        padding: 15px 10px;
        margin-left: 200px;
    }

    img{
        width: 200px;
        height: 200px;
        margin: 0 50px;
    }

`