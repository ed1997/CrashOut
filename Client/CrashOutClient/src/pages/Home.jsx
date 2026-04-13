import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to CrashOut 🚗</h1>

        <p style={styles.subtitle}>
          CrashOut is a simple crash reporting system that allows users to
          report, track, and manage road accident records securely.
        </p>

        <p style={styles.text}>
          You can create crash reports, view detailed information, edit existing
          entries, and manage your personal crash history — all in one place.
        </p>

      </div>
    </div>
  );
}

export default Home;

/* ===================== */
/* STYLES */
/* ===================== */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8fafc",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "600px",
    background: "white",
    padding: "32px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  title: {
    margin: 0,
    color: "#1e3a8a",
    fontSize: "28px",
  },

  subtitle: {
    marginTop: "12px",
    color: "#334155",
    fontSize: "16px",
    lineHeight: "1.6",
  },

  text: {
    marginTop: "12px",
    color: "#64748b",
    fontSize: "14px",
    lineHeight: "1.5",
  },

  buttonRow: {
    marginTop: "24px",
    display: "flex",
    justifyContent: "center",
    gap: "12px",
  },
};