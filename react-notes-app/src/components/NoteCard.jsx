// NoteCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./NoteCard.css";

const NoteCard = ({ note }) => {
  const navigate = useNavigate();

  return (
    <div className="note-card" onClick={() => navigate(`/notes/${note.slug}`)}>
      <h3 className="note-title">{note.title}</h3>
      <p className="note-body">{note.body}</p>
      <span className="note-category">{note.category}</span>
    </div>
  );
};

export default NoteCard;
