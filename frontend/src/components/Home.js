import React from 'react';
import { Link } from 'react-router-dom';

export default function Home({ user }) {
  return (
    <div className="auth-container">
      <div className="auth-panel card" style={{maxWidth: '980px'}}>
        <div className="auth-hero">
          <h1>Welcome to TaskMaster</h1>
          <p>Organize your projects, collaborate with your team, and deliver value faster.</p>
        </div>

        <div className="auth-forms">
          <div style={{display:'grid',gap:16}}>
            <h3 style={{marginTop:0}}>Get started</h3>
            <p style={{color:'#64748b'}}>Sign in to manage your boards or explore the public demo.</p>

            <div style={{display:'flex',gap:12}}>
              {!user && <Link to="/login" className="primary" style={{display:'inline-block',textDecoration:'none',textAlign:'center'}}>Login</Link>}
              {!user && <Link to="/signup" className="secondary" style={{display:'inline-block',textDecoration:'none',textAlign:'center'}}>Sign up</Link>}
              {user && <Link to="/dashboard" className="primary" style={{display:'inline-block',textDecoration:'none',textAlign:'center'}}>Open Dashboard</Link>}
            </div>
          </div>

          <div style={{display:'grid',gap:12}}>
            <div className="card">
              <h4>Features</h4>
              <ul>
                <li>Kanban boards with drag-and-drop workflow</li>
                <li>Task assignments, priorities and due dates</li>
                <li>Real-time notifications and comments</li>
                <li>Responsive design for mobile and desktop</li>
              </ul>
            </div>

            <div className="card">
              <h4>Connect API</h4>
              <p style={{margin:0,color:'#64748b'}}>The frontend talks to the backend at <strong>http://127.0.0.1:8000/api/</strong> (or your server IP).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
