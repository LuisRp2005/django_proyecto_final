import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

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
        <div className="container mt-4">
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                    <input
                        type="text"
                        className="form-control"
                        id="apellidos"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="gmail" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="gmail"
                        name="gmail"
                        value={formData.gmail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="contrasena" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="contrasena"
                        name="contrasena"
                        value={formData.contrasena}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
            <p className="mt-3">¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
        </div>
    );
};

export default Registro;
