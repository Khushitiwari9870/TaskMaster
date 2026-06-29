import React from 'react';

export default function CommentSection({ comments, value, onChange, onSubmit }) {
  return (
    <div className="comment-section">
      <div className="comment-header">
        <h4>Comments</h4>
        <p>Keep the team aligned with updates.</p>
      </div>

      <div className="comment-list">
        {comments.length === 0 ? (
          <div className="empty-text">No comments yet. Add a note.</div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-avatar">{comment.author?.username?.slice(0, 1) || 'U'}</div>
              <div>
                <div className="comment-meta">
                  <strong>{comment.author?.username || 'User'}</strong>
                  <span>{comment.created_at?.slice(0, 16).replace('T', ' ') || 'Just now'}</span>
                </div>
                <p>{comment.body}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <form className="comment-form" onSubmit={onSubmit}>
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder="Write a comment..." />
        <button type="submit">Post comment</button>
      </form>
    </div>
  );
}
