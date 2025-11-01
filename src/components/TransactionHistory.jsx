import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TransactionHistory.css";

const TransactionHistory = ({ token }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/transactions/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      }
    };
    fetchTransactions();
  }, [token]);

  return (
    <div className="transaction-history-container">
      <h2>Your Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions available.</p>
      ) : (
        <ul className="transaction-list">
          {transactions.map((tx) => (
  <li key={tx.id} className="transaction-item">
    <div className="left">
      <strong>{tx.category}</strong>
      <div className="date">
        {new Date(tx.date_time).toLocaleString()} 
      </div>
    </div>
    <div className="right">
      ₹{parseFloat(tx.amount).toFixed(2)}
    </div>
  </li>
))}

        </ul>
      )}
    </div>
  );
};

export default TransactionHistory;