import React from 'react';

const CategoriasColumn = ({ categorias, onCategoriaClick }) => {
    const handleClick = (categoriaId) => {
        onCategoriaClick(categoriaId); // Llama a la función en el padre con el ID de la categoría
    };

    return (
        <div className="col-md-3">
            <div className="categorias">
                <h3>Categorías</h3>
                <ul className="list-group">
                    {categorias.map(categoria => (
                        <li key={categoria.id} className="list-group-item" onClick={() => handleClick(categoria.id)}>
                            {categoria.nombre}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


export default CategoriasColumn;
