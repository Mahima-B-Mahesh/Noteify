import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import {
  FaRegStickyNote,
  FaSearch,
  FaMoon,
  FaSun,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch notes on search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetch(`http://127.0.0.1:8004/notes/?search=${searchQuery}`,{
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        })  
        .then((res) => res.json())
        .then((data) => setSearchResults(data))
        .catch((err) => console.error("Search error:", err));
    }, 400); 

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSelectNote = (slug) => {
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/notes/${slug}`);
  };

  return (
    <nav className="navbar">
      {/* Left Logo */}
      <div className="nav-logo">
        <FaRegStickyNote className="logo-icon" />
        <span onClick={() => {token?navigate("/"):navigate("/login")}} style={{ cursor: "pointer" }}>Noteify</span>
      </div>

      {/* Middle Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        {token && (
          <li>
            <Link to="/">Home</Link>
          </li>
        )}
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>

      {/* Right Actions */}
      {token? (
      <div className="nav-actions">
        {/* Search */}
        <div className="search-box" ref={searchRef}>
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Dropdown results */}
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((note) => (
                <div
                  key={note.slug}
                  className="search-item"
                  onClick={() => handleSelectNote(note.slug)}
                >
                  <strong>{note.title}</strong>
                  <p>{note.body.substring(0, 50)}...</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button className="dark-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Profile Dropdown */}
        <div className="profile" ref={profileRef}>
          <button
            className="profile-btn"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <FaUserCircle className="profile-icon" />
          </button>

          {profileOpen && (
            <div className="dropdown">
              <Link to="/profile">My Profile</Link>
              <Link to="/settings">Settings</Link>
              <Link to="/logout" onClick={() => {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                window.location.href = "/login";
              }}>Logout</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>):(<div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
    {menuOpen ? <FaTimes /> : <FaBars />}
  </div>)}
    </nav>
  );
};

export default Navbar;
