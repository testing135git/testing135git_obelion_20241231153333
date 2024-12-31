import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://hiapp-backend.cloud-stacks.com/api/validate-login-input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      console.log('Login successful', data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <img src="logo-url" alt="App Logo" className="logo" />
      </header>
      
      <nav className="navigation">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>

      <main className="login-form-container">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        
        {error && <p className="error-message">{error}</p>}
        
        <button onClick={handleLogin} className="login-button">Login</button>

        <div className="additional-links">
          <a href="/recover-password">Forgot Password?</a>
          <a href="/sign-up">Create Account</a>
        </div>
      </main>

      <footer className="footer">
        <a href="/terms">Terms & Conditions</a>
        <a href="/privacy">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default LoginPage;