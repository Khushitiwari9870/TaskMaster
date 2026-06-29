import React from 'react';

export default function ProjectCard({ label, value, accent }) {
  return (
    <div className={`metric-card ${accent || ''}`}>
      <div className="metric-title">{label}</div>
      <div className="metric-value">{value}</div>
    </div>
  );
}
