import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import KanbanBoard from './KanbanBoard';
import NotificationsPanel from './NotificationsPanel';
import ProjectCard from './ProjectCard';
import { getProjects, createProject, getNotifications } from '../services/api';

export default function Dashboard({ user, onLogout }) {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getProjects();
    setProjects(data);
    if (data.length) {
      setSelected(data[0]);
    }

    try {
      const list = await getNotifications();
      setNotifications(list);
    } catch (error) {
      setNotifications([]);
    }
    setLoading(false);
  }

  async function addProject() {
    if (!newProjectName.trim()) return;
    const project = await createProject({ name: newProjectName, description: '' });
    setProjects([project, ...projects]);
    setSelected(project);
    setNewProjectName('');
  }

  function handleLogout() {
    localStorage.clear();
    onLogout();
    navigate('/login');
  }

  const totalTasks = projects.reduce((sum, item) => sum + (item.tasks?.length || 0), 0);

  if (loading) {
    return (
      <div className="auth-container">
        <div className="card">
          <h3>Loading projects...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar
        user={user}
        onLogout={handleLogout}
        onToggleNotifications={() => setShowNotifications((current) => !current)}
        notificationCount={notifications.length}
      />

      <div className="main">
        <Sidebar
          projects={projects}
          selectedProject={selected}
          onSelectProject={setSelected}
          newProjectName={newProjectName}
          setNewProjectName={setNewProjectName}
          onCreateProject={addProject}
        />

        <div className="content">
          <div className="dashboard-grid">
            <section className="section-card dashboard-welcome">
              <div>
                <p className="eyebrow">Welcome back</p>
                <h2>Hey {user.username}, your workspace is ready.</h2>
                <p>Track progress, manage projects, and keep every task moving forward.</p>
              </div>

              <div className="project-actions">
                <button className="primary" onClick={addProject}>Create project</button>
                <button className="secondary" onClick={() => setShowNotifications(true)}>View notifications</button>
              </div>
            </section>

            <div className="stats-grid">
              <ProjectCard label="Projects" value={projects.length} />
              <ProjectCard label="Tasks" value={totalTasks} />
              <ProjectCard label="Notifications" value={notifications.length} />
            </div>
          </div>

          {selected ? (
            <KanbanBoard project={selected} key={selected.id} />
          ) : (
            <section className="section-card">
              <h3>Get started with your first board</h3>
              <p>Select a project or create a new board to open the kanban view.</p>
            </section>
          )}
        </div>
      </div>

      <NotificationsPanel open={showNotifications} notifications={notifications} onClose={() => setShowNotifications(false)} />
    </div>
  );
}
