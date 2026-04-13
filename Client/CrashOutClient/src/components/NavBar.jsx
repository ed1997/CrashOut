import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      {/* LEFT SIDE */}
      <div style={styles.left}>
        <Link to="/" style={styles.brand}>
          CrashOut
        </Link>

        {!token && (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}

        {token && (
          <>
            <Link to="/crashes" style={styles.link}>
              Crash List
            </Link>

            <Link to="/create" style={styles.primaryLink}>
              + Create Crash
            </Link>
          </>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        {token && (
          <>
            {/* 👤 USER NAME (NEW ADDITION ONLY) */}
            <span style={styles.user}>
              👤 {user?.name}
            </span>

            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

/* ===================== */
/* STYLES */
/* ===================== */

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "linear-gradient(90deg, #1e3a8a, #2563eb)",
    color: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  right: {
    display: "flex",
    alignItems: "center",
  },

  brand: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "white",
    textDecoration: "none",
    marginRight: "10px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    transition: "0.2s",
  },

  primaryLink: {
    color: "white",
    textDecoration: "none",
    padding: "6px 12px",
    borderRadius: "999px",
    backgroundColor: "#22c55e",
    fontWeight: "500",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  },

  logoutButton: {
    backgroundColor: "#ef4444",
    border: "none",
    color: "white",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
  },
  user: {
    marginRight: "12px",
    padding: "6px 10px",
    borderRadius: "999px",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    fontSize: "14px",
    fontWeight: "500",
  },
};