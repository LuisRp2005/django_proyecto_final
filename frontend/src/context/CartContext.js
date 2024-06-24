import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Cargar el carrito del localStorage cuando el componente se monte
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        // Guardar el carrito en el localStorage cuando cambie
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (producto) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === producto.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...prevCart, { ...producto, cantidad: 1 }];
        });
    };

    const updateCartItem = (producto, cantidad) => {
        if (cantidad <= 0) {
            removeFromCart(producto);
        } else {
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.id === producto.id ? { ...item, cantidad } : item
                )
            );
        }
    };

    const removeFromCart = (producto) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== producto.id));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
