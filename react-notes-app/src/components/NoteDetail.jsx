import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./NoteDetail.css";

const NoteDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const token = localStorage.getItem("access");

  useEffect(() => {
    fetch(`http://127.0.0.1:8004/notes/${slug}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch note");
        return res.json();
      })
      .then((data) => setNote(data))
      .catch((err) => {
        console.error("Error fetching note:", err);
        alert("❌ Could not fetch note, please login again.");
        navigate("/login");
      });
  }, [slug, navigate]);

  const handleDelete = () => {
    if (window.confirm("❌ Are you sure you want to delete this note?")) {

      fetch(`http://127.0.0.1:8004/notes/${slug}/`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 204) {
            alert("✅ Note deleted successfully!");
            navigate("/");
          } else {
            alert("❌ Failed to delete note");
          }
        })
        .catch((err) => console.error("Error deleting note:", err));
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${slug}`);
  };

  if (!note) return <p className="loading">Loading...</p>;

  return (
    <div className="note-detail-container">
      <div className="note-detail-card">
        <div className="note-detail-header">
          <h2 className="note-detail-title">{note.title}</h2>
          <div className="note-actions">
            <button className="icon-btn" onClick={handleEdit}>✏️</button>
            <button className="icon-btn delete" onClick={handleDelete}>🗑️</button>
          </div>
        </div>
        <p className="note-detail-body">{note.body}</p>
        <span className="note-detail-category">{note.category}</span>
      </div>
    </div>
  );
};

export default NoteDetail;
