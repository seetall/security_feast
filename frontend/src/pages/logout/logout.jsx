import React from "react";
import { useNavigate } from "react-router-dom";
import "./logout.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="logout-container">
      <h1>Logging out...</h1>
      <button onClick={handleLogout} className="btn btn-primary">Logout</button>
    </div>
  );
};

export default Logout;
