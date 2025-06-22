const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Favorite = require("../models/Favorite");
const Watchlist = require("../models/Watchlist");

// GET /api/users/:username/favorites
router.get("/:username/favorites", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const favorites = await Favorite.find({ user: user._id });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch favorites" });
  }
});

// GET /api/users/:username/watchlists
router.get("/:username/watchlists", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const watchlists = await Watchlist.find({ user: user._id });
    res.json(watchlists);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch watchlists" });
  }
});

module.exports = router;
