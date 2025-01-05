import React, { useState } from 'react';
import './Profile.css';

function Profile({ logoUrl }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://hiapp-backend.cloud-stacks.com/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.errors || 'An error occurred while submitting the form');
        return;
      }

      const result = await response.json();
      console.log('Form data submitted:', result);
      setError(null);
    } catch (err) {
      setError('An error occurred while submitting the form');
    }
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <img src={logoUrl} alt="Logo" className="profile-logo" />
        <nav className="profile-nav">
          <a href="#home" className="profile-nav-link">Home</a>
          <a href="#settings" className="profile-nav-link">Settings</a>
        </nav>
      </header>
      <main className="profile-main">
        {error && <div className="error-message">{error}</div>}
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="save-button">Save Changes</button>
        </form>
      </main>
      <footer className="profile-footer">
        <a href="#privacy" className="footer-link">Privacy Policy</a>
        <a href="#help" className="footer-link">Help</a>
      </footer>
    </div>
  );
}

export default Profile;