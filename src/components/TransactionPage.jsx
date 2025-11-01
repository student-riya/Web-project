import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TransactionPage.css";

const TransactionPage = ({ token }) => {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  // Conditional inputs
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [electricitySupplier, setElectricitySupplier] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIFSCCode] = useState("");
  const [address, setAddress] = useState("");
  const [itemName, setItemName] = useState("");
  const [networkName, setNetworkName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePay = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

const payload = {
  category,
  subcategory,
  amount: parseFloat(amount),
  payment_method: paymentMethod,
  // other fields as needed...
};

    if (category === "Booking For Transport") {
      payload.source = source;
      payload.destination = destination;
    }

    if (category === "Bill Payment" && subcategory === "Electric") {
      payload.customer_id = customerId;
      payload.electricity_supplier = electricitySupplier;
    }

    if (category === "Fund Transfer") {
      payload.account_number = accountNumber;
      payload.bank_name = bankName;
      payload.ifsc_code = ifscCode;
    }

    if (
      category === "Purchase E-commerce" &&
      ["Electronics", "Accessories", "Clothes"].includes(subcategory)
    ) {
      payload.address = address;
      payload.item_name = itemName;
    }

    if (
      category === "Recharge" &&
      ["Mobile", "WiFi"].includes(subcategory)
    ) {
      payload.network_name = networkName;
      payload.phone_number = phoneNumber;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/transactions/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
        navigate("/success");
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="transaction-page">
      <h2>Payment</h2>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Subcategory:</strong> {subcategory}</p>

      <div className="form-group">
        <label>Amount (₹)</label>
        <input
          type="number"
          min="1"
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="UPI">UPI</option>
          <option value="Net Banking">Net Banking</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Credit Card">Credit Card</option>
        </select>
      </div>

      {category === "Booking For Transport" && (
        <>
          <div className="form-group">
            <label>Source</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </>
      )}

      {category === "Bill Payment" && subcategory === "Electric" && (
        <>
          <div className="form-group">
            <label>Customer ID</label>
            <input
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Electricity Supplier</label>
            <input
              type="text"
              value={electricitySupplier}
              onChange={(e) => setElectricitySupplier(e.target.value)}
            />
          </div>
        </>
      )}

      {category === "Fund Transfer" && (
        <>
          <div className="form-group">
            <label>Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="e.g., 1234567890"
            />
          </div>
          <div className="form-group">
            <label>Bank Name</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="e.g., HDFC Bank"
            />
          </div>
          <div className="form-group">
            <label>IFSC Code</label>
            <input
              type="text"
              value={ifscCode}
              onChange={(e) => setIFSCCode(e.target.value)}
              placeholder="e.g., SBIN0000300"
            />
          </div>
        </>
      )}

      {category === "Purchase E-commerce" &&
        ["Electronics", "Accessories", "Clothes"].includes(subcategory) && (
          <>
            <div className="form-group">
              <label>Delivery Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter full address"
              />
            </div>
            <div className="form-group">
              <label>Item Name</label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Enter Item Name"
              />
            </div>
          </>
        )}

      {category === "Recharge" &&
        ["Mobile", "WiFi"].includes(subcategory) && (
          <>
            <div className="form-group">
              <label>Network Name</label>
              <input
                type="text"
                value={networkName}
                onChange={(e) => setNetworkName(e.target.value)}
                placeholder="e.g., Airtel, Jio"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g., 9876543210"
              />
            </div>
          </>
        )}

      <button onClick={handlePay} className="pay-btn">
        Pay ₹{amount || "0"}
      </button>
    </div>
  );
};

export default TransactionPage;
