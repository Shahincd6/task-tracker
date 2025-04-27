import { useState } from 'react';
import API from '../services/api';
import StatusBadge from './StatusBadge';

const TaskItem = ({ task, refresh }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleUpdate = async () => {
    try {
      await API.put(`/tasks/${task._id}`, { title, description, status });
      setEditMode(false);
      refresh();
    } catch (error) {
      alert('Failed to update task');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await API.delete(`/tasks/${task._id}`);
        refresh();
      } catch (error) {
        alert('Failed to delete task');
      }
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not Completed';
    const date = new Date(dateStr);
    return date.toLocaleDateString(); // Simple readable format like 4/27/2025
  };

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col space-y-2">
      {editMode ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="flex space-x-2">
            <button onClick={handleUpdate} className="btn-primary flex-1">
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded flex-1"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-bold">{task.title}</h4>
            <StatusBadge status={task.status} />
          </div>
          <p className="text-gray-600">{task.description}</p>

          <div className="text-sm text-gray-500">
            <p><b>Created:</b> {formatDate(task.createdAt)}</p>
            <p><b>Completed:</b> {formatDate(task.dateCompleted)}</p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setEditMode(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
