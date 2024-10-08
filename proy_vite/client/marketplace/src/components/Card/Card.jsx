import React from 'react';
import './Card.css';
const Card = ({ imageUrl, description, price }) => {
    const handleAddToCart = () => {
        alert(`${description} agregado al carrito`);
    };
    
    return (
        <div className="card">
            <img className="card-image" src={imageUrl} alt={`Imagen de ${description}`} />
            <p>{description}</p>
            <p>{price}</p>
            <button className='buttonCard' onClick={handleAddToCart} >Añadir al carrito</button>
        </div>
    );
}

export default Card;