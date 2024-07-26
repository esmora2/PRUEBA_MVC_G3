import React, { useState } from 'react';
import UserView from '../views/UserView';
import TaskView from '../views/TaskView';

const Home = () => {
    const [token, setToken] = useState('');

    const handleLogin = (token) => {
        setToken(token);
    };

    return (
        <div>
            {!token ? (
                <UserView onLogin={handleLogin} />
            ) : (
                <TaskView token={token} />
            )}
        </div>
    );
};

export default Home;
