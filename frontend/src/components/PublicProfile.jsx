import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";
import MovieCards from "./MovieCards";

const PublicProfile = () => {
  const { username } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [watchlists, setWatchlists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favRes = await axios.get(`/api/users/${username}/favorites`);
        const watchRes = await axios.get(`/api/users/${username}/watchlists`);
        setFavorites(favRes.data);
        setWatchlists(watchRes.data);
      } catch (err) {
        console.error("Error loading user content", err);
      }
    };
    fetchData();
  }, [username]);

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">@{username}'s Public Profile</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🎬 Favorites</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.map((fav) => (
            <MovieCard key={fav.movieId} movieId={fav.movieId} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">📺 Watchlists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {watchlists.map((item) => (
            <MovieCards key={item.movieId} movieId={item.movieId} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PublicProfile;
