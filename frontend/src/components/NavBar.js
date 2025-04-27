import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="font-bold text-lg">
        <Link to="/dashboard">Task Tracker</Link>
      </div>
      <div className="space-x-4">
        {user ? (
          <>
            <Link className="hover:underline" to="/dashboard">Dashboard</Link>
            <Link className="hover:underline" to="/profile">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 py-1 px-3 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="hover:underline" to="/">Login</Link>
            <Link className="hover:underline" to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
