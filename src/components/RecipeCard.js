import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import Banner from '../images/thumbs/07.jpg';
import { Card, CardText, CardBody, CardLink, CardTitle, CardHeader, CardFooter, Button } from 'reactstrap';


const RecipeCard = (props) => {
    const { recipe_id } = useParams();
    const { push } = useHistory();
    const [recipe, setRecipe] = useState([]);

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

    return (
        <All>
        <RecipeCardContainer>
            <Card className='text-center' style={{ backgroundColor: '#edf2fb', borderColor: '#333'}} >
                <CardBody>
                    <CardHeader className='title' tag='h3'>{recipe.recipe_name} </CardHeader>
                    <CardTitle className='source' >By: {recipe.recipe_source}</CardTitle>
                </CardBody>

                <CardBody className='body'>
                    <CardText className='data one'>Category: </CardText>
                    <CardText className='data two'>{recipe.recipe_category}</CardText>
                </CardBody>

                <CardBody className='body'>
                    <CardText className='data one'>Ingredients: </CardText>
                    <CardText className='data two'> {recipe.recipe_ingredients}</CardText>
                </CardBody>

                <CardBody className='body'>
                    <CardText className='data one'>Instructions: </CardText>
                    <CardText className='data two'>{recipe.recipe_instructions}</CardText>
                </CardBody>

                <CardFooter>    
                    <CardLink><Button className='btn-icon' type='button'  size='sm' outline color='primary' onClick={() => handleDelete(recipe_id)}>Delete</Button></CardLink>
                    <CardLink><Button className='btn-icon' type='button'  size='sm' outline color='primary' onClick={(e) => routeToUpdate(e, recipe)} key={recipe.recipe_id}>Update</Button></CardLink>
                </CardFooter>
               
            </Card>
        </RecipeCardContainer>
        </All>
    )
}


export default RecipeCard;
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
        margin-top: 50px;
        font-family: 'Montserrat', sans-serif;
    }
`
const RecipeCardContainer = styled.div`
   width: 50%;
   height: auto;
   margin: 50px auto;

   .text-center{
       margin: 20px auto;
   }
   .title{
       background-color: #b6ccfe;
       font-size: 2.5rem;
   }
   .source{
       font-style: italic;
       margin-top: 10px;
   }
   .data{
       border: 1px dotted black;
       background-color: #d7e3fc;
       width: 100%;
       height: auto;
       text-align: left;
       margin: 5px;
   }
   .one{
       width: 25%;
       padding: 20px;
       font-size: 1.2rem;
   }
   .two{
       width: 75%;
       padding: 20px;
   }
 
   }
   .body{
       display: flex;
       justify-content: center;
       align-items: left;
       border: 1px dotted black;
   }
    /* tablet */
    @media (max-width: 768px) {
    width: 90%;
    .one{
    font-size: 1.2rem;
    }
    .two{
    font-size: 1rem;
    }
    }

    /* mobile */
    @media (max-width: 480px) {
    width: 99%;
    .one{
    font-size: 0.8rem;
    }
    .two{
    font-size: .8rem;
    }
    }
  
   }
`