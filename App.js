import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import CreateItem from './CreateItem';

function App() {
    const [page, setPage] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        setPage('home');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setPage('login');
    };

    // Always show LoginPage first if not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            setPage('login');
        } else if (page === 'login' || page === 'register') {
            setPage('home');
        }
    }, [isLoggedIn, page]);

    return (
        <div>
            <Navbar
                setPage={setPage}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
            />
            {/* Only show LoginPage if not logged in */}
            {!isLoggedIn && page === 'login' && <LoginPage handleLogin={handleLogin} />}
            {!isLoggedIn && page === 'register' && <RegisterPage />}
            {/* Show landing page and other features only if logged in */}
            {isLoggedIn && page === 'home' && <HomePage />}
            {isLoggedIn && page === 'create' && <CreateItem />}
        </div>
    );
}

export default App;
