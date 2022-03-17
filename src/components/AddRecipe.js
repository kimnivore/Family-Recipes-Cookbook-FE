import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory, Link } from "react-router-dom";
import styled from 'styled-components';
import Banner from '../images/thumbs/07.jpg';
import{ Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const AddRecipe = () => {
  const {push} = useHistory();
  const [recipe, setRecipe] = useState({
        // recipe_id: Date.now(),
        recipe_name: '',
        recipe_source: '',
        recipe_ingredients: '',
        recipe_instructions: '',
        recipe_category: '',
        // user_id: localStorage.getItem("user_id")
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

  const handleChange = (e) => {
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

  return (
    <All>
         <h1>Add a New Recipe</h1>
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
                                <option value='none' selected disabled hidden>Select a Category</option>
                                <option value='appetizer'>Appetizer</option>
                                <option value='bakedgood'>Baked Good</option>
                                <option value='dessert'>Dessert</option>
                                <option value='main'>Main</option>
                                <option value='salad'>Salad</option>
                                <option value='sidedish'>Side Dish</option>
                                <option value='snack'>Snack</option>
                                <option value='soup'>Soup</option>  
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

                <Button onClick={handleSubmit} className='btn-icon' type='button' outline color='primary'>Add Recipe</Button>
                <Link to={`/recipes`}>
                    <Button className='btn-icon' type='button' outline color='primary'>Cancel</Button> 
                </Link>

            </Form>
        </ComponentContainer>
     </All>
)

}

export default AddRecipe;

// const mapStateToProps = state => {
//   return ({
//     addRecipe: state.addRecipe
//   });
// };

// export default connect(mapStateToProps, { addRecipe })(AddRecipe);

const All = styled.div`
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
      padding: 10px;
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