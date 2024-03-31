import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch('http://localhost:8000/welcome/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setUsername(data.username);
      } else {
        localStorage.removeItem('accessToken');
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;