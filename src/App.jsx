import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import Home from "./Home";
import Profile from "./Profile";
import Cart from "./Cart";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="navbar">
        <h2>DarkStore</h2>

        <div className="nav-right">
          <Link to="/">Home</Link>

          <Link to="/cart" className="cart-link">
            🛒 <span>{totalItems}</span>
          </Link>

          <div ref={menuRef} className={`profile-menu ${open ? "active" : ""}`}>
            <span onClick={() => setOpen(!open)}>👤</span>

            <div className="dropdown">
              <Link to="/profile">Profile</Link>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={user ? <Home cart={cart} setCart={setCart} /> : <Navigate to="/signin" />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/signin" element={<Signin setUser={setUser} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </>
  );
}

export default App;