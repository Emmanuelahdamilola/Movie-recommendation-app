const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// User profile and authentication routes
router.get("/:id", authMiddleware, userController.getUserById);
router.put("/:id", authMiddleware, userController.updateUser);
router.post("/change-password", authMiddleware, userController.changePassword);

// Social: follow/unfollow
router.post("/:id/follow", authMiddleware, userController.followUser);
router.post("/:id/unfollow", authMiddleware, userController.unFollowUser);

// Avatar upload
// router.post("/:id/avatar", authMiddleware, upload.single("avatar"), userController.uploadAvatar);
router.post(
  "/:id/avatar",
  authMiddleware,
  upload.single("avatar"),
  userController.uploadAvatar
);

module.exports = router;