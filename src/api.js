import axios from 'axios';

const API_BASE = "http://127.0.0.1:8000";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE}/api/token/`, {
      username,
      password
    });

    const { access } = response.data;

    localStorage.setItem("token", access);  
    return access;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const getTransactions = async (token) => {
  if (!token) {
    console.error("❌ No token provided!");
    throw new Error("No token");
  }

  console.log("📦 Using token:", token);

  const response = await axios.get("http://127.0.0.1:8000/api/transactions/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const addTransaction = async (token, formData) => {
  const response = await axios.post(`${API_BASE}/api/transactions/`, {
    amount: formData.amount,
    category: formData.category,
    payment_method: formData.paymentMethod,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
