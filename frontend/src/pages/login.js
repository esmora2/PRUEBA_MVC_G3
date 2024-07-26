import React from 'react';
import UserView from '../views/UserView';

const Login = () => {
    const handleLogin = (token) => {
        // Handle login
    };

    return (
        <div>
            <UserView onLogin={handleLogin} />
        </div>
    );
};

export default Login;
