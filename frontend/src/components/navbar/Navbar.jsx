import React from 'react';
import { FaUser, FaHeart } from 'react-icons/fa'; // Removed FaSignOutAlt for the logout icon
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleFavoritesClick = () => {
    navigate('/Favorites');
  };

  const handleAboutClick = () => {
    navigate('/aboutus');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };
  const handleChangePasswordClick = () => {
    navigate('/change_password');
  };

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Left side of the navbar */}
      <div className="navbar-start">
        <span className="brand">Cook Together</span> {/* Just plain text */}
      </div>

      {/* Right side of the navbar (User dropdown) */}
      <div className="navbar-end">
        <div className="dropdown">
          <button className="btn">
            <FaUser className="icon black-icon" /> {/* User logo in black */}
          </button>
          <ul className="menu">
            <li>
              <a href="/profile" onClick={handleProfileClick} className="menu-item">
                Profile
              </a>
            </li>
            <li>
              <a href="/change_password" onClick={handleChangePasswordClick} className="menu-item">
                Change Password
              </a>
            </li>
            <li>
              <a href="/Favorites" onClick={handleFavoritesClick} className="menu-item">
                Favorites
              </a>
            </li>
            <li>
              <a href="/aboutus" onClick={handleAboutClick} className="menu-item">
                About Us
              </a>
            </li>
            <li>
              <button className="menu-item logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
