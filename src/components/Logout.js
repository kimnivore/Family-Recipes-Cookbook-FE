import React from 'react';
import { useHistory } from 'react-router-dom';



const Logout = () => {
    const { push } = useHistory();
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    push('/home');
    

    return(
        <div></div>
    );
}


export default Logout;