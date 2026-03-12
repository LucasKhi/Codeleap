import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, createPost } from "../redux/postsSlice";
import PostItem from "./PostItem";
import { motion, AnimatePresence } from "framer-motion";

const Feed = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { items, loading, nextPage } = useSelector((state) => state.posts);
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const observer = useRef();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPage) {
          dispatch(fetchPosts(nextPage));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, nextPage, dispatch],
  );

  const handleCreate = () => {
    if (username && title.trim() && content.trim()) {
      console.log({ username, title, content });
      dispatch(createPost({ username, title, content }));
      setTitle("");
      setContent("");
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ marginBottom: "24px" }}
      >
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
            onClick={handleCreate}
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
      </motion.div>
      <div className="posts-list">
        <AnimatePresence>
          {items.map((post, index) => {
            if (items.length === index + 1) {
              return (
                <motion.div
                  key={post.id}
                  ref={lastPostElementRef}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  layout
                >
                  <PostItem post={post} />
                </motion.div>
              );
            } else {
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  layout
                >
                  <PostItem post={post} />
                </motion.div>
              );
            }
          })}
        </AnimatePresence>
        {loading && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p>Loading more posts...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
