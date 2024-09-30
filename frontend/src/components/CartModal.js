import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

const CartModal = ({ show, onClose }) => {
    // Obtener funciones y estado del contexto del carrito
    const { cart, updateCartItem, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate(); // Hook para navegar a otras rutas
    const [imagenes, setImagenes] = useState({}); // Estado para almacenar las imágenes de los productos

    // useEffect para obtener las imágenes de los productos en el carrito
    useEffect(() => {
        const fetchImagenes = async () => {
            try {
                // Obtener las imágenes desde el servidor
                const responseImagenes = await axios.get('http://127.0.0.1:8000/api/imagenes/');
                const imagenesPorProducto = {};
                responseImagenes.data.forEach(imagen => {
                    // Asignar las imágenes a sus respectivos productos en el carrito
                    if (cart.find(item => item.id === imagen.producto)) {
                        if (!imagenesPorProducto[imagen.producto]) {
                            imagenesPorProducto[imagen.producto] = [];
                        }
                        imagenesPorProducto[imagen.producto].push(imagen);
                    }
                });
                setImagenes(imagenesPorProducto); // Actualizar el estado de las imágenes
            } catch (error) {
                console.error("Hubo un error al obtener las imágenes:", error);
            }
        };

        fetchImagenes(); // Llamar a la función para obtener las imágenes
    }, [cart]); // Ejecutar el efecto cada vez que cambia el carrito

    if (!show) {
        return null; // Si el modal no debe mostrarse, retornar null
    }

    // Manejar la eliminación de un producto del carrito
    const handleRemoveFromCart = (producto) => {
        removeFromCart(producto);
    };

    // Calcular el total del carrito
    const getTotal = () => {
        return cart.reduce((total, item) => total + (item.precio * item.cantidad), 0).toFixed(2);
    };

    // Manejar la navegación a la página de checkout
    const handleProceedToCheckout = () => {
        onClose(); // Cierra el modal
        navigate('/checkout'); // Navega a la página de checkout
    };

    // Manejar el error de carga de imágenes
    const handleImageError = (e) => {
        e.target.src = '/placeholder-image.jpg'; // Ruta a la imagen de placeholder
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
