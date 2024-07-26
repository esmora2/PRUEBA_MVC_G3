import React from 'react';
import UserView from '../views/UserView';

const Login = () => {
    const handleLogin = (token) => {

    };

    return (
        <div>
            <UserView onLogin={handleLogin} />
        </div>
    );
};

export default Login;
