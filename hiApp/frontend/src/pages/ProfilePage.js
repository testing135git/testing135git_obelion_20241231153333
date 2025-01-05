import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = ({ onSaveSuccess }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
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
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        onSaveSuccess();
      } else {
        const errorData = await response.json();
        setError(errorData.errors || 'An error occurred while saving the profile.');
      }
    } catch (err) {
      setError('An error occurred while saving the profile.');
    }
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <img src="logo-url" alt="Logo" className="logo" />
        <nav className="navigation-tabs">
          <a href="#home" className="nav-link">Home</a>
          <a href="#settings" className="nav-link">Settings</a>
          <a href="#logout" className="nav-link">Logout</a>
        </nav>
      </header>
      <main className="profile-main">
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
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
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="save-button">Save Changes</button>
        </form>
      </main>
      <footer className="profile-footer">
        <a href="#privacy" className="footer-link">Privacy Policy</a>
        <a href="#help" className="footer-link">Help</a>
      </footer>
    </div>
  );
};

export default ProfilePage;