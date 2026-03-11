import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost } from '../redux/postsSlice';
import PostItem from './PostItem';


const Feed = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { items, loading } = useSelector((state) => state.posts);
    const { username } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleCreate = () => {
        if (username && title.trim() && content.trim()) {
            console.log({ username, title, content })
            dispatch(createPost({ username, title, content }));
            setTitle('');
            setContent('');
        }
    };

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
      </div>

      <div className="posts-list">
        {loading && items.length === 0 ? (
          <p>Loading posts...</p>
        ) : (
          items.map((post) => <PostItem key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Feed;
