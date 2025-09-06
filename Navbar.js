import React from 'react';

function Navbar({ setPage, isLoggedIn, handleLogout }) {
    return (
        <nav>
            {isLoggedIn ? (
                <>
                    <button onClick={() => setPage('home')}>Home</button>
                    <button onClick={() => setPage('create')}>List an Item</button>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <button onClick={() => setPage('login')}>Login</button>
                    <button onClick={() => setPage('register')}>Register</button>
                </>
            )}
        </nav>
    );
}

export default Navbar;
