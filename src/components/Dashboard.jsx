import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  FaBus,
  FaMobileAlt,
  FaShoppingCart,
  FaBolt,
  FaMoneyBill,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const categories = [
  {
    name: "Booking For Transport",
    icon: <FaBus />,
    color: "#0088FE",
    subcategories: ["Train", "Bus", "Flight", "Car"],
  },
  {
    name: "Bill Payment",
    icon: <FaBolt />,
    color: "#00C49F",
    subcategories: ["Electric", "Gas"],
  },
  {
    name: "Recharge",
    icon: <FaMobileAlt />,
    color: "#FFBB28",
    subcategories: ["Mobile", "WiFi", "TV Cable"],
  },
  {
    name: "Fund Transfer",
    icon: <FaMoneyBill />,
    color: "#FF8042",
    subcategories: ["Bank Transfer"],
  },
  {
    name: "Purchase E-commerce",
    icon: <FaShoppingCart />,
    color: "#AA00FF",
    subcategories: ["Electronics", "Accessories", "Clothes"],
  },
];

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const fetchTransactions = useCallback(async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/transactions/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(res.data);
    } catch (err) {
      console.error("Fetch Error:", err.response?.data || err.message);
    }
  }, [token]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const total = transactions.reduce((acc, t) => acc + parseFloat(t.amount), 0);

  const income = transactions
    .filter((t) => parseFloat(t.amount) > 0)
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);

  const expenses = transactions
    .filter((t) => parseFloat(t.amount) < 0)
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);
const pieData = categories
  .map((cat) => {
    const value = transactions
      .filter((t) => t.category === cat.name)
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    return { name: cat.name, value };
  })
  .filter((item) => item.value > 0);

  return (
    <div className="dashboard">
      <div className="top">
        <h2>📊 MULTIPURPOSE FINANCE TRANSACTION AND EXPENSE TRACKER</h2>
        <button
          className="profile-btn"
          onClick={() => navigate("/profile")}
          style={{ marginRight: "10px" }}
        >
          👤 Profile
        </button>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout
        </button>
        <button className="history-btn" onClick={() => navigate("/history")}>
          📜 Transaction History
        </button>
      </div>

      <div className="cards">
        <div className="card">💰 Balance: ₹{total.toFixed(2)}</div>
        <div className="card income">⬆ Income: ₹{income.toFixed(2)}</div>
        <div className="card expense">⬇ Expense: ₹{Math.abs(expenses).toFixed(2)}</div>
      </div>

      <h3>Spending Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100}>
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={categories.find((c) => c.name === entry.name).color}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <h3>Expenses by Category</h3>
      <ResponsiveContainer width="75%" height={300}>
        <BarChart data={pieData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Select a Category</h3>
      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="category-card"
            style={{ backgroundColor: cat.color }}
          >
            <div className="category-header">
              {cat.icon} {cat.name}
            </div>
            {cat.subcategories.map((sub) => (
              <button
                key={sub}
                className="subcategory-button"
                onClick={() =>
                  navigate(
                    `/transaction/${encodeURIComponent(cat.name)}/${encodeURIComponent(sub)}`
                  )
                }
              >
                {sub}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
