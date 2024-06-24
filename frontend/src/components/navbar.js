// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../pages/styles.css';
import CartModal from './CartModal';

const Navbar = () => {
    const [showCartModal, setShowCartModal] = useState(false);

    const handleCartClick = () => {
        setShowCartModal(true);
    };

    const closeCartModal = () => {
        setShowCartModal(false);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/home" className="navbar-brand px-lg-4">
                        <h1 className="m-0 display-4">
                            Zapateria
                        </h1>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/productos" className="nav-link">Productos</Link>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" onClick={handleCartClick} style={{ cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </span>
                            </li>
                            <li className="nav-item">
                                <Link to="/registro" className="nav-link">
                                    <button className="btn btn-outline-light">Usuario</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <CartModal show={showCartModal} onClose={closeCartModal} />
        </>
    );
};

export default Navbar;
