import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <div className="container h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Inicio de Sesión</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Correo Electrónico:</label>
                        <input
                            type="email"
                            className="form-input mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Contraseña:</label>
                        <input
                            type="password"
                            className="form-input mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                {alert.message && (
                    <div className={`mt-4 p-4 text-sm text-white bg-${alert.type === 'danger' ? 'red' : 'green'}-500 rounded-lg`}>
                        {alert.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginAdmin;
