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
        <div className="container">
            <header className="header">
                <h1>Registro de Usuario</h1>
            </header>
            <div className='left'>
            <div className="content">
                <form onSubmit={handleRegister}>
                    <p>Usuario:
                        <input className='usuario'
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </p>
                    <p>Contraseña:
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </p>
                    <button type="submit" className="ingresar">Registrarse</button>
                </form>
                {message && <p>{message}</p>}
                <div className="right">
                <img src="/images/registro.png" alt="imagen" />
                </div>
            </div>
            
            </div>
            <p>
                ¿Ya tienes una cuenta? <Link href="/">Ingresar</Link>
            </p>
        </div>
    );
};

export default RegisterView;
