// src/components/FollowButton.jsx
import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

const FollowButton = ({ targetUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const following = res.data.following || [];
        setIsFollowing(following.includes(targetUserId));
      } catch (err) {
        console.error("Failed to check follow status", err);
      }
    };
    checkStatus();
  }, [targetUserId]);

  const handleFollowToggle = async () => {
    const token = localStorage.getItem("token");
    const url = `/api/social/${isFollowing ? "unfollow" : "follow"}/${targetUserId}`;
    try {
      await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error("Failed to toggle follow", err);
    }
  };

  return (
    <button
      onClick={handleFollowToggle}
      className={`px-4 py-2 rounded ${
        isFollowing ? "bg-red-500 text-white" : "bg-blue-500 text-white"
      }`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
