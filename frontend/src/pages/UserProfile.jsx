// Updated UserProfile.jsx with role, avatar, and safe rendering

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";
import FollowButton from "../components/FollowButton";
import MovieCard from "../components/MovieCards";

const UserProfile = () => {
  const { userId } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [watchlists, setWatchlists] = useState([]);
  const [userInfo, setUserInfo] = useState({ username: "", role: "", avatarUrl: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/social/${userId}/lists`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFavorites(res.data.favorites || []);
        setWatchlists(res.data.watchlists || []);

        // Fetch user info (username, role, avatar)
        const userRes = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { username, role, avatarUrl } = userRes.data;
        setUserInfo({ username, role, avatarUrl });
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <div className="flex items-center gap-4 mb-6">
        {userInfo.avatarUrl && (
          <img
            src={userInfo.avatarUrl}
            alt="avatar"
            className="w-20 h-20 rounded-full border border-gray-600 object-cover"
          />
        )}
        <div>
          <h2 className="text-2xl font-bold">{userInfo.username}'s Profile</h2>
          {userInfo.role && (
            <p className="text-sm italic text-gray-400 mt-1">Role: {userInfo.role}</p>
          )}
        </div>
      </div>

      <FollowButton targetUserId={userId} />

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Favorites</h3>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {favorites.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No favorites available.</p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Watchlist</h3>
        {watchlists.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {watchlists.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No watchlist items.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
