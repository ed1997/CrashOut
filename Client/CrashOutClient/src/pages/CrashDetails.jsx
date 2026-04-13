import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function CrashDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, isLoggedIn } = useAuth();

  const [crash, setCrash] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================
  // AUTH GUARD
  // =====================
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // =====================
  // FETCH CRASH
  // =====================
  useEffect(() => {
    const fetchCrash = async () => {
      try {
        const res = await fetch(
          `http://localhost:5126/api/CrashReports/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to load crash");

        const data = await res.json();
        setCrash(data);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load crash details");
        setLoading(false);
      }
    };

    if (token) fetchCrash();
  }, [id, token]);

  // =====================
  // LOADING STATE
  // =====================
  if (loading) {
    return (
      <div style={styles.page}>
        <p>Loading crash details...</p>
      </div>
    );
  }

  // =====================
  // ERROR STATE
  // =====================
  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <p style={styles.error}>{error}</p>
          <button style={styles.button} onClick={() => navigate("/crashes")}>
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>{crash.title}</h2>

        {/* ✅ IMAGE ENHANCED SAFELY */}
        {crash.imageUrl && (
          <img
            src={crash.imageUrl}
            alt={crash.title || "Crash image"}
            style={styles.image}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}

        <p style={styles.description}>{crash.description}</p>

        <div style={styles.meta}>
          <strong>📍 Location:</strong> {crash.location}
        </div>

        <div style={styles.buttonRow}>
          <button
            style={styles.secondaryButton}
            onClick={() => navigate("/crashes")}
          >
            ← Back
          </button>

          <button
            style={styles.button}
            onClick={() => navigate(`/crashes/edit/${crash.id}`)}
          >
            Edit ✏️
          </button>
        </div>
      </div>
    </div>
  );
}

export default CrashDetails;

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
    maxWidth: "520px",
    background: "white",
    padding: "24px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  title: {
    margin: 0,
    color: "#1e3a8a",
    marginBottom: "12px",
  },

  image: {
    width: "100%",
    maxHeight: "320px",
    borderRadius: "10px",
    marginBottom: "16px",
    objectFit: "cover",
  },

  description: {
    color: "#334155",
    marginBottom: "16px",
    lineHeight: "1.5",
  },

  meta: {
    color: "#475569",
    marginBottom: "20px",
  },

  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },

  button: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    flex: 1,
  },

  secondaryButton: {
    background: "transparent",
    color: "#475569",
    border: "1px solid #cbd5e1",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    flex: 1,
  },

  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "12px",
  },
};