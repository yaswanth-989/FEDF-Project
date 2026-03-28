import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

export default function Signin({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = () => {
    const saved = JSON.parse(localStorage.getItem("user"));
    if (!saved) return setError("No account found");

    if (form.email === saved.email && form.password === saved.password) {
      setUser(saved);
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="signin">
      <div className="signin-card">
        <h2>Sign In</h2>

        <input type="email" placeholder="Email"
          onChange={e => setForm({...form, email: e.target.value})}/>
        <input type="password" placeholder="Password"
          onChange={e => setForm({...form, password: e.target.value})}/>

        {error && <p className="error">{error}</p>}

        <button onClick={handleLogin}>Login</button>

        <p className="switch">
          Don’t have an account?
          <span onClick={() => navigate("/signup")}> Sign Up</span>
        </p>
      </div>
    </div>
  );
}