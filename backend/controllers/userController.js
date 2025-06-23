const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");
    console.log("Fetched user:", user);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Incorrect current password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Password update failed" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, username } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email, username },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.followUser = async (req, res) => {
  const userId = req.user.id;
  const targetId = req.params.id;

  if (userId === targetId)
    return res.status(400).json({ message: "Can't follow yourself" });

  const user = await User.findById(userId);
  const target = await User.findById(targetId);

  if (!target.followers.includes(userId)) {
    target.followers.push(userId);
    user.following.push(targetId);
    await target.save();
    await user.save();
  }

  res.json({ message: "Followed successfully" });
};

exports.unFollowUser = async (req, res) => {
  const userId = req.user.id;
  const targetId = req.params.id;

  const user = await User.findById(userId);
  const target = await User.findById(targetId);

  target.followers = target.followers.filter((id) => id.toString() !== userId);
  user.following = user.following.filter((id) => id.toString() !== targetId);

  await target.save();
  await user.save();

  res.json({ message: "Unfollowed successfully" });
};


exports.uploadAvatar = async (req, res) => {
  try {
    console.log("Incoming avatar upload...");
    console.log("req.file:", req.file); 

    const userId = req.params.id;

    if (!req.file) {
      console.log("No file received");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = `uploads/avatars/${req.file.filename}`;
    console.log(" File path to save:", filePath);

    const user = await User.findByIdAndUpdate(
      userId,
      { avatarUrl: filePath },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(" Avatar saved to user:", user.avatarUrl);
    res
      .status(200)
      .json({ message: "Avatar uploaded", avatarUrl: user.avatarUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error });
  }
};
