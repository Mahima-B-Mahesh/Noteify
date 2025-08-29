import React from "react";
import "./AddNote.css"; 

const About = () => {
  return (
    <div className="addnote-container">
      <h2 className="addnote-heading">📘 About My Notes App</h2>
      <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#374151" }}>
        Welcome to <strong>My Notes App</strong> ✨  
        This app helps you <b>create</b>, <b>edit</b>, and <b>manage</b> your
        personal notes in an organized way.
      </p>

      <ul style={{ marginTop: "15px", paddingLeft: "20px", color: "#4B5563" }}>
        <li>📝 Create and edit notes easily</li>
        <li>📂 Categorize notes (Business, Personal, Important)</li>
        <li>🔍 Quickly access notes by category</li>
        <li>💾 Notes are stored securely</li>
      </ul>

      <p style={{ marginTop: "20px", fontSize: "15px", color: "#6B7280" }}>
        Built with <b>React</b> (Frontend) ⚛️ and <b>Django REST Framework</b> (Backend) 🐍
      </p>
    </div>
  );
};

export default About;
