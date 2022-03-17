import React, { useState, useEffect } from 'react'
import { useHistory, Redirect } from 'react-router-dom';
import schema from './validations/Schema';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { register } from '../actions';

import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from '../images/thumbs/07.jpg';

const initialFormValues = {
    username: '',
    password: ''
};
const initialFormErrors = {
    username: '',
    password: ''
};
const initialDisabled = true;

const Register = ({ register }) => {
    const { push } = useHistory();
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(initialDisabled);

    const validate = (name, value) => {
        yup.reach(schema, name)
            .validate(value)
            .then(() => setFormErrors({ ...formErrors, [name]: ''}))
            .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
    };

    const handleChange = (e, name, value) => {
        validate(name, value);
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        register(formValues)
       push('/recipes');
        }
        
    useEffect(() => {
        schema.isValid(formValues).then((valid) => {
            setDisabled(!valid)
        });
    }, [formValues]);


    if(localStorage.getItem('token')) {
        return <Redirect to='/recipes' />
    } else {

    return (
    <All>
        <RegisterContainer>
            <h3>Create an account</h3>
            <p>It's quick and easy</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className='label'>Username:
                            <input
                                type='text'
                                name='username'
                                value={formValues.username}
                                placeholder='Enter your username'
                                className='form-control'
                                onChange={handleChange}
                            />
                            {formErrors.username && <p>{formErrors.username}</p>}
                        </label>
                    </div>

                    <div className="form-group">
                        <label className='label'>Password:
                            <input
                            type='password'
                            name='password'
                            value={formValues.password}
                            placeholder='********'
                            className='form-control'
                            onChange={handleChange}
                        />
                            {formErrors.password && <p>{formErrors.password}</p>}
                        </label>
                    </div>
                        <button className="btn btn-primary btn-block" disabled={disabled}>Register</button>
                        <p>Already have an account?  <a href='/login'>  Sign in</a></p>
                </form>
        </RegisterContainer>
    </All>
    )
}
}

const mapStateToProps = (state) => {
    return ({
        registering: state.registering,
    });
}

export default connect(mapStateToProps, { register })(Register);

const All = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: blue;
    border: 1px solid black;
    background-image: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${Banner});
    background-repeat: no-repeat;
    background-position: left top;
    background-size: cover;

`
const RegisterContainer = styled.div` 
    border: 2px solid #d3d3d3;
    border-radius: .5em;
    margin-bottom: 1em;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    padding: 3em;
    text-align: left;
    width: 40%;
    height: auto;
    background-color: #fbfefb;

    h3 {
    font-size: 2rem;
    margin-bottom: 10px;
    text-align: center;
    }

    p{
    font-size: 1rem;
    text-align: center;
    }

    button{
    margin-bottom: 20px;
    }

    .form-group {
    padding: 1em 0;
    }

    .label {
    font-weight: 600;
    }

    /* tablet */
    @media (max-width: 768px) {
    width: 80%;

    h3{
    font-size: 1.5rem;
    }
    p{
    font-size: 1rem;
    }
    }

    /* mobile */
    @media (max-width: 480px) {
    width: 90%;

    h3{
    font-size: 1.3rem;
    }
    p{
    font-size: 1rem;
    }
`
