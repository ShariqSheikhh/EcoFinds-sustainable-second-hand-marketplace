// frontend/src/components/Navbar.js
import React from 'react';

const navStyle = { backgroundColor: '#ffffff', padding: '1rem 2rem', borderBottom: '1px solid #dee2e6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' };
const logoStyle = { fontSize: '1.5rem', fontWeight: 'bold', color: '#28a745', cursor: 'pointer' };
const buttonGroupStyle = { display: 'flex', gap: '1rem', alignItems: 'center' };
const primaryButtonStyle = { padding: '0.5rem 1rem', fontSize: '1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' };
const secondaryButtonStyle = { padding: '0.5rem 1rem', fontSize: '1rem', backgroundColor: 'transparent', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };

function Navbar({ setPage }) {
    return (
        <nav style={navStyle}>
            <div style={logoStyle} onClick={() => setPage('home')}>EcoFinds</div>
            <div style={buttonGroupStyle}>
                <button style={secondaryButtonStyle} onClick={() => setPage('home')}>Home</button>
                <button style={secondaryButtonStyle} onClick={() => setPage('login')}>Login</button>
                <button style={secondaryButtonStyle} onClick={() => setPage('register')}>Register</button>
                <button style={primaryButtonStyle} onClick={() => setPage('create')}>List an Item</button>
            </div>
        </nav>
    );
}

export default Navbar;