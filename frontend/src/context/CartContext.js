import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto del carrito
export const CartContext = createContext();

// Componente proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
    // Estado del carrito
    const [cart, setCart] = useState([]);

    // useEffect para cargar el carrito desde localStorage cuando el componente se monta
    useEffect(() => {
        // Obtener el carrito guardado del localStorage
        const savedCart = localStorage.getItem('cart');
        // Si hay un carrito guardado, actualizar el estado del carrito
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []); // El array vacío indica que este efecto solo se ejecuta una vez al montar el componente

    // useEffect para guardar el carrito en localStorage cada vez que cambia el estado del carrito
    useEffect(() => {
        // Guardar el estado actual del carrito en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]); // Este efecto se ejecuta cada vez que cambia el carrito

    // Función para añadir un producto al carrito
    const addToCart = (producto) => {
        setCart((prevCart) => {
            // Verificar si el producto ya existe en el carrito
            const existingItem = prevCart.find((item) => item.id === producto.id);
            if (existingItem) {
                // Si el producto ya existe, incrementar su cantidad
                return prevCart.map((item) =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            // Si el producto no existe, añadirlo al carrito con cantidad 1
            return [...prevCart, { ...producto, cantidad: 1 }];
        });
    };

    // Función para actualizar la cantidad de un producto en el carrito
    const updateCartItem = (producto, cantidad) => {
        if (cantidad <= 0) {
            // Si la cantidad es menor o igual a 0, eliminar el producto del carrito
            removeFromCart(producto);
        } else {
            // Si la cantidad es mayor a 0, actualizar la cantidad del producto
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.id === producto.id ? { ...item, cantidad } : item
                )
            );
        }
    };

    // Función para eliminar un producto del carrito
    const removeFromCart = (producto) => {
        // Filtrar los productos del carrito que no coinciden con el id del producto a eliminar
        setCart((prevCart) => prevCart.filter((item) => item.id !== producto.id));
    };

    // Función para vaciar el carrito
    const clearCart = () => {
        // Establecer el estado del carrito como un array vacío
        setCart([]);
    };

    // Proveer el contexto del carrito a los componentes hijos
    return (
        <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
