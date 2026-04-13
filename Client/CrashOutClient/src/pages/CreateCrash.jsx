import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function CreateCrash() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { token } = useAuth();

  // =====================
  // VALIDATION
  // =====================
  const validate = () => {
    if (!title.trim()) return "Title is required";
    if (title.trim().length < 3) return "Title must be at least 3 characters";

    if (!description.trim()) return "Description is required";
    if (description.trim().length < 10)
      return "Description must be at least 10 characters";

    if (!location.trim()) return "Location is required";

    if (imageUrl.trim() && !imageUrl.startsWith("http")) {
      return "Image URL must start with http or https";
    }

    return null;
  };

  // =====================
  // SUBMIT
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:5126/api/CrashReports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          location: location.trim(),
          imageUrl: imageUrl.trim(),
        }),
      });

      if (!res.ok) throw new Error("Failed to create crash");

      navigate("/crashes");
    } catch (err) {
      console.error(err);
      setError("Failed to create crash report");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Crash</h2>
        <p style={styles.subtitle}>Report a new crash incident</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />

          <input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="Image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={styles.input}
          />

          {error && <div style={styles.error}>{error}</div>}

          <button
            type="submit"
            style={styles.button}
            disabled={submitting}
          >
            {submitting ? "Creating..." : "Create Crash"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCrash;

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
    maxWidth: "420px",
    background: "white",
    padding: "24px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  title: {
    margin: 0,
    color: "#1e3a8a",
  },

  subtitle: {
    marginTop: "6px",
    marginBottom: "18px",
    color: "#64748b",
    fontSize: "14px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    outline: "none",
  },

  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    minHeight: "90px",
    resize: "vertical",
    outline: "none",
  },

  button: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "8px",
    borderRadius: "8px",
    fontSize: "13px",
  },
};