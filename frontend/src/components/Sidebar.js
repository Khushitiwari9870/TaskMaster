import React from 'react';
import ProjectCard from './ProjectCard';

export default function Sidebar({ projects, selectedProject, onSelectProject, newProjectName, setNewProjectName, onCreateProject }) {
  return (
    <aside className="sidebar-panel card">
      <div className="sidebar-head">
        <div>
          <h3>Projects</h3>
          <p>Quick access to your most important boards.</p>
        </div>
      </div>

      <div className="project-quick-add">
        <input
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="New project name"
        />
        <button onClick={onCreateProject}>Create</button>
      </div>

      <div className="project-list">
        {projects.length === 0 && <div className="empty-text">No projects yet. Create one to get started.</div>}
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            className={`project-list-item ${selectedProject?.id === project.id ? 'active' : ''}`}
            onClick={() => onSelectProject(project)}
          >
            <div>
              <strong>{project.name}</strong>
              <span>{project.tasks ? project.tasks.length : 0} tasks</span>
            </div>
          </button>
        ))}
      </div>

      <div className="sidebar-footer">
        <ProjectCard label="Active Boards" value={projects.length} accent="soft" />
      </div>
    </aside>
  );
}
