import React, { useEffect, useState } from 'react';
import { getProject, createTask, updateTask, addComment } from '../services/api';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

const columns = [
  { key: 'todo', title: 'Todo' },
  { key: 'inprogress', title: 'In Progress' },
  { key: 'review', title: 'Review' },
  { key: 'done', title: 'Completed' },
];

export default function KanbanBoard({ project }) {
  const [projectData, setProjectData] = useState(project);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    load();
  }, [project]);

  async function load() {
    const p = await getProject(project.id);
    setProjectData(p);
    setSelectedTask(null);
  }

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const t = await createTask({
      title,
      project: project.id,
      status: 'todo',
      priority: priority.toLowerCase(),
      due_date: dueDate,
    });
    setProjectData((prev) => ({ ...prev, tasks: [t, ...(prev.tasks || [])] }));
    setTitle('');
    setDueDate('');
    setPriority('Medium');
  }

  async function moveTask(taskId, status) {
    const t = await updateTask(taskId, { status });
    setProjectData((prev) => ({
      ...prev,
      tasks: prev.tasks.map((item) => (item.id === t.id ? t : item)),
    }));
    if (selectedTask?.id === t.id) {
      setSelectedTask(t);
    }
  }

  async function handleAddComment(taskId, body) {
    await addComment({ task: taskId, content: body });
    await load();
  }

  return (
    <section className="section-card">
      <div className="section-card-header">
        <div>
          <p className="eyebrow">Board</p>
          <h3>{projectData.name}</h3>
          <p className="section-copy">Organize tasks across stages, stay focused, and move work forward.</p>
        </div>
      </div>

      <form className="card task-create-form" onSubmit={addTask}>
        <div className="form-grid">
          <div className="form-field">
            <label>Task title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a new task" />
          </div>
          <div className="form-field">
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="form-field">
            <label>Due date</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <button type="submit" className="primary">Add task</button>
        </div>
      </form>

      <div className="kanban-board">
        {columns.map((col) => (
          <div key={col.key} className="column">
            <h4>{col.title}</h4>
            <div className="column-body">
              {(projectData.tasks || [])
                .filter((task) => task.status === col.key)
                .map((task) => (
                  <TaskCard key={task.id} task={task} onOpen={() => setSelectedTask(task)} />
                ))}
            </div>
          </div>
        ))}
      </div>

      <TaskModal
        open={Boolean(selectedTask)}
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onMove={moveTask}
        onAddComment={handleAddComment}
      />
    </section>
  );
}
