import React from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal';
import KitchenCookbook from '../images/thumbs/kitchencookbook.jpg';
import Cookbooks from '../images/thumbs/cookbooks.jpg';
import Board from '../images/thumbs/Board.jpg';


const Home = () => {

return (
    <HomeContainer>
        <div className='block'>
            <Fade bottom>
                <div className='card one'>
                    <div className='description'>
                        <h1>Family Recipes Cookbook</h1>
                        <p>A recipe manager where you can upload and save family recipes for future generations</p>
                    </div>
                    <div>
                        <a className='buttons' href='/login'><button>Login</button></a>
                        <a className='buttons' href='/register'><button>Register</button></a>
                    </div>
                </div>
            </Fade>
         
            <Fade bottom>
                <div className='card two'>
                    <div className='description'>
                        <h2>About</h2>
                        <p>Anyone can go out and buy a cookbook these days, this is a place where you can store and retrieve all of your family 
                            recipes </p>
                    </div>
                </div>
            </Fade>
            <Fade bottom>

                <div className='card three'>
                    <div className='description'>
                        <h2>Try Family Recipes Cookbook today!</h2>
                        <p> Users have the ability to register, login, logout and perform CRUD operations to a backend 
                            database which maintains the recipe collection. Frontend design implemented with React, 
                            JavaScript, Styled Components and React Bootstrap with CRUD functionality enabled via 
                            Axios calls. Backend structured with Node.js and Express, using Knex to seed and 
                            populate data within PostgreSQL backend. </p>
                    </div>
                </div>
            </Fade>

        </div>
    </HomeContainer>
)
}

export default Home;

const HomeContainer = styled.div`
.card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    padding: 10% 5%;
}
.buttons{ 
    margin-right: 10px;
}
.description{
    width: 40%;
}
.one{
    background-image: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${KitchenCookbook});
    background-repeat: no-repeat;
    background-position: right;
    background-size: contain;
    background-color: #e4c1f9;
    
}
.two{
    background-image: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${Cookbooks});
    background-repeat: no-repeat;
    background-position: left;
    background-size: contain;
    background-color: #a9def9;
    align-items: flex-end;
}
.three{
    background-image: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${Board});
    background-repeat: no-repeat;
    background-position: right;
    background-size: contain;
    background-color: #d0f4de;
}
`