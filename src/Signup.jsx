import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    confirm: ""
  });
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!form.first || !form.last || !form.email || !form.password || !form.confirm)
      return setError("All fields required");

    if (form.password !== form.confirm)
      return setError("Passwords do not match");

    localStorage.setItem("user", JSON.stringify(form));
    setUser(form);
    navigate("/");
  };

  return (
    <div className="signup">
      <div className="signup-card">
        <h2>Create Account</h2>

        <input placeholder="First Name" onChange={e => setForm({...form, first: e.target.value})}/>
        <input placeholder="Last Name" onChange={e => setForm({...form, last: e.target.value})}/>
        <input type="email" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})}/>
        <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})}/>
        <input type="password" placeholder="Confirm Password" onChange={e => setForm({...form, confirm: e.target.value})}/>

        {error && <p className="error">{error}</p>}

        <button onClick={handleSignup}>Sign Up</button>

        <p className="switch">
          Already have an account?
          <span onClick={() => navigate("/signin")}> Sign In</span>
        </p>
      </div>
    </div>
  );
}