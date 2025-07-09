const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // receiver
  type: { type: String, enum: ["message", "comment", "like", "listing"], required: true },
  message: { type: String, required: true },
  link: { type: String }, // optional: e.g., `/posts/:id`, `/messages`
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", notificationSchema);
// This model defines the structure of a Notification in the Hive application.
// It includes fields for the user who receives the notification, the type of notification (message, comment, like, or listing),
// a message describing the notification, an optional link to the relevant content,
// a boolean indicating whether the notification has been read, and a timestamp for when the notification was created.
// The model uses Mongoose to interact with a MongoDB database.
// It allows for creating, reading, updating, and deleting notifications in the application.
// This is essential for features like notifying users about new messages, comments on their posts, likes on their content, or new listings.
// The timestamps option automatically adds createdAt and updatedAt fields to the schema, providing a record of when the notification was created and last updated.
// This is useful for sorting notifications by recency and displaying them in a timeline format.
// The model can be used in various parts of the application, such as in controllers for handling notification creation, retrieval, and interaction (like marking notifications as read).
// This is crucial for keeping users informed about important events and interactions within the Hive application.
// The modular structure of the model allows for easy maintenance and scalability as the application grows,
// ensuring that new notification types can be added without disrupting existing functionality.