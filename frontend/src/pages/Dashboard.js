import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/projects');
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!title) return;
    try {
      await API.post('/projects', { title });
      setTitle('');
      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || 'Cannot create more projects');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await API.delete(`/projects/${id}`);
        setProjects(projects.filter((p) => p._id !== id));
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete project');
      }
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="p-8 bg-white min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6">Welcome, {user?.name}</h2>

      <div className="flex space-x-2 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Project Title"
          className="px-4 py-2 rounded bg-white border border-gray-700 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
        />
        <button
          onClick={handleCreate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p._id}
            className="relative border border-gray-700 p-4 rounded-lg shadow hover:shadow-lg bg-gray-800 transition cursor-pointer"
          >
            <h3
              onClick={() => navigate(`/project/${p._id}`)}
              className="text-xl font-semibold mb-2"
            >
              {p.title}
            </h3>
            <button
              onClick={() => handleDelete(p._id)}
              className="absolute top-2 right-2 text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <p className="text-gray-400 mt-6 text-center">No projects yet. Create your first project!</p>
      )}
    </div>
  );
};

export default Dashboard;
