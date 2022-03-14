import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory, useParams, Link} from 'react-router-dom';
import styled from 'styled-components';

// import { connect } from 'react-redux';
// import { updateRecipe } from '../actions';


const UpdateRecipe = () => {
    const { recipe_id } = useParams();
    const { push } = useHistory();
    const [recipe, setRecipe] = useState({
        recipe_id: recipe_id,
        recipe_name: '',
        recipe_source: '',
        recipe_ingredients: '',
        recipe_instructions: '',
        recipe_category: '',
        user_id: localStorage.getItem("user_id")
    })

//     useEffect(() => {
//         axiosWithAuth()
//         .get(`/api/recipes/${recipe_id}`)
//         .then(res => {
//             console.log(res);
//             setRecipe(res.data)
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }, [recipe_id])

    const handleChange = e => {
        e.persist();
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
        .put(`api/recipes/${recipe_id}`, recipe)
        .then(res => {
            console.log(res);
            setRecipe(res.data)
            push(`/api/recipes/${recipe_id}`)
        })
        .catch(err => {
            console.log(err)
        })
    };
    
    return (
    <ComponentContainer>
        <div className="tabs-container">
            <Link className="tab" to="/recipes">
            All Recipes
            </Link>
            <Link className="tab" to="/user-recipes">
            My Recipes
            </Link>
            <Link className="tab active" to="/add-recipe">
            Add Recipe
            </Link>
        </div>
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
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className='label'>
                    <label>Source:
                        <input
                            type='text'
                            name='recipe_source'
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className='label'>
                    <label>Category:
                        <input
                            type='text'
                            name='recipe_category'
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className='label'>
                    <label>Ingredients:
                        <input
                            type='text'
                            name='recipe_ingredients'
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className='label'>
                    <label>Instructions:
                        <input 
                            type='text'
                            name='recipe_instructions'
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button>UPDATE RECIPE</button>
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
    background-color: #386FA4;
    display: flex;
    flex-direction: row;
    /* align-items: center;
    justify-content: center; */
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