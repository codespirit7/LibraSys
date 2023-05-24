import { useState } from "react";
import "./adminLogin.css";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/adminLogin", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("adminToken", data.token);
        localStorage.removeItem("userToken");
        window.location.replace("/admin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="adminLogin">
      <div className="borderBoxAL">
        <span className="adminLoginTitle">Admin Login</span>
        <form onSubmit={handleSubmit} className="adminLoginForm">
          <label className="lbl">Email</label>
          <input
            type="text"
            className="adminLoginInput"
            placeholder="Enter your email..."
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label className="lbl">Password</label>
          <input
            type="password"
            className="adminLoginInput"
            placeholder="Enter your password..."
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button className="adminLoginButton" type="submit">
            Login
          </button>
        </form>
      </div>
      <button className="registerLoginButton">
        <Link to="/adminRegister" className="link">
          Admin Register
        </Link>
      </button>
    </div>
  );
}
