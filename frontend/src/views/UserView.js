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
        <div className="container">
            <header className="header">
                <h1>Gestor de Tareas - JESA</h1>
            </header>
            <nav className="nav">
                <Link href="/">Inicio</Link>
                <Link href="/">Información</Link>
                <Link href="/">Contacto</Link>
            </nav>
            <div className="content">
                <div className="left">
                    <form onSubmit={handleLogin}>
                        <p>Usuario:
                            <input
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                        </p>
                        <p>Contraseña:
                            <input className='contrasena'
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </p>
                        <button type="submit" className='ingresar'>Ingresar</button>
                    </form>
                    {message && <p>{message}</p>}
                    <p>
                        ¿No tienes una cuenta? <Link href="/register" className='registro'>Regístrate</Link>
                    </p>
                </div>
                <div className="right">
                    <img src="/images/inicio.gif" alt="imagen" />
                </div>
            </div>
        </div>
    );
};

export default UserView;
