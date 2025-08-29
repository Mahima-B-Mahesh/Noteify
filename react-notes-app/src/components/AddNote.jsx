import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./AddNote.css";
import AuthContext from "../context/AuthContext"; 

const AddNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(false);
  const { authTokens } = useContext(AuthContext);
  const token = localStorage.getItem("access");

  useEffect(() => {
    fetch("http://127.0.0.1:8004/categories/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0) setCategory(data[0].value); 
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, [authTokens]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("http://127.0.0.1:8004/notes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("✅ Note added successfully!");
        navigate("/");
      })
      .catch((err) => console.error("Error adding note:", err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="addnote-container">
      <h2 className="addnote-heading">📝 Create a New Note</h2>

      <form onSubmit={handleSubmit} className="addnote-form">
        <input
          type="text"
          className="addnote-input"
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="addnote-textarea"
          placeholder="Write your thoughts..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="8"
          required
        />

        <select
          className="addnote-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.length > 0 ? (
            categories.map((cat, i) => (
              <option key={i} value={cat.value}>
                {cat.label}
              </option>
            ))
          ) : (
            <>
              <option value="PERSONAL">Personal</option>
              <option value="IMPORTANT">Important</option>
              <option value="BUSINESS">Business</option>
            </>
          )}
        </select>

        <button className="addnote-button" type="submit" disabled={loading}>
          {loading ? "Saving..." : "💾 Save Note"}
        </button>
      </form>
    </div>
  );
};

export default AddNote;
