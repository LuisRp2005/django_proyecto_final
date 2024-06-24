import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginAdmin.css';  // Importamos el CSS personalizado

const LoginAdmin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setAlert({ type: 'danger', message: 'Por favor ingrese correo electrónico y contraseña' });
            setTimeout(() => setAlert({ type: '', message: '' }), 4000);
            return;
        }

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/usuarios/');
            console.log('API Response:', response.data);  // Mensaje de depuración para verificar la respuesta de la API

            const usuario = response.data.find(user => user.gmail === email && user.contrasena === password);
            console.log('Usuario encontrado:', usuario);  // Mensaje de depuración para verificar el usuario encontrado

            if (usuario) {
                setAlert({ type: 'success', message: 'Inicio de sesión exitoso' });
                setTimeout(() => {
                    setAlert({ type: '', message: '' });
                    navigate('/productos');
                }, 2000);
            } else {
                setAlert({ type: 'danger', message: 'Usuario no autorizado' });
                setTimeout(() => setAlert({ type: '', message: '' }), 4000);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setAlert({ type: 'danger', message: 'Error al iniciar sesión. Verifique sus credenciales.' });
            setTimeout(() => setAlert({ type: '', message: '' }), 4000);
        }
    };

    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-box">
                    <div className="avatar">
                        <img src="https://i.pinimg.com/564x/07/89/d4/0789d494070409561d6167401bb06a83.jpg" alt="Logo" />  {/* Asegúrate de poner la ruta correcta de tu logo */}
                    </div>
                    <h2 className="login-title">Log In</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="login-field">
                            <label htmlFor="email" className="login-label">Username</label>
                            <input
                                type="email"
                                className="login-input"
                                id="email"
                                placeholder="Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login-field">
                            <label htmlFor="password" className="login-label">Password</label>
                            <input
                                type="password"
                                className="login-input"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login-remember-me">
                            <input type="checkbox" id="rememberMe" />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    <div className="login-forgot-password">
                        <a href="/forgot-password">Forgot Password?</a>
                    </div>
                    {alert.message && (
                        <div className={`login-alert login-alert-${alert.type}`}>
                            {alert.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginAdmin;
