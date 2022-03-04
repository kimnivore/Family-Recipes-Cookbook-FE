import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import schema from './validations/Schema';
import * as yup from 'yup';

import { connect } from 'react-redux';
import { register } from '../actions';

const initialFormValues = {
    username: '',
    password: ''
};
const initialFormErrors = {
    username: '',
    password: ''
};
const initialDisabled = true;

function Register()   {

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
           axios
           .post('https://family-recipes-cookbook1.herokuapp.com/api/auth/register', formValues)
           .then(resp => {
               console.log(resp);
               localStorage.setItem('username', resp.data.username);
               localStorage.setItem('password', resp.data.password);
               localStorage.setItem('token', resp.data.token);
               //push('/dashboard');
           })
           .catch(err => {
               console.log(err);
               alert('A valid username and password are required')
           })
       }

       useEffect(() => {
           schema.isValid(formValues).then((valid) => {
               setDisabled(!valid)
           });
       }, [formValues]);

    return (
    <div>
        <h1>Register your account</h1>
        <form onSubmit={handleSubmit}>
            <label>Username:
                <input
                type='text'
                name='username'
                value={formValues.username}
                onChange={handleChange}
            />
                {formErrors.username && <p>{formErrors.username}</p>}
            </label>
            <label>Password:
                <input
                type='password'
                name='password'
                value={formValues.password}
                onChange={handleChange}
            />
                {formErrors.password && <p>{formErrors.password}</p>}
            </label>
            <button disabled={disabled}>Register</button>
        </form>
    </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        registering: state.registering,
    })
}

export default connect(mapStateToProps, { register})(Register);
