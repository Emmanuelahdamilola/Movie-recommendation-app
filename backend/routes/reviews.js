const express = require("express");
const router = express.Router();
const {
  addOrUpdateReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:id", getReviews); // GET reviews for movieId
router.post("/", authMiddleware, addOrUpdateReview); // POST or PUT
router.delete("/:id", authMiddleware, deleteReview); // DELETE by movieId

module.exports = router;
