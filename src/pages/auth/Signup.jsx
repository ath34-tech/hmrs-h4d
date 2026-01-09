import { useState } from "react";
import { signUp } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await signUp(email, password, role);
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
      <h2>Signup</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      {/* ROLE SELECTION */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ width: "100%", marginBottom: "20px" }}
      >
        <option value="employee">Employee</option>
        <option value="supervisor">Supervisor</option>
        <option value="hr">HR</option>
        {/* ❌ Admin signup intentionally disabled */}
      </select>

      <button
        onClick={handleSignup}
        disabled={loading}
        style={{ width: "100%" }}
      >
        {loading ? "Creating account..." : "Signup"}
      </button>

      <p style={{ marginTop: "15px" }}>
        Already have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}
