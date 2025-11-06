import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Loader from "../components/Loader";

export default function Login() {
  const [mode, setMode] = useState("login"); // login or register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      if (mode === "login") {
        const { data } = await API.post("/users/login", { email, password });
        localStorage.setItem("token", data.token);
      } else {
        const { data } = await API.post("/users/register", { name, email, password });
        localStorage.setItem("token", data.token);
      }
      setLoading(false);
      navigate("/livescores");
    } catch (error) {
      setLoading(false);
      setErr(error.response?.data?.message || error.message || "Request failed");
    }
  };

  return (
    <div className="page card auth-card">
      <h2>{mode === "login" ? "Login" : "Register"}</h2>

      <form onSubmit={submit} className="form">
        {mode === "register" && (
          <input
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {err && <div className="error">{err}</div>}

        <button className="btn" type="submit" disabled={loading}>
          {loading ? <Loader text={mode === "login" ? "Logging in..." : "Registering..."} /> : mode === "login" ? "Login" : "Create account"}
        </button>
      </form>

      <div className="muted">
        {mode === "login" ? (
          <>
            Don't have an account?{" "}
            <button className="link" onClick={() => setMode("register")}>Register</button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button className="link" onClick={() => setMode("login")}>Login</button>
          </>
        )}
      </div>
    </div>
  );
}
