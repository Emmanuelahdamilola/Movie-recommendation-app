// // routes/devTools.js (create this if it doesn't exist)
// const express = require("express");
// const router = express.Router();
// const Favorite = require("../models/Favorite");

// // ⚠️ Only use this route once, then delete it!
// router.delete("/clean-duplicates", async (req, res) => {
//   try {
//     const allFavorites = await Favorite.find().sort({ createdAt: 1 });

//     const seen = new Set();
//     const duplicates = [];

//     for (const fav of allFavorites) {
//       const key = `${fav.userId}_${fav.movieId}`;
//       if (seen.has(key)) {
//         duplicates.push(fav._id);
//       } else {
//         seen.add(key);
//       }
//     }

//     if (duplicates.length) {
//       await Favorite.deleteMany({ _id: { $in: duplicates } });
//     }

//     res.json({
//       message: `✅ Removed ${duplicates.length} duplicate favorites.`,
//     });
//   } catch (err) {
//     console.error("❌ Error cleaning favorites:", err);
//     res.status(500).json({ error: "Failed to clean duplicates" });
//   }
// });

// module.exports = router;
