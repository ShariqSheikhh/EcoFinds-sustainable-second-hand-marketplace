// src/components/Navbar.js
import React from 'react';

const navStyle = { backgroundColor: '#f8f9fa', padding: '1rem', borderBottom: '1px solid #dee2e6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const logoStyle = { fontSize: '1.5rem', fontWeight: 'bold', color: '#28a745', cursor: 'pointer' };
const buttonStyle = { padding: '0.5rem 1rem', fontSize: '1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

function Navbar({ setPage }) { // Receive setPage as a prop
    return (
        <nav style={navStyle}>
            <div style={logoStyle} onClick={() => setPage('home')}>EcoFinds</div>
            <div>
                <button style={buttonStyle} onClick={() => setPage('create')}>List an Item</button>
            </div>
        </nav>
    );
}

export default Navbar;