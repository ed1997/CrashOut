import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  // =====================
  // VALIDATION
  // =====================
  const validate = () => {
    if (!name.trim()) return "Name is required";

    if (!email.trim()) return "Email is required";
    if (!email.includes("@") || !email.includes("."))
      return "Invalid email format";

    if (!password) return "Password is required";
    if (password.length < 6)
      return "Password must be at least 6 characters";

    if (!/[A-Za-z]/.test(password))
      return "Password must contain at least one letter";

    if (!/[0-9]/.test(password))
      return "Password must contain at least one number";

    if (password !== confirmPassword)
      return "Passwords do not match";

    return null;
  };

  // =====================
  // REGISTER
  // =====================
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:5126/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Registration failed");
      }

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>
        <p style={styles.subtitle}>Create your CrashOut account</p>

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
          />

          {error && <div style={styles.error}>{error}</div>}

          <button
            type="submit"
            style={styles.button}
            disabled={submitting}
          >
            {submitting ? "Creating account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

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