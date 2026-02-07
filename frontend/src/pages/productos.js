import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import Navbar from '../components/navbar';
import CategoriasColumn from '../components/categoria';
import ProductoModal from '../components/modal';
import { CartContext } from '../context/CartContext';
import '../pages/styles.css';

const Productos = () => {
    const { addToCart } = useContext(CartContext);

    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [imagenes, setImagenes] = useState({});
    const [modalProducto, setModalProducto] = useState(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    // Obtener imágenes
    const fetchImagenes = async (productosIds) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/imagenes/');
            const imagenesPorProducto = {};

            response.data.forEach(imagen => {
                if (productosIds.includes(imagen.producto)) {
                    if (!imagenesPorProducto[imagen.producto]) {
                        imagenesPorProducto[imagen.producto] = [];
                    }
                    imagenesPorProducto[imagen.producto].push(imagen);
                }
            });

            setImagenes(imagenesPorProducto);
        } catch (err) {
            console.error("Error al obtener imágenes:", err);
        }
    };

    // Obtener productos
    const fetchProductos = async () => {
        try {
            setError(null);
            const url = categoriaSeleccionada
                ? `http://127.0.0.1:8000/api/productos/?categoria=${categoriaSeleccionada}`
                : 'http://127.0.0.1:8000/api/productos/';

            const response = await axios.get(url);
            setProductos(response.data);

            const productosIds = response.data.map(p => p.id);
            await fetchImagenes(productosIds);
        } catch (err) {
            console.error("Error al obtener productos:", err);
            setError("No se pudieron obtener los productos. Inténtalo más tarde.");
        }
    };

    // Obtener categorías
    const fetchCategorias = async () => {
        try {
            setError(null);
            const response = await axios.get('http://127.0.0.1:8000/api/categorias/');
            setCategorias(response.data);
        } catch (err) {
            console.error("Error al obtener categorías:", err);
            setError("No se pudieron obtener las categorías.");
        }
    };

    useEffect(() => {
        fetchProductos();
        fetchCategorias();
    }, [categoriaSeleccionada]);

    const handleImageError = (e) => {
        e.target.src = '/placeholder-image.jpg';
    };

    const openModal = (producto) => setModalProducto(producto);
    const closeModal = () => setModalProducto(null);

    const filtrarPorCategoria = (categoriaId) => {
        setCategoriaSeleccionada(categoriaId);
    };

    const handleAddToCart = (producto) => {
        addToCart(producto);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 4000);
    };

    return (
        <div className="App">
            <Navbar />

            <div className="container mt-4">
                <div className="row">
                    <CategoriasColumn
                        categorias={categorias}
                        onCategoriaClick={filtrarPorCategoria}
                    />

                    <div className="col-md-9">
                        <h1 className="text-4xl text-center font-bold text-blue-600 mb-4">
                            Descubre Nuestros Productos
                        </h1>

                        {error && <p className="error-message">{error}</p>}

                        {showAlert && (
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                Añadido al carrito correctamente.
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="alert"
                                    aria-label="Close"
                                ></button>
                            </div>
                        )}

                        <div className="row mt-4">
                            {productos.map(producto => (
                                <div key={producto.id} className="col-md-4 mb-4">
                                    <div className="card h-100">
                                        <img
                                            src={
                                                imagenes[producto.id]?.[0]?.imagen ||
                                                '/placeholder-image.jpg'
                                            }
                                            className="card-img-top h-100"
                                            alt={producto.nombre}
                                            onError={handleImageError}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{producto.nombre}</h5>
                                            <p className="card-text">s/. {producto.precio}</p>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => openModal(producto)}
                                            >
                                                Ver más
                                            </button>
                                            <button
                                                className="btn btn-success btn-sm mx-2"
                                                onClick={() => handleAddToCart(producto)}
                                            >
                                                Añadir Producto <FontAwesomeIcon icon={faShoppingCart} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {modalProducto && (
                <ProductoModal
                    producto={modalProducto}
                    imagenes={imagenes}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default Productos;
