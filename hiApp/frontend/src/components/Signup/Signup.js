import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

 /* const validateInput = async () => {
    try {
      await axios.post('https://hiapp-backend.cloud-stacks.com/api/signup/validation', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return {};
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const newErrors = {};
        error.response.data.errors.forEach((err) => {
          newErrors[err.param] = err.msg;
        });
        return newErrors;
      }
      return { general: 'Validation failed' };
    }
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*const validationErrors = await validateInput();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {*/
      try {
        await axios.post('https://hiapp-backend.cloud-stacks.com/api/signup', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setSuccessMessage('Account successfully created');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        if (error.response && error.response.data.error) {
          setErrors({ general: error.response.data.error });
        }
      }
    
  };

  return (
    <div className="signup-container">
      <header className="signup-header">
        <img src="https://agent-dev.obelion.ai/static/images/d419397a-91c0-494b-97f6-f9e08cb0e767.png" alt="App Logo" className="app-logo" />
      </header>
      <nav className="signup-nav">
        <ul>
          <li style={{ color: '#007BFF' }}>Home</li>
          <li style={{ color: '#007BFF' }}>Features</li>
          <li style={{ color: '#007BFF' }}>Contact</li>
        </ul>
      </nav>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ color: '#FFF', fontFamily: 'Raleway' }}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={errors.name ? 'error' : 'success'}
          />
          {errors.name && <span style={{ color: '#FFC107' }}>{errors.name}</span>}
        </div>
        <div className="form-group">
          <label style={{ color: '#FFF', fontFamily: 'Raleway' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : 'success'}
          />
          {errors.email && <span style={{ color: '#FFC107' }}>{errors.email}</span>}
        </div>
        <div className="form-group">
          <label style={{ color: '#FFF', fontFamily: 'Raleway' }}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? 'error' : 'success'}
          />
          {errors.password && <span style={{ color: '#FFC107' }}>{errors.password}</span>}
        </div>
        <button type="submit" style={{ backgroundColor: '#007BFF', color: '#FFF', fontFamily: 'Raleway' }}>
          Create Account
        </button>
      </form>
      {successMessage && <p style={{ color: '#28A745' }}>{successMessage}</p>}
      {errors.general && <p style={{ color: '#FFC107' }}>{errors.general}</p>}
      <footer className="signup-footer" style={{ color: '#6C757D', fontFamily: 'Raleway' }}>
        <a href="/terms" style={{ color: '#6C757D' }}>Terms of Service</a> | <a href="/privacy" style={{ color: '#6C757D' }}>Privacy Policy</a>
      </footer>
    </div>
  );
};

export default Signup;
