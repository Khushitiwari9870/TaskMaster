import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, getMe } from '../services/api';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr('');

    try {
      await login(username, password);
      const user = await getMe();
      if (user) {
        onLogin(user);
        navigate('/dashboard');
      }
    } catch (error) {
      setErr('Login failed. Please check your credentials.');
    }
  }

  return (
    <form className="card auth-form" onSubmit={submit}>
      <h3>Sign in to TaskMaster</h3>
      <div className="form-field">
        <label>Username</label>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="form-field">
        <label>Password</label>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" className="primary">Login</button>
      {err && <div className="error">{err}</div>}
    </form>
  );
}
