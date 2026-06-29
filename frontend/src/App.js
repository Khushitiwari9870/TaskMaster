import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { getMe } from './services/api';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // Only call getMe if we have an access token; avoids 401 requests on page load
      const token = localStorage.getItem('access');
      if (!token) {
        setLoading(false);
        return;
      }

      const me = await getMe();
      setUser(me || null);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="auth-container">
        <div className="card">
          <h3>Loading TaskMaster...</h3>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home user={user} />} />
      <Route path="/login" element={<Login onLogin={setUser} />} />
      <Route path="/signup" element={<Signup onSignup={setUser} />} />
      <Route
        path="/dashboard"
        element={user ? <Dashboard user={user} onLogout={() => setUser(null)} /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
}
