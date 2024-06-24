import React from 'react';
import { Modal, Button } from 'react-bootstrap'; // Ajusta según el paquete de modales que estés usando

const ProductoModal = ({ producto, imagenes, onClose }) => {
    return (
        <Modal show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{producto.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Precio: s/.{producto.precio}</p>
                <p>Descripción: {producto.descripcion}</p>
                {imagenes[producto.id] && imagenes[producto.id].map(imagen => (
                    <img key={imagen.id} src={imagen.imagen} alt={`Imagen ${imagen.id}`} className="img-fluid mb-2" />
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProductoModal;
