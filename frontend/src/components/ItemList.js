// src/components/ItemList.js
import React from 'react';
import ItemCard from './ItemCard';

const listStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
};

function ItemList({ items }) {
    // The component receives an array of 'items' as a prop
    return (
        <div style={listStyle}>
            {items.map(item => (
                <ItemCard key={item.id} item={item} />
            ))}
        </div>
    );
}

export default ItemList;