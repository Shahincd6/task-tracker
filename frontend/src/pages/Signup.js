import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', country: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/signup', form);
      login(data);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);  // <== see what error actually is
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('Signup Failed: ' + error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="input" name="name" placeholder="Name" onChange={handleChange} required />
          <input className="input" name="email" placeholder="Email" type="email" onChange={handleChange} required />
          <input className="input" name="password" placeholder="Password" type="password" onChange={handleChange} required />
          <input className="input" name="country" placeholder="Country" onChange={handleChange} required />
          <button type="submit" className="btn-primary w-full">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
