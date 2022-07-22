import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory, Link } from "react-router-dom";
import styled from 'styled-components';
import Banner from '../images/thumbs/01.jpg';
import{ Button, Form, FormGroup, Label, Input } from 'reactstrap';

import * as yup from 'yup';
import schema from './validations/RecipeSchema';

const initialFormValues = {
    recipe_name: '',
    recipe_source: '',
    recipe_category: '',
    recipe_ingredients: '',
    recipe_instructions: ''
}

const initialFormErrors = {
    recipe_name: '',
    recipe_source: '',
    recipe_category: '',
    recipe_ingredients: '',
    recipe_instructions: ''
}

const initialDisabled = true;

const AddRecipe = () => {
  const {push} = useHistory();
  const [recipe, setRecipe] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [recipes, setRecipes] = useState([]);
  const [disabled, setDisabled] = useState(initialDisabled);

 
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

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: ''}))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const handleChange = (e, name, value) => {
    validate(name, value);
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
    .post('/api/recipes/', recipe)
    .then(res => {
        setRecipes(res.data);
        push('/recipes');
    })
    .catch(err => {
        console.log(err);
    })
  };

  useEffect(() => {
      schema.isValid(recipe).then((valid) => {
          setDisabled(!valid);
      });
  }, [recipe]);

  return (
    <All>
        <h1>Add a Recipe</h1>
        <ComponentContainer>
            <Form className='form' onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Title:
                        <Input
                            className='input'
                            type='text'
                            name='recipe_name'
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
                                <option value='None' >Select a Category</option>
                                <option value='Appetizer'>Appetizer</option>
                                <option value='Baked good'>Baked Good</option>
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
                            onChange={handleChange}
                        />
                    </Label>
                </FormGroup>

                <Button disabled={disabled} onClick={handleSubmit} className='btn-icon' type='button' outline color='primary'>Add Recipe</Button>
                <Link to={`/recipes`}>
                    <Button className='btn-icon' type='button' outline color='primary'>Cancel</Button> 
                </Link>
            </Form>
        </ComponentContainer>
     </All>
)

}

export default AddRecipe;


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
    
    h1{
        font-size: 3rem;
        margin: 50px auto 0;
    }
    h2{
        font-size: 1.8rem;
        font-style: italic;
        margin-left: 150px;
        margin-top: 10px;
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