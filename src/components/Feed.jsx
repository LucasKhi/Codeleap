import React, { useState } from "react";

const Feed = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div>
      <div className="card" style={{ marginBottom: "24px" }}>
        <h2 style={{ marginBottom: "24px", fontSize: "22px" }}>
          What's on your mind?
        </h2>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>Title</label>
          <input
            type="text"
            placeholder="Hello world"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Content
          </label>
          <textarea
            placeholder="Content here"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ resize: "none" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            disabled={!title.trim() || !content.trim()}
            style={{
              backgroundColor: "var(--primary-color)",
              color: "white",
              padding: "7px 30px",
              textTransform: "uppercase",
            }}
          >
            Create
          </button>
        </div>
      </div>

      <div className="posts-list">ITEMS GO HERE</div>
    </div>
  );
};

export default Feed;
