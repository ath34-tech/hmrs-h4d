import { useState } from "react";
import { signIn } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const role = await signIn(email, password);
      navigate(`/dashboard`);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>

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
        style={{ width: "100%", marginBottom: "20px" }}
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        style={{ width: "100%" }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

    </div>
  );
}
