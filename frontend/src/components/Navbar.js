import React from 'react';

export default function Navbar({ user, onLogout, onToggleNotifications, notificationCount }) {
  return (
    <header className="topbar">
      <div className="brand-bar">
        <div className="brand-icon">TM</div>
        <div>
          <h1>TaskMaster</h1>
          <p>Plan, track and deliver work with confidence.</p>
        </div>
      </div>

      <div className="topbar-actions">
        <button className="icon-button" onClick={onToggleNotifications} aria-label="Open notifications">
          <span className="icon-bell">🔔</span>
          {notificationCount > 0 && <span className="notification-badge">{notificationCount}</span>}
        </button>
        <div className="user-chip">{user.username}</div>
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}
