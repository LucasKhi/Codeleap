import { useSelector, useDispatch } from "react-redux";
import Signup from "./pages/Signup";
import Feed from "./components/Feed";
import { logout } from "./redux/userSlice";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";

function App() {
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (!username) {
    return <Signup />;
  }

  return (
    <div className="app-container">
      <header
        style={{
          backgroundColor: "var(--primary-color)",
          color: "white",
          padding: "27px 37px",
          maxWidth: "800px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "22px" }}>CodeLeap Network</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => dispatch(logout())}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: 0,
            boxShadow: "none",
            width: "auto",
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>Logout</span>
          <LogOut size={20} />
        </motion.button>
      </header>
      <main
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "var(--secondary-color)",
          minHeight: "calc(100vh - 80px)",
          padding: "24px",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <Feed />
      </main>
    </div>
  );
}

export default App;
