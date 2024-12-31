import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const isValid = await validateLoginInput(username, password);
        if (!isValid) {
            setError('Invalid username or password');
            return;
        }

        try {
            const response = await fetch('https://hiapp-backend.cloud-stacks.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Handle successful login
            } else {
                const errorData = await response.json();
                setError(errorData.error);
            }
        } catch (err) {
            setError('An error occurred during login');
        }
    };

    const validateLoginInput = async (username, password) => {
        try {
            const response = await fetch('https://hiapp-backend.cloud-stacks.com/api/validate-login-input', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                return true;
            } else {
                const errorData = await response.json();
                setError(errorData.error);
                return false;
            }
        } catch (err) {
            setError('Validation error');
            return false;
        }
    };

    return (
        <div className="login-container">
            <header className="login-header">
                <img src="your-logo-url" alt="Logo" className="login-logo" />
            </header>
            <nav className="login-nav">
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav>
            <main className="login-main">
                <form onSubmit={handleLogin} className="login-form">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="login-input"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="login-input"
                    />
                    {error && <div className="login-error">{error}</div>}
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="login-links">
                    <a href="/forgot-password" className="link">Forgot Password?</a>
                    <a href="/register" className="link">Create a New Account</a>
                </div>
            </main>
            <footer className="login-footer">
                <a href="/terms" className="footer-link">Terms and Conditions</a>
                <a href="/privacy" className="footer-link">Privacy Policy</a>
            </footer>
        </div>
    );
}

export default Login;