import React from 'react';

export default function TaskCard({ task, onOpen }) {
  return (
    <button type="button" className="task-card" onClick={onOpen}>
      <div className="task-card-header">
        <h5>{task.title}</h5>
        <span className={`task-tag ${task.priority?.toLowerCase()}`}>{task.priority || 'Medium'}</span>
      </div>
      <div className="task-meta">
        <span className="task-date">{task.due_date || 'No due date'}</span>
        <span className="task-owner">{task.assigned_to?.username || 'Unassigned'}</span>
      </div>
      <div className="task-summary">Tap for details and comments.</div>
    </button>
  );
}
