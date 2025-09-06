// src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CreateItem from './components/CreateItem';
import './App.css';

function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="App">
      <Navbar setPage={setPage} />
      {page === 'home' && <HomePage />}
      {/* This is the line we're updating */}
      {page === 'create' && <CreateItem setPage={setPage} />}
    </div>
  );
}

export default App;