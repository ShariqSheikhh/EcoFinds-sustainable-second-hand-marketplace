// frontend/src/components/ItemList.js
import React from 'react';
import ItemCard from './ItemCard';
import './ItemList.css'; // Import the new CSS file

function ItemList({ items }) {
    return (
        <div className="item-list">
            {items.map(item => (
                <ItemCard key={item.id} item={item} />
            ))}
        </div>
    );
}

export default ItemList;