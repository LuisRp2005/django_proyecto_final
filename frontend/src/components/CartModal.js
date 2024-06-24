import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

const CartModal = ({ show, onClose }) => {
    const { cart, updateCartItem, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [imagenes, setImagenes] = useState({});

    useEffect(() => {
        const fetchImagenes = async () => {
            try {
                const responseImagenes = await axios.get('http://127.0.0.1:8000/api/imagenes/');
                const imagenesPorProducto = {};
                responseImagenes.data.forEach(imagen => {
                    if (cart.find(item => item.id === imagen.producto)) {
                        if (!imagenesPorProducto[imagen.producto]) {
                            imagenesPorProducto[imagen.producto] = [];
                        }
                        imagenesPorProducto[imagen.producto].push(imagen);
                    }
                });
                setImagenes(imagenesPorProducto);
            } catch (error) {
                console.error("Hubo un error al obtener las imágenes:", error);
            }
        };

        fetchImagenes();
    }, [cart]);

    if (!show) {
        return null;
    }

    const handleRemoveFromCart = (producto) => {
        removeFromCart(producto);
    };

    const getTotal = () => {
        return cart.reduce((total, item) => total + (item.precio * item.cantidad), 0).toFixed(2);
    };

    const handleProceedToCheckout = () => {
        onClose(); // Cierra el modal
        navigate('/checkout'); // Navega a la página de checkout
    };

    const handleImageError = (e) => {
        e.target.src = '/placeholder-image.jpg'; // Ruta a tu imagen de placeholder
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-scrollable" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Carrito de Compras</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {cart.length === 0 ? (
                            <p>El carrito está vacío</p>
                        ) : (
                            <>
                                {cart.map((item, index) => (
                                    <div key={index} className="d-flex mb-4">
                                        {imagenes[item.id] && imagenes[item.id].length > 0 ? (
                                            <img
                                                src={imagenes[item.id][0].imagen}
                                                alt={item.nombre}
                                                className="img-thumbnail"
                                                style={{ width: '100px', height: '100px' }}
                                                onError={handleImageError}
                                            />
                                        ) : (
                                            <div className="d-flex justify-content-center align-items-center">
                                                <img
                                                    src="/placeholder-image.jpg"
                                                    alt={item.nombre}
                                                    className="img-thumbnail"
                                                    style={{ width: '100px', height: '100px' }}
                                                    onError={handleImageError}
                                                />
                                            </div>
                                        )}
                                        <div className="ms-3">
                                            <h5>{item.nombre}</h5>
                                            <p>${item.precio}</p>
                                            <div className="d-flex align-items-center">
                                                <button className="btn btn-outline-secondary btn-sm" onClick={() => updateCartItem(item, item.cantidad - 1)}>
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </button>
                                                <span className="mx-2">{item.cantidad}</span>
                                                <button className="btn btn-outline-secondary btn-sm" onClick={() => updateCartItem(item, item.cantidad + 1)}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                                <button className="btn btn-outline-danger btn-sm ms-2" onClick={() => handleRemoveFromCart(item)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <hr />
                                <div className="d-flex justify-content-end align-items-center">
                                    <button className="btn btn-primary me-3" onClick={handleProceedToCheckout}>Pagar</button>
                                    <h5 className="mb-0">Total: ${getTotal()}</h5>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
