import React from "react";
import { useNavigate } from "react-router-dom";
import "./Success.css";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="success-box">
        <h2>✅ Payment Successful!</h2>
        <p>Your transaction has been recorded.</p>
        <button onClick={() => navigate("/")}>Go to Dashboard</button>
      </div>
    </div>
  );
};

export default Success;
