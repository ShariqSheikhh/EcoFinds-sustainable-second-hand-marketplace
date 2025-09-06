// src/components/ItemCard.js
import React from 'react';

// Some basic styling for the card
const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
};

const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold'
};

function ItemCard({ item }) {
    // The component receives an 'item' object as a prop
    return (
        <div style={cardStyle}>
            <p style={titleStyle}>{item.title}</p>
            <p>${item.price}</p>
            <p>{item.description}</p>
        </div>
    );
}

export default ItemCard;