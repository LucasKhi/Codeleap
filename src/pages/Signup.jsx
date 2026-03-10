import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserName } from "../redux/userSlice";

const Signup = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleEnter = () => {
    if (name.trim()) {
      dispatch(setUserName(name.trim()));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: "500px" }}>
        <h2 style={{ marginBottom: "24px" }}>Welcome to CodeLeap network!</h2>
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{ fontSize: "16px", display: "block", marginBottom: "8px" }}
          >
            Please enter your username
          </label>
          <input
            type="text"
            placeholder="John doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && name.trim() && handleEnter()}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            disabled={!name.trim()}
            onClick={handleEnter}
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--secondary-color)",
              padding: "7px 30px",
              textTransform: "uppercase",
            }}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
