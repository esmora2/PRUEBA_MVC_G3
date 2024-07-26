import React, { useState } from 'react';
import UserController from '../controllers/UserController';
import Link from 'next/link';

const RegisterView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const data = await UserController.register({ username, password });
            setMessage('Registration successful! You can now log in.');
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Registrarse</button>
            </form>
            {message && <p>{message}</p>}
            <p>
             Ya tienes una cuenta? <Link href="/">Ingresa</Link>
            </p>
        </div>
    );
};

export default RegisterView;
