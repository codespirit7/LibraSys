import { Link } from "react-router-dom";
import "./login.css";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login/", {
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
        localStorage.setItem("userToken", data.token);
        window.location.replace("/home");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const token = localStorage.getItem("token");

  return (
    <div className="login">
      <div className="borderBoxL">
        <span className="loginTitle">Login</span>
        <form onSubmit={handleSubmit} className="loginForm">
          <label className="lblL">Email</label>
          <input
            type="text"
            className="loginInput"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="lblL">Password</label>
          <input
            type="password"
            className="loginInput"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="loginButton" type="submit">
            Login
          </button>
        </form>
      </div>
      <button className="registerLoginButtonL" type="submit">
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
    </div>
  );
}
