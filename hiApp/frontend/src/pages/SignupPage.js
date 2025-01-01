import React, { useState } from 'react';
import './SignupPage.css';

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      try {
        const response = await fetch('https://hiapp-backend.cloud-stacks.com/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.username,
            email: formData.email,
            password: formData.password
          })
        });

        const result = await response.json();
        if (response.ok) {
          setSuccess(true);
        } else {
          setErrors({ apiError: result.error || 'Something went wrong' });
        }
      } catch (error) {
        setErrors({ apiError: 'Network error' });
      }
    }
  };

  return (
    <div className="signup-page">
      <header className="signup-header">
        <img 
          src="https://agent-dev.obelion.ai/static/images/d419397a-91c0-494b-97f6-f9e08cb0e767.png" 
          alt="App Logo" 
          className="logo"
        />
      </header>
      <nav className="signup-nav">
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link">Features</a>
        <a href="#" className="nav-link">Contact</a>
      </nav>
      <main className="signup-main">
        {success && <p className="success-message">Account successfully created!</p>}
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              name="username" 
              id="username" 
              value={formData.username} 
              onChange={handleChange} 
              className={errors.username ? 'input-error' : 'input-success'}
            />
            {errors.username && <p className="error-text">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              value={formData.email} 
              onChange={handleChange} 
              className={errors.email ? 'input-error' : 'input-success'}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              value={formData.password} 
              onChange={handleChange} 
              className={errors.password ? 'input-error' : 'input-success'}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <button type="submit" className="submit-button">Create Account</button>
          {errors.apiError && <p className="error-text">{errors.apiError}</p>}
        </form>
      </main>
      <footer className="signup-footer">
        <a href="#" className="footer-link">Terms of Service</a>
        <a href="#" className="footer-link">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default SignupPage;