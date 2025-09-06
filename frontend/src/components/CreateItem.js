// frontend/src/components/CreateItem.js
import React, { useState } from 'react';

const formStyle = { display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'};
const inputStyle = { marginBottom: '1rem', padding: '0.5rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' };
const buttonStyle = { padding: '0.75rem', fontSize: '1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

function CreateItem({ setPage }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newItem = {
            title,
            price: parseFloat(price), // Ensure price is a number
            description,
            imageUrl,
            sellerId: 1
        };

        fetch('http://localhost:3001/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Item listed successfully!');
            setPage('home');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error listing item.');
        });
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <h2>List a New Item</h2>
            <input type="text" placeholder="Item Title" style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} required />
            <input type="number" placeholder="Price" style={inputStyle} value={price} onChange={e => setPrice(e.target.value)} required />
            <input type="text" placeholder="Image URL" style={inputStyle} value={imageUrl} onChange={e => setImageUrl(e.target.value)} required />
            <textarea placeholder="Description" style={inputStyle} rows="4" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            <button type="submit" style={buttonStyle}>List Item</button>
        </form>
    );
}

export default CreateItem;