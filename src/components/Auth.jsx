import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

const Auth = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://127.0.0.1:8000/api/token/"
      : "http://127.0.0.1:8000/api/register/";

    try {
      const res = await axios.post(url, { username, password });
      if (isLogin) {
        const token = res.data.access;
        localStorage.setItem("token", token);
        setToken(token);
      } else {
        alert("Registered successfully. Now login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || "Something went wrong"));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />
          <button type="submit" className="auth-btn">{isLogin ? "Login" : "Register"}</button>
        </form>
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span className="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Register" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
