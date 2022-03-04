import React from 'react';
import { useHistory } from 'react-router-dom';
// import { logout } from '../actions';


const Logout = () => {
    const { push } = useHistory();
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    push('/');
    

    return(
        <div></div>
    );
}


export default Logout;