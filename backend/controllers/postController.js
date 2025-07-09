const Post = require("../models/Post");
const notifyUser = require("../utils/notifyUser");

// CREATE A NEW POST
exports.createPost = async (req, res) => {
  try {
    const { caption } = req.body;

    const newPost = new Post({
      user: req.user.id,
      caption,
      image: req.file ? req.file.path : null,
    });

    await newPost.save();

    const populatedPost = await Post.findById(newPost._id)
      .populate("user", "fullName profilePic");

    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET FEED (ALL POSTS)
exports.getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", "fullName profilePic")
      .populate("comments.user", "fullName profilePic");

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LIKE OR UNLIKE A POST
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user.id;

    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);

      // Notify the post owner if someone else liked it
      if (post.user.toString() !== userId) {
        await notifyUser({
          userId: post.user,
          type: "like",
          message: `${req.user.fullName} liked your post.`,
          link: `/posts/${post._id}`,
        });
      }
    }

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("user", "fullName profilePic")
      .populate("comments.user", "fullName profilePic");

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// COMMENT ON A POST
exports.commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = {
      user: req.user.id,
      text: req.body.text,
    };

    post.comments.push(comment);
    await post.save();

    // Notify the post owner if someone else commented
    if (post.user.toString() !== req.user.id) {
      await notifyUser({
        userId: post.user,
        type: "comment",
        message: `${req.user.fullName} commented on your post.`,
        link: `/posts/${post._id}`,
      });
    }

    const updatedPost = await Post.findById(post._id)
      .populate("user", "fullName profilePic")
      .populate("comments.user", "fullName profilePic");

    res.status(201).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// This code defines the post-related functionalities for the Hive application.
// It includes creating a new post, retrieving the feed of all posts, liking or unliking a post, and commenting on a post.
// The `createPost` function allows users to create a new post with an optional image and caption.
// The `getFeed` function retrieves all posts, sorted by creation date, and populates user information for each post.
// The `likePost` function allows users to like or unlike a post, updating the likes array accordingly.
// If a post is liked by someone other than the post owner, a notification is sent to the post owner.
// The `commentOnPost` function allows users to comment on a post, adding the comment to the post's comments array.
// If a post is commented on by someone other than the post owner, a notification is sent to the post owner.
// The modular structure of the code allows for easy maintenance and scalability as the application grows.
// New features can be added without disrupting existing functionality, ensuring a robust and user-friendly experience for users interacting with posts in the Hive application.
// The use of Mongoose for database interactions ensures that all operations are performed securely and efficiently.
// The code also includes error handling to manage cases where posts are not found or users attempt to perform unauthorized actions.
// This is essential for maintaining the integrity of the application and providing a smooth user experience.
// The use of notifications enhances user engagement by keeping users informed about interactions with their posts, such as likes and comments.
// This is crucial for building a vibrant community within the Hive application,
// where users can share their thoughts, media, and interact with others seamlessly.

exports.updatePost = async (req, res) => {
  try {
    const post = await require("../models/Post").findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const { caption } = req.body;

    if (caption) post.caption = caption;
    if (req.file) post.image = req.file.path;

    await post.save();

    const updated = await post
      .populate("user", "fullName profilePic")
      .populate("comments.user", "fullName profilePic")
      .execPopulate?.() ?? post;

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// This function allows users to update their existing posts.
// It checks if the post exists and if the user is authorized to update it.
// If the user is authorized, it updates the caption and/or image of the post.
// After updating, it populates the user and comments information and returns the updated post.

exports.deletePost = async (req, res) => {
  try {
    const post = await require("../models/Post").findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await post.remove();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// This function allows users to delete their existing posts.

