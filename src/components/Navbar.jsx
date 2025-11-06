import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { dark, setDark } = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="brand" onClick={() => navigate("/")}>
        SportsStats
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/livescores">Live Scores</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/players">Players</Link>
      </div>
      <div className="nav-actions">
        <button
          className="btn small"
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle theme"
        >
          {dark ? "🌙" : "☀️"}
        </button>

        {token ? (
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
