import * as yup from 'yup';

const Schema = yup.object().shape({
    username: yup
        .string()
        .trim()
        .min(3, 'Username has to be at least 3 characters long')
        .required('Username is required!'),
    password: yup
        .string()
        .trim()
        .min(3, 'Password has to be at least 3 characters long')
        .required('Password is required!'),

    })
    export default Schema;