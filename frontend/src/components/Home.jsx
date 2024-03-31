import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'; 

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    setIsLoggedIn(false);
                    return;
                }
                const response = await axios.get('http://127.0.0.1:8000/welcome', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsername(response.data.message);
                setIsLoggedIn(true);
            } catch (error) {
                console.error(error);
                setIsLoggedIn(false);
            }
        };

        checkLoggedIn();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };
    console.log(isLoggedIn)
    return (   
        <div className="home-container">
            {isLoggedIn ? (
                <>
                    <h1>{username}</h1>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </>
            ) : (
                <div className="welcome-message">
                    <p>"The gift of blood is the gift of life. Consider donating today!"</p>
                    <div className="buttons">
                        <button onClick={() => window.location.href = '/login'}>Login</button>
                        <button onClick={() => window.location.href = '/register'}>Register</button>
                    </div>
                    <p>Our app will help you connect with nearby donors and those in need.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
