import React, { useState } from 'react';
import Modal from './Modal';
import CommentSection from './CommentSection';

export default function TaskModal({ open, task, onClose, onMove, onAddComment }) {
  const [commentText, setCommentText] = useState('');

  if (!task) return null;

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    await onAddComment(task.id, commentText.trim());
    setCommentText('');
  };

  return (
    <Modal open={open} title={task.title || 'Task details'} onClose={onClose}>
      <div className="task-modal-grid">
        <div className="task-details-card">
          <div className="task-status-meta">
            <span className={`status-pill ${task.status}`}>{task.status_label || task.status}</span>
            <span className="task-priority">{task.priority || 'Medium'}</span>
          </div>
          <p>{task.description || 'No description added yet.'}</p>
          <div className="task-metadata">
            <div>
              <label>Due date</label>
              <strong>{task.due_date || 'TBD'}</strong>
            </div>
            <div>
              <label>Assigned to</label>
              <strong>{task.assigned_to?.username || 'Unassigned'}</strong>
            </div>
          </div>

          <div className="task-action-group">
            <button type="button" onClick={() => onMove(task.id, 'todo')}>Move to Todo</button>
            <button type="button" onClick={() => onMove(task.id, 'inprogress')}>Move to In Progress</button>
            <button type="button" onClick={() => onMove(task.id, 'review')}>Move to Review</button>
            <button type="button" onClick={() => onMove(task.id, 'done')}>Mark Completed</button>
          </div>
        </div>

        <CommentSection comments={task.comments || []} value={commentText} onChange={setCommentText} onSubmit={handleComment} />
      </div>
    </Modal>
  );
}
