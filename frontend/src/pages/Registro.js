import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './LoginAdmin.css';  // Importamos el CSS

const Registro = () => {
    const [formData, setFormData] = useState({ nombre: '', apellidos: '', gmail: '', contrasena: '' });
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/usuarios/', formData);
            login(response.data); 
            navigate('/productos'); 
        } catch (error) {
            console.error('Hubo un error al registrar el usuario:', error);
        }
    };

    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-box">
                    <div className="avatar">
                        <img src="https://i.pinimg.com/564x/07/89/d4/0789d494070409561d6167401bb06a83.jpg" alt="Logo" />  {/* Asegúrate de poner la ruta correcta de tu logo */}
                    </div>
                    <h2 className="login-title">Registro de Usuario</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="login-field">
                            <label htmlFor="nombre" className="login-label">Nombre</label>
                            <input
                                type="text"
                                className="login-input"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="login-field">
                            <label htmlFor="apellidos" className="login-label">Apellidos</label>
                            <input
                                type="text"
                                className="login-input"
                                id="apellidos"
                                name="apellidos"
                                value={formData.apellidos}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="login-field">
                            <label htmlFor="gmail" className="login-label">Email</label>
                            <input
                                type="email"
                                className="login-input"
                                id="gmail"
                                name="gmail"
                                value={formData.gmail}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="login-field">
                            <label htmlFor="contrasena" className="login-label">Contraseña</label>
                            <input
                                type="password"
                                className="login-input"
                                id="contrasena"
                                name="contrasena"
                                value={formData.contrasena}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">Registrar</button>
                    </form>
                    <p className="login-forgot-password">¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Registro;
