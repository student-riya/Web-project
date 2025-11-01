import React from "react";
import "./../styles/balancecard.css";

const BalanceCard = ({ title, amount }) => {
  return (
    <div className="balance-card">
      <p className="card-title">{title}</p>
      <p className="card-amount">₹{amount.toLocaleString()}</p>
    </div>
  );
};

export default BalanceCard;
