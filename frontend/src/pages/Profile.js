import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const Profile = () => {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [country, setCountry] = useState(user?.country || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await API.put('/user/profile', { name, country });

      // VERY IMPORTANT: Correct way to read updated user data:
      const updatedUser = res.data;

      login(updatedUser);  // update localstorage and context
      alert('Profile Updated Successfully!');
      setLoading(false);
    } catch (error) {
      console.error(error);  // Log error in console
      alert(error.response?.data?.message || 'Failed to update profile');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>

        <div className="space-y-4">
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            className="input"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
          />
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
