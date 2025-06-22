const mongoose = require("mongoose");

const viewedMovieSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  movieId: String,
  title: String,
  poster_path: String,
  genres: [Number], // genre IDs
  viewedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ViewedMovie", viewedMovieSchema);
