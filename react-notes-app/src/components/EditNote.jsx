import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddNote.css";

const EditNote = () => {
  const navigate = useNavigate();
  const { slug } = useParams(); // get slug from route
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access");

  // Fetch categories
  useEffect(() => {
    fetch("http://127.0.0.1:8004/categories/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Fetch note details
  useEffect(() => {

    fetch(`http://127.0.0.1:8004/notes/${slug}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Note not found");
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setBody(data.body);
        setCategory(data.category);
      })
      .catch((err) => {
        console.error("Error fetching note:", err);
        alert("❌ Could not load note");
        navigate("/");
      });
  }, [slug, navigate]);

  // Update note
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`http://127.0.0.1:8004/notes/${slug}/`, {
      method: "PUT",
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
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update note");
        return res.json();
      })
      .then(() => {
        alert("✅ Note updated successfully!");
        navigate("/");
      })
      .catch((err) => console.error("Error updating note:", err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="addnote-container">
      <h2 className="addnote-heading">✏️ Edit Note</h2>

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
          {loading ? "Updating..." : "💾 Update Note"}
        </button>
      </form>
    </div>
  );
};

export default EditNote;
