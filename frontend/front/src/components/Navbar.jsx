import React from 'react';
import './Navbar.css'; // Import file CSS untuk styling

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <a href="/student" className="navbar-link">Student</a>
        </li>
        <li className="navbar-item">
          <a href="/subject" className="navbar-link">Subjek</a>
        </li>
        <li className="navbar-title navbar-item">
          Tugas Pak Panji
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
