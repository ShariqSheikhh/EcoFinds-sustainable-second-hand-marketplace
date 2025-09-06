// frontend/src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CreateItem from './components/CreateItem';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage'; // <-- Import the new page
import './App.css';

function App() {
  const [page, setPage] = useState('home'); // 'home', 'create', 'register', or 'login'

  return (
    <div className="App">
      <Navbar setPage={setPage} />
      <main className="app-container">
        {page === 'home' && <HomePage />}
        {page === 'create' && <CreateItem setPage={setPage} />}
        {page === 'register' && <RegisterPage setPage={setPage} />}
        {/* Add this line to show the new page */}
        {page === 'login' && <LoginPage setPage={setPage} />}
      </main>
    </div>
  );
}

export default App;