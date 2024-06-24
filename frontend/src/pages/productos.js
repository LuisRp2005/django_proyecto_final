import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import '../pages/styles.css';
import CategoriasColumn from '../components/categoria'; // Ajustado el nombre del componente
import ProductoModal from '../components/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';

const Productos = () => {
    const { addToCart } = useContext(CartContext);
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(null);
    const [imagenes, setImagenes] = useState({});
    const [modalProducto, setModalProducto] = useState(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null); // Estado para la categoría seleccionada
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const url = categoriaSeleccionada ?
                    `http://127.0.0.1:8000/api/productos/?categoria=${categoriaSeleccionada}` :
                    'http://127.0.0.1:8000/api/productos/';

                const responseProductos = await axios.get(url);
                setProductos(responseProductos.data);

                const productosIds = responseProductos.data.map(producto => producto.id);
                await fetchImagenes(productosIds);
            } catch (error) {
                console.error("Hubo un error al obtener los productos:", error);
                setError("Hubo un error al obtener los productos. Inténtalo de nuevo más tarde.");
            }
        };

        const fetchImagenes = async (productosIds) => {
            try {
                const responseImagenes = await axios.get('http://127.0.0.1:8000/api/imagenes/');
                const imagenesPorProducto = {};
                responseImagenes.data.forEach(imagen => {
                    if (productosIds.includes(imagen.producto)) {
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

        const fetchCategorias = async () => {
            try {
                const responseCategorias = await axios.get('http://127.0.0.1:8000/api/categorias/');
                setCategorias(responseCategorias.data);
            } catch (error) {
                console.error("Hubo un error al obtener las categorías:", error);
                setError("Hubo un error al obtener las categorías. Inténtalo de nuevo más tarde.");
            }
        };

        fetchProductos();
        fetchCategorias();
    }, [categoriaSeleccionada]);

    const handleImageError = (e) => {
        e.target.src = '/placeholder-image.jpg';
    };

    const openModal = (producto) => {
        setModalProducto(producto);
    };

    const closeModal = () => {
        setModalProducto(null);
    };

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
                    <CategoriasColumn categorias={categorias} onCategoriaClick={filtrarPorCategoria} />

                    <div className="col-md-9">
                        <div className="productos">
                            <h1 className="text-4xl text-center font-bold text-blue-600">Descubre Nuestros Productos</h1>

                            {error && <p className="error-message">{error}</p>}
                            {showAlert && (
                                <div className="alert alert-success alert-dismissible fade show" role="alert">
                                    Añadido al carrito correctamente.
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            )}
                            <div className="row mt-5">
                                {productos.map(producto => (
                                    <div key={producto.id} className="col-md-4 mb-4">
                                        <div className="card h-100">
                                            {imagenes[producto.id] && imagenes[producto.id].length > 0 ? (
                                                <img
                                                    src={imagenes[producto.id][0].imagen}
                                                    className="card-img-top h-100"
                                                    alt={producto.nombre}
                                                    onError={handleImageError}
                                                />
                                            ) : (
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <img
                                                        src="/placeholder-image.jpg"
                                                        className="card-img-top h-100"
                                                        alt={producto.nombre}
                                                        onError={handleImageError}
                                                    />
                                                </div>
                                            )}
                                            <div className="card-body">
                                                <h5 className="card-title">{producto.nombre}</h5>
                                                <p className="card-text">s/.{producto.precio}</p>
                                                <button className="btn btn-primary btn-sm" onClick={() => openModal(producto)}>Ver más</button>
                                                <button className="btn btn-success btn-sm mx-2" onClick={() => handleAddToCart(producto)}>Añadir Producto <FontAwesomeIcon icon={faShoppingCart} /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
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
