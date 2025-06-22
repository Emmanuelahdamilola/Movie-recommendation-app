const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");
const favoriteRoutes = require("./routes/favorite");
const customWatchlistRoutes = require("./routes/watchlist");
const reviewsRoutes = require("./routes/reviews");
const genreRoutes = require("./routes/genreRoutes");
const discoverRoutes = require("./routes/discoverRoutes");
const userRoutes = require('./routes/userRoutes');
const socialRoutes = require('./routes/socialRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const userContentRoutes = require("./routes/userContentRoutes");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving for avatars
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/watchlists", customWatchlistRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/discover", discoverRoutes);
app.use("/api/users", userRoutes);                
app.use("/api/social", socialRoutes); 
app.use("/api/user-content", userContentRoutes);  
// app.use("/api/users", socialRoutes);

app.use("/api/recommendations", recommendationRoutes);






mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server running on port", process.env.PORT);
    });
  })
  .catch((err) => console.error(err));
