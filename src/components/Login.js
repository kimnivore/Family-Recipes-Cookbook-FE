import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import schema from './validations/Schema';
import * as yup from 'yup';



const initialFormValues = {
    username: '',
    password: ''
};
const initialFormErrors = {
    username: '',
    password: ''
};

const initialDisabled = true;

function Home()   {
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
        axios.post('https://family-recipes-cookbook1.herokuapp.com/api/auth/login', formValues)
       .then(resp => {
           localStorage.setItem('token', resp.data.token);
           localStorage.setItem('user_id', resp.data.user_id);
           push('/my-recipes');
       })
       .catch(err => {
           console.log(err);
           alert('A valid username and password are required')
       })
    }

    useEffect(() => {
        schema.isValid(formValues).then((valid) => {
          setDisabled(!valid);
        });
      }, [formValues]);

    const handleCreate = () => {
        push('/signup');
    }

    return (
        <div className='HomePage'>
            <h1 className='Title'>Recipes</h1>
                <p className='Intro'>Saving recipes for future generations</p>
                    <h2 className='Instructions'>Login Or Create an Account</h2>
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
                        <button disabled={disabled} className = "LoginButton">Login</button>
                    </form>
                    <div className = "buttons">
                        <button onClick={handleCreate} className = "CreateAccountButton">Create Account</button>
                    </div>
        </div>
            
    )
}

export default Home;