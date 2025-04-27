import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import TaskItem from '../components/TaskItem';

const ProjectDetails = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/tasks/${id}`);
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [id]);

  const handleCreateTask = async () => {
    if (!title) return;
    try {
      await API.post('/tasks', { projectId: id, title, description });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error) {
      alert('Failed to create task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Manage Tasks</h2>

      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="input"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="input"
        />
        <button
          onClick={handleCreateTask}
          className="btn-primary"
        >
          Create
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} refresh={fetchTasks} />
        ))}
      </div>

      {tasks.length === 0 && (
        <p className="text-gray-500 mt-6">No tasks yet. Add your first task!</p>
      )}
    </div>
  );
};

export default ProjectDetails;
