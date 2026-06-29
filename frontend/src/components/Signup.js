import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';

export default function Signup({ onSignup }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr('');

    try {
      await register({ username, email, password });
      onSignup(null);
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Signup error', error);
      if (error.response && error.response.data) {
        const data = error.response.data;
        if (data.username) {
          setErr(Array.isArray(data.username) ? data.username.join(' ') : data.username);
        } else if (data.email) {
          setErr(Array.isArray(data.email) ? data.email.join(' ') : data.email);
        } else if (data.detail) {
          setErr(data.detail);
        } else {
          setErr(`Sign up failed: ${JSON.stringify(data)}`);
        }
      } else if (error.request) {
        setErr('Sign up failed: no response from server. Check backend connectivity.');
      } else {
        setErr(`Sign up failed: ${error.message}`);
      }
    }
  }

  return (
    <form className="card auth-form" onSubmit={submit}>
      <h3>Create your account</h3>
      <div className="form-field">
        <label>Username</label>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="form-field">
        <label>Email address</label>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-field">
        <label>Password</label>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" className="primary">Sign Up</button>
      {err && <div className="error">{err}</div>}
    </form>
  );
}
