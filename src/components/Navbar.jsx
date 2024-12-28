import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { FaHome, FaSignInAlt, FaUserPlus, FaBlog, FaSignOutAlt } from 'react-icons/fa';  

const Navbar = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log("Logged out");
    }).catch((error) => {
      console.log(error);
    });
  };
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>My Blog</h2> 
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="navbar-toggle-bar"></span>
        <span className="navbar-toggle-bar"></span>
        <span className="navbar-toggle-bar"></span>
      </div>
      <ul  className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li><Link to="/"><FaHome /> Home</Link></li>
        {!user ? (
          <>
            <li><Link to="/login"><FaSignInAlt /> Login</Link></li>
            <li><Link to="/signup"><FaUserPlus /> Signup</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/create"><FaBlog /> Create Blog</Link></li>
            <li><button onClick={handleLogout} className="logout-btn"><FaSignOutAlt /> Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

