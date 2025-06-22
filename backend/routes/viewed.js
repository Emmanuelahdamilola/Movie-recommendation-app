const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const ViewedMovie = require("../models/ViewedMovie");

router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { movieId, title, poster_path, genres } = req.body;

    const viewed = new ViewedMovie({
      userId: decoded.id,
      movieId,
      title,
      poster_path,
      genres,
    });

    await viewed.save();
    res.status(201).json(viewed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving viewed movie" });
  }
});

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const history = await ViewedMovie.find({ userId: decoded.id })
      .sort({ viewedAt: -1 })
      .limit(10);
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching history" });
  }
});

module.exports = router;
