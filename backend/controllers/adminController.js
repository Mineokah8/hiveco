const User = require("../models/User");
const Post = require("../models/Post");
const notifyUser = require("../utils/notifyUser");

// Delete any post
exports.adminDeletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  await post.remove();
  res.status(200).json({ message: "Post deleted by admin" });
};

// Suspend a user
exports.suspendUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.isSuspended = true;
  await user.save();

  await notifyUser({
    userId: user._id,
    type: "warning",
    message: "Your account has been suspended by an admin.",
    link: "/support",
  });

  res.status(200).json({ message: "User suspended" });
};

// Warn a user
exports.warnUser = async (req, res) => {
  const { reason } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.warnings.push(reason);
  await user.save();

  await notifyUser({
    userId: user._id,
    type: "warning",
    message: `You received a warning: ${reason}`,
    link: "/support",
  });

  res.status(200).json({ message: "User warned" });
};
