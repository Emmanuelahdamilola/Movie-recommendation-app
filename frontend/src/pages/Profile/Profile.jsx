// Updated Profile.jsx with Avatar Upload, Tabs, Profile Info, Change Password, and Delete Account

import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Recommended from "../../components/RecommendedMovies";
import { motion } from "framer-motion";

const Profile = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [editForm, setEditForm] = useState({ username: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ oldPassword: "", newPassword: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [tab, setTab] = useState("watchlist");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      fetchUserInfo(decoded.id);
      fetchWatchlist();
      fetchFavorites();
    } catch (err) {
      toast.error("Failed to decode token");
    }
  }, [token]);

  const fetchUserInfo = async (userId) => {
    try {
      const res = await axios.get(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      setUser(data);
      setEditForm({ username: data.username || "", email: data.email || "" });
    } catch (err) {
      toast.error("Failed to fetch user info");
    }
  };

  const fetchWatchlist = async () => {
    try {
      const res = await axios.get("/api/watchlists", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWatchlist(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to load watchlist");
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await axios.get("/api/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to load favorites");
    }
  };

  // const handleAvatarChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append("avatar", file); // name must match multer config

  //   try {
  //     await axios.post(`/api/users/${user._id}/avatar`, formData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     toast.success("Avatar uploaded");
  //     fetchUserInfo(user._id); // refresh user
  //   } catch (err) {
  //     toast.error("Upload failed");
  //   }
  // };


  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    console.log("User ID:", user?._id);

    if (!file || !user?._id) {
      console.warn("❌ No file or user ID found.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.post(`/api/users/${user._id}/avatar`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("✅ Upload success:", response.data);
      toast.success("Avatar uploaded successfully");
      fetchUserInfo(user._id);
    } catch (err) {
      console.error("❌ Upload failed:", err.response?.data || err.message);
      toast.error("Failed to upload avatar");
    }
  };




  const handleProfileUpdate = async () => {
    try {
      await axios.put(`/api/users/${user.id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated");
      setIsEditing(false);
      fetchUserInfo(user.id);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handlePasswordChange = async () => {
    try {
      await axios.post("/api/users/change-password", passwordForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Password changed");
    } catch (err) {
      toast.error("Password change failed");
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("Are you sure you want to delete your account?");
    if (!confirm) return;
    try {
      await axios.delete(`/api/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      toast.success("Account deleted");
      navigate("/login");
    } catch (err) {
      toast.error("Failed to delete account");
    }
  };

  const renderMovies = (movies) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {movies.map((movie, i) => (
        <div key={`${movie.movieId}-${i}`} className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
          <img
            src={movie.posterPath ? `https://image.tmdb.org/t/p/w200${movie.posterPath}` : "/fallback.jpg"}
            alt={movie.title}
            className="w-full h-60 object-cover"
          />
          <p className="text-sm text-center p-2 text-white">{movie.title}</p>
        </div>
      ))}
    </div>
  );

  if (!user) return <p className="text-center text-white mt-20">Loading profile...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-white">
      <div className="flex items-center gap-4 mb-8 mt-10">
        <img
          src={user.avatarUrl ? `http://localhost:7000/${user.avatarUrl}` : "/default-avatar.png"}
          alt="avatar"
          className="w-full max-w-[100px] sm:max-w-[120px] md:max-w-[140px] aspect-square rounded-full object-cover border border-gray-600 hover:scale-105 transition-transform duration-300"
        />

        <div>
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <input type="file" onChange={handleAvatarChange} className="mt-2 text-sm text-gray-300" />
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Profile Info</h2>
        {!isEditing ? (
          <>
            <p className="mb-2"><span className="font-medium text-gray-300">Username:</span> {user.username}</p>
            <p className="mb-2"><span className="font-medium text-gray-300">Email:</span> {user.email}</p>
            <Link to="/social" className="text-blue-400 hover:underline text-sm">View Social Connections</Link>
            <div className="mt-4">
              <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition">Edit Info</button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
              <input
                type="text"
                value={editForm.username}
                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              />
            </div>
            <div className="flex gap-4">
              <button onClick={handleProfileUpdate} className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition">Save</button>
              <button onClick={() => setIsEditing(false)} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition">Cancel</button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-900 p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <div className="space-y-4">
          <input
            type="password"
            value={passwordForm.oldPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
            placeholder="Old Password"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
          <input
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            placeholder="New Password"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
          <button onClick={handlePasswordChange} className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700 transition">
            Change Password
          </button>
        </div>
      </div>

      <div className="mt-4">
        <button onClick={handleDeleteAccount} className="bg-red-700 px-4 py-2 rounded hover:bg-red-800 transition">
          Delete Account
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mt-10 border-b border-gray-700">
        {['watchlist', 'favorites'].map((name) => (
          <button
            key={name}
            onClick={() => setTab(name)}
            className={`relative px-4 py-2 text-sm font-semibold transition hover:text-yellow-400 ${tab === name ? 'text-yellow-400' : 'text-gray-400'}`}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
            {tab === name && <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-400" />}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-6">
        {tab === 'watchlist' && (
          watchlist.length > 0 && watchlist[0]?.movies?.length > 0
            ? renderMovies(watchlist[0].movies)
            : <p className="text-gray-400">No watchlist items.</p>
        )}

        {tab === 'favorites' && (
          favorites.length > 0
            ? renderMovies(favorites)
            : <p className="text-gray-400">No favorite movies.</p>
        )}
      </motion.div>

      <div className="mt-12">
        {user && <Recommended token={token} />}
      </div>
    </div>
  );
};

export default Profile;
