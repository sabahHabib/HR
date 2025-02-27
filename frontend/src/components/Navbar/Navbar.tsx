import { Link, useNavigate } from 'react-router-dom';
import { useAttendance } from '../../hooks/useAttendance';
import { logout } from '../authentication/auth';
import { useEffect, useState } from 'react';
import { useProfile } from "../../contexts/ProfileContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token') !== null;
  const { handleCheckIn, handleCheckOut } = useAttendance();
  const { profile, fetchProfile } = useProfile();

  // State to control dropdown menu visibility
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [fetchProfile, isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar sticky-top  navbar-light bg-light shadow">

      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>


      {isMenuOpen && (
        <div className="bg-light text-dark vh-100" style={{ position: 'absolute', top: 70,  bottom: 0, boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)' }}>
          <button
            className="close-button"
            onClick={() => setMenuOpen(false)}
            style={{  background: 'none', border: 'none', fontSize: '50px' ,  marginLeft:'200px' }}
          >
            &times;
          </button>
          <div className="list-group list-group-flush mt-5">
            <Link className="list-group-item list-group-item-action" to="/dashboard">
              Dashboard
            </Link>
            <Link className="list-group-item list-group-item-action" to="/profile">
              Profile
            </Link>
            <Link className="list-group-item list-group-item-action" to="/attendance">
              Attendance
            </Link>
            <Link className="list-group-item list-group-item-action" to="/leave">
              Leave
            </Link>
            <button
              className="list-group-item list-group-item-action"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      <div className="ml-auto d-flex align-items-center" style={{ marginLeft: 'auto', marginRight: '20px' }}>
        <button className="btn btn-primary mx-2" onClick={handleCheckIn}>
          Check In
        </button>
        <button className="btn btn-danger mx-2" onClick={handleCheckOut}>
          Check Out
        </button>

        <div className="d-flex align-items-center">
          <img
            src={profile?.image_url ? `http://localhost:8000${profile.image_url}` : 'https://i.pinimg.com/564x/e2/be/f3/e2bef346ae5be671b272a9f102629762.jpg'}
            alt="profile"
            className="rounded-circle img-fluid"
            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
          />
          <span className="ms-2 fw-bold">{profile ? profile.user.name : ''}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;