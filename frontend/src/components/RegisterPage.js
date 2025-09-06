// frontend/src/components/RegisterPage.js
import React, { useState } from 'react';

// Reusing styles for consistency
const formStyle = { display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'};
const inputStyle = { marginBottom: '1rem', padding: '0.5rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' };
const buttonStyle = { padding: '0.75rem', fontSize: '1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' };

function RegisterPage({ setPage }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            alert('Registration successful! Please log in.');
            setPage('login');

        } catch (error) {
            console.error('Registration error:', error);
            alert(`Registration failed: ${error.message}`);
        }
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <h2>Create an Account</h2>
            <input type="text" placeholder="Username" style={inputStyle} value={username} onChange={e => setUsername(e.target.value)} required />
            <input type="email" placeholder="Email" style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" style={inputStyle} value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" style={buttonStyle}>Register</button>
        </form>
    );
}

export default RegisterPage;