import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/token',
          new URLSearchParams(formData),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        const { access_token } = response.data;
        localStorage.setItem('accessToken', access_token);
        console.log('Login successful!');
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account? <a href='register'>Register now!</a></p>
      </form>
    </div>
  );
};

export default Login;