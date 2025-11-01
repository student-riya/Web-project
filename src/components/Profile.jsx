import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = ({ token }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (err) {
        console.error("Profile fetch failed:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put("http://127.0.0.1:8000/api/update-profile/", {
        username: newUsername,
        password: newPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile updated successfully.");
      setEditMode(false);
      window.location.reload(); 
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Profile update failed.");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile">
      <h2>👤 User Profile</h2>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email || "Not provided"}</p>
      <p><strong>Total Transactions:</strong> {userData.total_transactions || 0}</p>

      <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>

      <hr />

      <h3>Edit Profile</h3>
      {!editMode ? (
        <button onClick={() => setEditMode(true)} className="edit-btn">✏️ Edit</button>
      ) : (
        <div className="edit-form">
          <div>
            <label>New Username</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Leave blank to keep same"
            />
          </div>
          <div>
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Leave blank to keep same"
            />
          </div>
          <button onClick={handleUpdateProfile}> Save</button>
          <button onClick={() => setEditMode(false)} style={{ marginLeft: "10px" }}> Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
