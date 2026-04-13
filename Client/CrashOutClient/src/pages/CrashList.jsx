import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function CrashList() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const { token, isLoggedIn } = useAuth();

  // redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // fetch crashes
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("http://localhost:5126/api/CrashReports", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setReports(data);
      } catch (err) {
        console.error(err);
      }   
    };

    if (token) fetchReports();
  }, [token]);

  const deleteCrash = async (id) => {
    try {
      await fetch(`http://localhost:5126/api/CrashReports/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Crash deleted successfully!");

      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>Crash Reports</h2>
        <p style={styles.subtitle}>
          Manage and review all your submitted crash reports
        </p>
      </div>

      {reports.length === 0 ? (
        <div style={styles.emptyState}>
          <h3>No crash reports found</h3>
          <p>Create your first report using the Create Crash button in the navbar.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {reports.map((crash) => (
            <div key={crash.id} style={styles.card}>
              <div>

                {/* IMAGE ADDED HERE */}
                {crash.imageUrl && (
                  <img
                    src={crash.imageUrl}
                    alt={crash.title}
                    style={styles.image}
                  />
                )}

                <h3 style={styles.cardTitle}>{crash.title}</h3>
                <p style={styles.cardText}>{crash.description}</p>

                <p style={styles.location}>
                  📍 <b>{crash.location}</b>
                </p>
              </div>

              <div style={styles.actions}>
                <button
                  onClick={() => navigate(`/crashes/${crash.id}`)}
                  style={styles.viewBtn}
                >
                  View
                </button>

                <button
                  onClick={() => navigate(`/crashes/edit/${crash.id}`)}
                  style={styles.editBtn}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCrash(crash.id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CrashList;

/* ===================== */
/* STYLES */
/* ===================== */

const styles = {
  page: {
    padding: "24px",
    background: "#f8fafc",
    minHeight: "100vh",
  },

  header: {
    marginBottom: "20px",
  },

  title: {
    margin: 0,
    color: "#1e3a8a",
  },

  subtitle: {
    marginTop: "6px",
    color: "#64748b",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "16px",
  },

  card: {
    background: "white",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  /* ✅ NEW IMAGE STYLE */
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },

  cardTitle: {
    margin: "0 0 8px 0",
    color: "#1e3a8a",
  },

  cardText: {
    color: "#334155",
    marginBottom: "8px",
  },

  location: {
    color: "#475569",
    fontSize: "14px",
  },

  actions: {
    marginTop: "12px",
    display: "flex",
    gap: "8px",
  },

  viewBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    flex: 1,
  },

  editBtn: {
    background: "green",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    flex: 1,
  },

  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    flex: 1,
  },

  emptyState: {
    textAlign: "center",
    padding: "40px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    color: "#64748b",
  },
};