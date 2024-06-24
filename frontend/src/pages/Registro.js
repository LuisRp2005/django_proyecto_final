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
            <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label htmlFor="validationCustom01" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                    <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationCustom02" className="form-label">Apellidos</label>
                    <input
                        type="text"
                        className="form-control"
                        id="validationCustom02"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                        required
                    />
                    <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationCustom03" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="validationCustom03"
                        name="gmail"
                        value={formData.gmail}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">Please provide a valid email.</div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationCustom04" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="validationCustom04"
                        name="contrasena"
                        value={formData.contrasena}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">Please provide a valid password.</div>
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="invalidCheck"
                            required
                        />
                        <label className="form-check-label" htmlFor="invalidCheck">
                            Agree to terms and conditions
                        </label>
                        <div className="invalid-feedback">
                            You must agree before submitting.
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit">Registrar</button>
                </div>
            </form>
            <p className="mt-3">¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
        </div>
    );
};

export default Registro;
