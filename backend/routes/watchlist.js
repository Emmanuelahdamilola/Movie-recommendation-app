const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createWatchlist,
  getUserWatchlists,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  deleteWatchlist,
} = require("../controllers/watchlistController");

router.use(authMiddleware);

// 🟢 Separate route for adding a movie
router.post("/add", addMovieToWatchlist); // POST /api/watchlists/add

router.post("/", createWatchlist); // POST /api/watchlists
router.get("/", getUserWatchlists); // GET /api/watchlists
router.put("/:id", addMovieToWatchlist); // optionally keep for manual add to specific list
router.delete("/:id/movie/:movieId", removeMovieFromWatchlist); // DELETE /api/watchlists/:id/movie/:movieId
router.delete("/:id", deleteWatchlist); // DELETE /api/watchlists/:id

module.exports = router;
