import React, { useState } from 'react';
import UserController from '../controllers/UserController';
import Link from 'next/link';

const UserView = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await UserController.login({ username, password });
            setMessage('Login successful!');
            onLogin(data.token);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Ingresar</button>
            </form>
            {message && <p>{message}</p>}
            <p>
                No tienes una cuenta? <Link href="/register">Registrate</Link>
            </p>
        </div>
    );
};

export default UserView;
