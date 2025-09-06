// frontend/src/components/ItemCard.js
import React from 'react';
import './ItemCard.css';

function ItemCard({ item }) {
    if (!item) {
        return null;
    }

    const handleBuyClick = () => {
        // This is a placeholder for the demo. A real app would have a checkout or messaging system.
        alert('To purchase, please contact the seller at: seller@example.com');
    };

    return (
        <div className="item-card">
            <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="item-image" 
                onError={(e) => { e.target.onerror = null; e.target.src="https://i.imgur.com/QNtHkAI.png" }}
            />
            <div className="item-content">
                <p className="item-title">{item.title}</p>
                <p className="item-price">${item.price}</p>
                <p className="item-description">{item.description}</p>
                <p className="item-co2">🍃 Est. {item.co2_saved ? item.co2_saved.toFixed(1) : 0} kg CO2 saved!</p>
            </div>
            <button className="buy-button" onClick={handleBuyClick}>Contact Seller</button>
        </div>
    );
}

export default ItemCard;