import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../redux/postsSlice";

const DeleteModal = ({ id, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(id));
    onClose();
  };

  return (
    <div className="modal-overlay overlay">
      <div className="modal-content" style={{ maxWidth: "660px" }}>
        <h2 style={{ marginBottom: "40px" }}>
          Are you sure you want to delete this item?
        </h2>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid #999999",
              padding: "7px 30px",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            style={{
              backgroundColor: "var(--danger-color)",
              color: "white",
              padding: "7px 30px",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
