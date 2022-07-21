import React from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal';


const Home = () => {

return (
    <HomeContainer>
        <div className='block'>
            <Fade bottom>
                <div className='card one'>
                    <h1>FAMILY RECIPES COOKBOOK APP</h1>
                    <p>Savings recipes for future generations</p>
                    <button>Login</button>
                    <button>Register</button>
                </div>
            </Fade>
            <Fade bottom>
                <div className='card'>
                    <h2>About</h2>
                    <p>Family Recipes Cookbook is a recipe manager where you can import and save your family recipes.</p>
                </div>
            </Fade>
            <div >

            </div>

        </div>
    </HomeContainer>
)
}

export default Home;

const HomeContainer = styled.div`
.card {
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 50%;
    padding: 10% 20%;
    button{
    width: 20%;
    margin: 10px 0;
    flex-direction: ro
}
}

`