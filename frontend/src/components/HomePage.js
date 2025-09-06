// src/components/HomePage.js
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import ItemList from './ItemList';

const homeStyle = {
    padding: '2rem',
    textAlign: 'center'
};

function HomePage() {
    // Create a state to hold our items, initially an empty array
    const [items, setItems] = useState([]);

    // useEffect runs once when the component loads
    useEffect(() => {
        // Fetch data from our backend API
        fetch('http://localhost:3001/api/items')
            .then(response => response.json())
            .then(data => {
                setItems(data.data); // Update the state with the fetched items
            })
            .catch(error => console.error("Error fetching items:", error));
    }, []); // The empty array [] means this effect runs only once

    return (
        <div style={homeStyle}>
            <h1>Welcome to the Marketplace</h1>
            <p>See what treasures you can find!</p>
            <ItemList items={items} />
        </div>
    );
}

export default HomePage;