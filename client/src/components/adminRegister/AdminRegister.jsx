import { useState } from "react";
import "../adminRegister/adminRegister.css";
import { Link } from "react-router-dom";

export default function AdminRegister() {
  const [secret, setSecret] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://libra-sys.onrender.com/adminRegister/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("success", data);
        window.location.replace("/adminLogin");
      } else {
        console.log("Error", response.statusText);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="adminRegister">
      <div className="borderBoxAR">
        <span className="adminRegisterTitle">Admin Register</span>
        <form onSubmit={handleSubmit} className="adminRegisterForm">
          <label className="lbl">Secret Key</label>
          <input
            type="text"
            className="adminRegisterInput"
            placeholder="Enter your secret Key"
            onChange={(e) => setSecret(e.target.value)}
          />
          <label className="lbl">Email</label>
          <input
            type="text"
            className="adminRegisterInput"
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="lbl">Password</label>
          <input
            type="password"
            className="adminRegisterInput"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="adminRegisterButton" type="submit">
            REGISTER
          </button>
        </form>
        
      </div>
      <button className="registerLoginButton">
          <Link to="/adminLogin" className="link">
            Admin Login
          </Link>
        </button>
    </div>
  );
}
