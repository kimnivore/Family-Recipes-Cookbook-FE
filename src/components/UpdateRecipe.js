import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory, useParams, Link} from 'react-router-dom';
import styled from 'styled-components';
import Banner from '../images/thumbs/06.jpg';
import{ Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
            updateRecipe(res.data)
            setRecipes(res.data)
            push('/recipes')
        })
        .catch(err => {
            console.log(err)
        })
    };

    
    return (
    <All>
        <h1>Update Recipe</h1>
        <ComponentContainer>
            <Form className='form' onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Title:
                        <Input
                            className='input'
                            type='text'
                            name='recipe_name'
                            value={recipe.recipe_name}
                            onChange={handleChange}
                        />
                    </Label>
                </FormGroup>

                <FormGroup>
                    <Label>Source:
                        <Input
                            className='input'
                            type='text'
                            name='recipe_source'
                            value={recipe.recipe_source}
                            onChange={handleChange}
                        />
                    </Label>
                </FormGroup>

               <FormGroup>
                    <Label>Category:
                        <Input
                            className='input'
                            type='select'
                            name='recipe_category'
                            onChange={handleChange}
                        >
                            <option value='None'>Select a Category</option>
                            <option value='Appetizer'>Appetizer</option>
                            <option value='Baked Good'>Baked Good</option>
                            <option value='Dessert'>Dessert</option>
                            <option value='Main'>Main</option>
                            <option value='Salad'>Salad</option>
                            <option value='Side Dish'>Side Dish</option>
                            <option value='Snack'>Snack</option>
                            <option value='Soup'>Soup</option>  
                        </Input>
                    </Label>
                </FormGroup>
                
                <FormGroup>
                    <Label>Ingredients:
                        <Input
                            className='input'
                            type='textarea'
                            name='recipe_ingredients'
                            value={recipe.recipe_ingredients}
                            onChange={handleChange}
                        />
                    </Label>
                </FormGroup>

               <FormGroup>
                    <Label>Instructions:
                        <Input 
                            className='input'
                            type='textarea'
                            name='recipe_instructions'
                            value={recipe.recipe_instructions}
                            onChange={handleChange}
                        />
                    </Label>
                </FormGroup>

                <Button onClick={handleSubmit} className='btn-icon' type='button' outline color='primary'>Update Recipe</Button>
                <Link to={`/recipes`}>
                    <Button className='btn-icon' type='button' outline color='primary'>Cancel</Button>
                </Link>
            </Form>
        </ComponentContainer>
    </All>
    )
}

export default UpdateRecipe;
const All = styled.div`
   height: 100%;
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
   
`
const ComponentContainer = styled.div`
  .form{
    border: 2px solid #85c7de;
    border-radius: .5em;
    margin: 50px auto;
    text-align: center;
    width: 40%;
    height: auto;
    background-color: #edf2fb;
    font-family: 'Montserrat', sans-serif;
  }
  

  Label{
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 10px;
      margin: 20px;
   
  }

  .input{
      width: 90%;
      margin-left: 20px;
      height: auto;
  }

  Button{
        margin: 10px;
        font-size: 0.9rem;
    }

/* tablet */
@media (max-width: 768px) {
.form{
    width: 80%;
}
}

/* mobile */
@media (max-width: 480px) {
.form{
width: 90%;
}
}
  
`