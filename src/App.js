import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Auth from "./components/Auth";
import TransactionHistory from "./components/TransactionHistory";
import Profile from "./components/Profile";
import TransactionPage from "./components/TransactionPage"; 
import Success from "./components/Success"; 
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <Router>
      <Routes>
        {token ? (
          <>
            <Route path="/" element={<Dashboard token={token} />} />
            <Route path="/profile" element={<Profile token={token} />} />
            <Route path="/transaction/:category/:subcategory" element={<TransactionPage token={token} />} />
            <Route path="/history" element={<TransactionHistory token={token} />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Auth setToken={setToken} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
