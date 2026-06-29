import React from 'react';

export default function NotificationsPanel({ open, notifications, onClose }) {
  return (
    <div className={`notifications-panel ${open ? 'open' : ''}`}>
      <div className="notifications-header">
        <div>
          <h3>Notifications</h3>
          <p>Your latest activity and updates.</p>
        </div>
        <button className="close-button" onClick={onClose}>&times;</button>
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="empty-text">No notifications yet. Stay tuned.</div>
        ) : (
          notifications.map((item) => (
            <div key={item.id} className="notification-item">
              <div className="notification-dot" />
              <div>
                <strong>{item.content?.slice(0, 60) || 'Notification'}</strong>
                <p>{item.content}</p>
                <span>{item.created_at?.slice(0, 16).replace('T', ' ') || 'Just now'}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
