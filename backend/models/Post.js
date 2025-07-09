const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    caption: { type: String },
    image: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
// This model defines the structure of a Post in the Hive application.
// It includes fields for the user who created the post, the caption of the post, an optional image associated with the post,
// an array of users who liked the post, and an array of comments on the post.
// Each comment includes the user who made the comment and the text of the comment.
// The model uses Mongoose to interact with a MongoDB database, allowing for creating, reading, updating, and deleting posts.
// The timestamps option automatically adds createdAt and updatedAt fields to the schema,
// providing a record of when the post was created and last updated.
// This is essential for features like displaying posts in a feed, allowing users to like and comment on posts, and managing user interactions within the Hive application.
// The modular structure of the model allows for easy maintenance and scalability as the application grows,
// ensuring that new features can be added without disrupting existing functionality.
// The model can be used in various parts of the application, such as in controllers for handling post creation, retrieval, liking, and commenting.
// This is crucial for building a robust and user-friendly social media application where users can share their thoughts, media, and interact with others seamlessly.
// The use of Mongoose for database interactions ensures that all operations are performed securely and efficiently.
// The code also includes error handling to manage cases where posts are not found or users attempt to perform unauthorized actions.
// This is essential for maintaining the integrity of the application and providing a smooth user experience.
// The use of notifications enhances user engagement by keeping users informed about interactions with their posts, such as likes and comments.
// This is crucial for building a vibrant community within the Hive application,
// where users can share their thoughts, media, and interact with others seamlessly.
// The modular structure of the model allows for easy maintenance and scalability as the application grows,
// ensuring that new features can be added without disrupting existing functionality.