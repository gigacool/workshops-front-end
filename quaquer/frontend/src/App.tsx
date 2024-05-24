import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Home from './pages/HomeLoggedIn';
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          <Route 
            path="/" 
            element={<HomePage />} 
          />
          <Route 
            path="/app" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/login" 
            element={<LoginPage />} 
          />
          <Route 
            path="/register" 
            element={<RegisterPage />} 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
