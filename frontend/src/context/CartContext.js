// src/context/CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

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
