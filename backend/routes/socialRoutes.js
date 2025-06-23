const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const socialController = require("../controllers/socialController");

router.get("/", authMiddleware, socialController.getSocial); 

router.post("/:id/follow", authMiddleware, socialController.followUser);
router.post("/:id/unfollow", authMiddleware, socialController.unfollowUser);

module.exports = router;
