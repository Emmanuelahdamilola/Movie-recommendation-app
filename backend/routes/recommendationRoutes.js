// routes/recommendationRoutes.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const axios = require("axios");

router.get("/", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Missing token" });

  const token = authHeader.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }

  try {
    const user = await User.findById(decoded.id); // Example logic: use genres from favorites
    const favoriteGenres = user.favoriteGenres || [28, 12]; // fallback

    const genreQuery = favoriteGenres.join(",");
    const tmdbRes = await axios.get(
      `https://api.themoviedb.org/3/discover/movie`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
          with_genres: genreQuery,
        },
      }
    );

    res.json(tmdbRes.data.results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch recommendations" });
  }
});

module.exports = router;
