
const User = require("../models/User");

exports.getSocial = async (req, res) => {
  console.log("📡 Reached GET /api/social");
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user in request" });
    }
console.log("Fetching social for user:", req.user.id);
    const user = await User.findById(req.user.id)
      .populate("followers", "username email")
      .populate("following", "username email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      followers: user.followers || [],
      following: user.following || [],
    });
  } catch (err) {
    console.error("getSocial error:", err);
    res.status(500).json({ message: "Failed to load social data" });
  }
};

exports.followUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user.id;

    if (targetUserId === currentUserId)
      return res.status(400).json({ message: "You cannot follow yourself." });

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser)
      return res.status(404).json({ message: "User not found." });

    if (currentUser.following.includes(targetUserId))
      return res.status(400).json({ message: "Already following." });

    currentUser.following.push(targetUserId);
    targetUser.followers.push(currentUserId);

    await currentUser.save();
    await targetUser.save();

    res.json({ message: "Followed user." });
  } catch (err) {
    res.status(500).json({ message: "Error following user." });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user.id;

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser)
      return res.status(404).json({ message: "User not found." });

    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== targetUserId
    );
    targetUser.followers = targetUser.followers.filter(
      (id) => id.toString() !== currentUserId
    );

    await currentUser.save();
    await targetUser.save();

    res.json({ message: "Unfollowed user." });
  } catch (err) {
    res.status(500).json({ message: "Error unfollowing user." });
  }
};
