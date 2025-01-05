import React, { useState, useEffect, createContext, useContext } from 'react';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup.js';
import Profile from './components/Profile/Profile.js';

const AuthContext = createContext();
const ErrorContext = createContext();

const useAuth = () => useContext(AuthContext);
const useError = () => useContext(ErrorContext);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/profile" /> : children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const verifyToken = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Assume a function verifyAuthToken exists to verify token with backend
      verifyAuthToken(token)
        .then(valid => setIsAuthenticated(valid))
        .catch(() => {
          localStorage.removeItem('authToken');
          setIsAuthenticated(false);
        });
    }
  };

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <nav style={{ padding: '1rem', background: '#f0f0f0' }} role="navigation">
            <Link to="/">{isAuthenticated ? 'Profile' : 'Login'}</Link>
            {!isAuthenticated && <Link to="/signup">Signup</Link>}
            {isAuthenticated && <button onClick={logout} style={{ marginLeft: '1rem' }}>Logout</button>}
          </nav>
          <main style={{ flex: 1, padding: '1rem' }}>
            <Routes>
              <Route path="/login" element={<PublicRoute><Login onLoginSuccess={login} /></PublicRoute>} />
              <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/" element={<Navigate to={isAuthenticated ? "/profile" : "/login"} />} />
            </Routes>
          </main>
          <footer style={{ textAlign: 'center', padding: '1rem', background: '#f0f0f0' }}>
            &copy; 2024 hi App. All rights reserved.
          </footer>
        </div>
      </AuthContext.Provider>
    </ErrorContext.Provider>
  );
};

export default App;