import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });
    const navigate = useNavigate();

    const getTotal = () => {
        return cart.reduce((total, item) => total + (item.precio * item.cantidad), 0).toFixed(2);
    };

    const handleCardChange = (e) => {
        setCardDetails({
            ...cardDetails,
            [e.target.name]: e.target.value
        });
    };

    const handlePayment = () => {
        const { number, expiry, cvc } = cardDetails;
        if (number && expiry && cvc) {
            alert('¡Pago realizado con éxito!');
            clearCart();
            navigate('/productos'); 
        } else {
            alert('Por favor, complete todos los campos de la tarjeta');
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Forma de Pago</h1>
            <div className="row">
                <div className="col-md-8">
                    <h3>Resumen del Pedido</h3>
                    {cart.map((item, index) => (
                        <div key={index} className="d-flex mb-4">
                            <img src={item.imagen} alt={item.nombre} className="img-thumbnail" style={{ width: '100px', height: '100px' }} />
                            <div className="ms-3">
                                <h5>{item.nombre}</h5>
                                <p>${item.precio} x {item.cantidad}</p>
                                <p>Subtotal: ${(item.precio * item.cantidad).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                    <hr />
                    <h4>Total: ${getTotal()}</h4>
                </div>
                <div className="col-md-4">
                    <h3>Detalles del Pago con tarjeta </h3>
                    <div className="mb-3">
                        <label htmlFor="cardNumber" className="form-label">Número de Tarjeta</label>
                        <input type="number" className="form-control" id="cardNumber" name="number" value={cardDetails.number} onChange={handleCardChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cardExpiry" className="form-label">Fecha de Vencimiento</label>
                        <input type="number" className="form-control" id="cardExpiry" name="expiry" value={cardDetails.expiry} onChange={handleCardChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cardCvc" className="form-label">CVC</label>
                        <input type="number" className="form-control" id="cardCvc" name="cvc" value={cardDetails.cvc} onChange={handleCardChange} />
                    </div>
                    <button className="btn btn-primary" onClick={handlePayment}>Realizar Pago</button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
