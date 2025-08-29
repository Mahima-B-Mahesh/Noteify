import React, { useState, useEffect } from "react";
import "./Home.css";
import NoteCard from "./NoteCard";

function Home() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = ["ALL", "BUSINESS", "PERSONAL", "IMPORTANT"];

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      if (!refresh) throw new Error("No refresh token");

      const res = await fetch("http://127.0.0.1:8004/accounts/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });

      if (!res.ok) throw new Error("Refresh token invalid");

      const data = await res.json();
      localStorage.setItem("access", data.access);
      return data.access;
    } catch (err) {
      console.error("Token refresh failed:", err);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login"; 
    }
  };

  const fetchNotes = async () => {
    try {
      let access = localStorage.getItem("access");

      let res = await fetch("http://127.0.0.1:8004/notes/", {
        headers: { Authorization: `Bearer ${access}` },
      });

      if (res.status === 401) {
        access = await refreshToken();
        res = await fetch("http://127.0.0.1:8004/notes/", {
          headers: { Authorization: `Bearer ${access}` },
        });
      }

      if (!res.ok) throw new Error("Failed to fetch notes");

      const data = await res.json();
      setNotes(data);
      setFilteredNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err);
      alert("❌ Could not fetch notes, please login again.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    if (category === "ALL") {
      setFilteredNotes(notes);
    } else {
      setFilteredNotes(notes.filter((note) => note.category === category));
    }
  };

  return (
    <div>
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => handleFilterChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="notes-list">
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default Home;
