import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Productos from './pages/productos';
import Checkout from './pages/Checkout';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <UserProvider>
            <Router>
                <div>
                    <Routes>
                        <Route path="/productos" element={<Productos />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/registro" element={<Registro />} />
                        <Route path="/login" element={<Login />} />
                        <Route path='/home' element={<Home />} />
                        
                        {/* Agrega más rutas según las necesidades de tu aplicación */}
                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;
