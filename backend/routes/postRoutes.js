const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  createPost,
  getFeed,
  likePost,
  commentOnPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

/**
 * @route POST /api/posts
 * @desc Create a new post
 * @access Private
 */
router.post("/", auth, upload.single("image"), createPost);

/**
 * @route GET /api/posts
 * @desc Get all posts (feed)
 * @access Private
 */
router.get("/", auth, getFeed);

/**
 * @route PUT /api/posts/:id/like
 * @desc Like or unlike a post
 * @access Private
 */
router.put("/:id/like", auth, likePost);

/**
 * @route POST /api/posts/:id/comment
 * @desc Add a comment to a post
 * @access Private
 */
router.post("/:id/comment", auth, commentOnPost);

module.exports = router;
/**
 * @route PUT /api/posts/:id
 * @desc Update a post
 * @access Private (Owner only)
 */
router.put("/:id", auth, upload.single("image"), updatePost);

/**
 * @route DELETE /api/posts/:id
 * @desc Delete a post
 * @access Private (Owner only)
 */
router.delete("/:id", auth, deletePost);

// This code defines the post routes for the Hive application.
// It includes routes for creating a new post, retrieving the user's feed, liking or unliking a post, and commenting on a post.
// The `auth` middleware is used to ensure that only authenticated users can access these routes.
// The `upload` middleware handles image uploads for posts.
// The `createPost` controller allows users to create a new post with an optional image and caption.
// The `getFeed` controller retrieves all posts, sorted by creation date, and populates user information for each post.
// The `likePost` controller allows users to like or unlike a post, updating the likes array accordingly.
// The `commentOnPost` controller allows users to add comments to a post, notifying the post owner if someone else comments.
// This is essential for enabling social interactions within the Hive application, allowing users to share content, engage with others, and build a community around their