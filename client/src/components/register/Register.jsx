import { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("success", data);
        window.location.replace("/login");
      } else {
        console.log("Error", response.statusText);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
  return (
    <div className="register">
      <div className="borderBoxR">
        <span className="registerTitle">Register</span>
        <form onSubmit={handleSubmit} className="registerForm">
          <label className="lbl">Username</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your username..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="lbl">Email</label>
          <input
            type="text"
            className="registerInput"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="lbl">Password</label>
          <input
            type="password"
            className="registerInput"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="registerButton" type="submit">
            REGISTER
          </button>
        </form>
       
      </div>
      <button className="registerLoginButton" type="submit">
          <Link to="/login" className="link">
            Login
          </Link>
        </button>
    </div>
  );
}
