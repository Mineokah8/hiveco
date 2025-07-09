  const Notification = require("../models/Notification");

const notifyUser = async ({ userId, type, message, link }) => {
  try {
    const notification = new Notification({
      user: userId,
      type,
      message,
      link,
    });
    await notification.save();
  } catch (err) {
    console.error("Failed to create notification:", err.message);
  }
};

module.exports = notifyUser;
// This utility function is used to create notifications for users.
// It takes an object with userId, type, message, and link as parameters.
// It creates a new notification document in the database and saves it.
// If there's an error during the process, it logs the error message to the console.
// This is essential for notifying users about important events or actions related to their accounts or activities within the application.
// The function can be used in various parts of the application, such as in controllers for handling user interactions, like new messages, comments on posts, or updates to listings.
// By centralizing the notification logic in this utility function, it promotes code reusability and maintainability.
// This way, if the notification logic needs to change in the future, it can be done in one place without affecting multiple controllers.
// The function can also be extended to include additional fields or logic, such as sending email notifications or integrating with third-party notification services.
// This is crucial for keeping users informed and engaged with the application, enhancing the overall user experience.
// The modular structure of the utility function allows for easy integration into different parts of the application,
// ensuring that notifications can be created consistently across various user interactions.