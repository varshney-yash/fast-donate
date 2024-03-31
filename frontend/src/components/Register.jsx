import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const bloodTypes = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
];

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      username: '',
      password: '',
      blood_group: '',
      role: '',
    });
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    localStorage.removeItem('accessToken');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/register', formData);
      console.log(response.data);
      setShowSuccessPopup(true); // Show the success popup
      setTimeout(() => {
        setShowSuccessPopup(false); // Hide the success popup after 3 seconds
        navigate('/login'); // Navigate to the login page
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-container">
        {showSuccessPopup && (
            <div className="success-popup">
            <p>Registration successful!</p>
            </div>
        )}
        <form onSubmit={handleSubmit} className="register-form">
            <h2>Welcome, let's get you started</h2>
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
            <div className="form-group">
            <label htmlFor="blood_group">Blood Group</label>
            <select
                id="blood_group"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                required
            >
                <option value="">Select...</option>
                {bloodTypes.map((type) => (
                <option key={type.value} value={type.value}>
                    {type.label}
                </option>
                ))}
            </select>
            </div>
            <div className="form-group">
            <label>Why are you here?</label>
            <div className="radio-group">
                <input
                type="radio"
                id="donor"
                name="role"
                value="donor"
                onChange={handleChange}
                required
                />
                <label htmlFor="donor">I want to donate blood</label>
            </div>
            <div className="radio-group">
                <input
                type="radio"
                id="needy"
                name="role"
                value="needy"
                onChange={handleChange}
                required
                />
                <label htmlFor="needy">I am in need of blood</label>
            </div>
            </div>
            <button type="submit">Register</button>
            <p>Already registered? <a href='/login'>Login now!</a></p>
      </form>
    </div>
  );
};

export default Register;