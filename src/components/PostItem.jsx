import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Trash2, SquarePen, Heart, MessageCircle, Send } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { toggleLike, addComment } from "../redux/interactionsSlice";
import { motion, AnimatePresence } from "framer-motion";

const PostItem = ({ post }) => {
  const { username } = useSelector((state) => state.user);
  const interactions = useSelector(
    (state) => state.interactions.data[post.id] || { likes: [], comments: [] },
  );
  const dispatch = useDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const isOwner = username === post.username;
  const isLiked = interactions.likes.includes(username);
  const timeAgo = formatDistanceToNow(new Date(post.created_datetime), {
    addSuffix: true,
  });

  const handleLike = () => {
    dispatch(toggleLike({ postId: post.id, username }));
  };
  const handleAddComment = () => {
    if (commentText.trim()) {
      dispatch(
        addComment({ postId: post.id, username, content: commentText.trim() }),
      );
      setCommentText("");
    }
  };

  return (
    <>
      <div
        className="card"
        style={{ padding: 0, marginBottom: "24px", overflow: "hidden" }}
      >
        <header
          style={{
            backgroundColor: "var(--primary-color)",
            color: "white",
            padding: "12px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {post.title}
          </h3>
          {isOwner && (
            <div style={{ display: "flex", gap: "16px" }}>
              <Trash2
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => setIsDeleteModalOpen(true)}
              />
              <SquarePen
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => setIsEditModalOpen(true)}
              />
            </div>
          )}
        </header>
        <div style={{ padding: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#777777",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            <span style={{ fontWeight: 700 }}>@{post.username}</span>
            <span>{timeAgo}</span>
          </div>
          <p style={{ whiteSpace: "pre-wrap", marginBottom: "20px" }}>
            {post.content}
          </p>
          <div
            style={{
              display: "flex",
              gap: "24px",
              borderTop: "1px solid #efefef",
              paddingTop: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
              onClick={handleLike}
            >
              <motion.div whileTap={{ scale: 1.4 }}>
                <Heart
                  size={20}
                  color={isLiked ? "#ff4b4b" : "#777"}
                  fill={isLiked ? "#ff4b4b" : "transparent"}
                />
              </motion.div>
              <span style={{ fontSize: "14px", color: "#777" }}>
                {interactions.likes.length}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
              onClick={() => setIsCommentSectionOpen(!isCommentSectionOpen)}
            >
              <MessageCircle size={20} color="#777" />
              <span style={{ fontSize: "14px", color: "#777" }}>
                {interactions.comments.length}
              </span>
            </div>
          </div>
          <AnimatePresence>
            {isCommentSectionOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: "hidden" }}
              >
                <div
                  style={{
                    marginTop: "16px",
                    borderTop: "1px solid #efefef",
                    paddingTop: "16px",
                  }}
                >
                  {interactions.comments.map((comment, i) => (
                    <div
                      key={i}
                      style={{ marginBottom: "12px", fontSize: "14px" }}
                    >
                      <span style={{ fontWeight: 700, marginRight: "8px" }}>
                        @{comment.username}
                      </span>
                      <span style={{ color: "#333" }}>{comment.content}</span>
                    </div>
                  ))}
                  <div
                    style={{ display: "flex", gap: "8px", marginTop: "16px" }}
                  >
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                      style={{ flex: 1, padding: "8px 12px", fontSize: "14px" }}
                    />
                    <button
                      onClick={handleAddComment}
                      disabled={!commentText.trim()}
                      style={{
                        background: "none",
                        padding: 0,
                        width: "auto",
                        boxShadow: "none",
                        cursor: "pointer",
                      }}
                    >
                      <Send size={20} color="var(--primary-color)" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteModal id={post.id} onClose={() => setIsDeleteModalOpen(false)} />
      )}
      {isEditModalOpen && (
        <EditModal post={post} onClose={() => setIsEditModalOpen(false)} />
      )}
    </>
  );
};

export default PostItem;
