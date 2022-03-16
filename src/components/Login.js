import React, { useState, useEffect  } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import schema from './validations/Schema';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { login } from '../actions';

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

const Login = ({ login }) => {
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
        login(formValues);
        push('/recipes');
    }

    useEffect(() => {
        schema.isValid(formValues).then((valid) => {
          setDisabled(!valid);
        });
      }, [formValues]);

    if(localStorage.getItem('token')) {
        return <Redirect to='/recipes' />
    } else {
    
    return (
    <All>
        <LoginContainer>
            <h3>Sign In</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className='label'>Username
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
                    <label className='label'>Password
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
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <button className="btn btn-primary btn-block" disabled={disabled}>Submit</button>
            </form>
        </LoginContainer>
    </All>
    )
}
}
const mapStateToProps = (state) => {
    return ({
        loggingIn: state.loggingIn,
    });
}


export default connect(mapStateToProps, { login })(Login);


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
const LoginContainer = styled.div` 
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
  background-color: white;


.form-group {
  padding: 1em 0;
}

.label {
  font-weight: 600;
}
`

// const Form = styled.div`
//     height: 40vh;
//     border: 1px solid black;
//     width: 20vw;
//     margin: auto;
//     form{
//         display: flex;
//         flex-direction: column;
//         justify-content: center;
//         align-items: center;
//         padding: 20px;
//         width: 25%;
//         padding: 20px;
//         margin: 50px auto ; 
//         font-size: 1.5rem;
//         }
//     Button{
//         display:flex;
//         flex-direction:row;
//         }
//     label{
//         margin: 10px;
//     }
// `
