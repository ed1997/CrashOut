import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function EditCrash() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    imageUrl: "",
  });

  // =====================
  // FETCH EXISTING CRASH
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

        setForm({
          title: data.title || "",
          description: data.description || "",
          location: data.location || "",
          imageUrl: data.imageUrl || "",
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load crash report");
        setLoading(false);
      }
    };

    if (token) fetchCrash();
  }, [id, token]);

  // =====================
  // HANDLE INPUT CHANGE
  // =====================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =====================
  // VALIDATION (same rules as CreateCrash)
  // =====================
  const validate = () => {
    if (!form.title.trim()) return "Title is required";
    if (form.title.trim().length < 3)
      return "Title must be at least 3 characters";

    if (!form.description.trim())
      return "Description is required";
    if (form.description.trim().length < 10)
      return "Description must be at least 10 characters";

    if (!form.location.trim())
      return "Location is required";

    if (form.imageUrl.trim() && !form.imageUrl.startsWith("http")) {
      return "Image URL must start with http or https";
    }

    return null;
  };

  // =====================
  // UPDATE CRASH
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    toast.success("Crash updated successfully!");

    setSubmitting(true);

    try {
      const res = await fetch(
        `http://localhost:5126/api/CrashReports/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: form.title.trim(),
            description: form.description.trim(),
            location: form.location.trim(),
            imageUrl: form.imageUrl.trim(),
          }),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      navigate(`/crashes/${id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to update crash report");
    } finally {
      setSubmitting(false);
    }
  };

  // =====================
  // LOADING STATE
  // =====================
  if (loading) {
    return (
      <div style={styles.page}>
        <p>Loading crash data...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Edit Crash Report</h2>
        <p style={styles.subtitle}>Update the selected crash details</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            style={styles.input}
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            style={styles.textarea}
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            style={styles.input}
          />

          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Image URL (optional)"
            style={styles.input}
          />

          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Preview"
              style={styles.imagePreview}
              onError={(e) => (e.target.style.display = "none")}
            />
          )}

          {error && <div style={styles.error}>{error}</div>}

          <button
            type="submit"
            style={styles.button}
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => navigate(`/crashes/${id}`)}
            style={styles.secondaryButton}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCrash;

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

  imagePreview: {
    width: "100%",
    maxHeight: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
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

  secondaryButton: {
    background: "transparent",
    color: "#475569",
    border: "1px solid #cbd5e1",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "8px",
    borderRadius: "8px",
    fontSize: "13px",
  },
 
};