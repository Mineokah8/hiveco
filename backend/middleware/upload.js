const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hive_profiles",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

module.exports = upload;
// This middleware handles file uploads using Multer and Cloudinary.
// It configures Multer to use Cloudinary as the storage backend for uploaded files.
// The uploaded files are stored in a specific folder on Cloudinary with allowed formats.
// This is used for features like profile picture uploads in the Hive application.
// It allows users to upload images, which are then stored in the cloud, making them accessible for use in the application.
// The middleware can be used in routes to handle file uploads seamlessly, ensuring that images are processed and stored correctly without requiring local storage management.
// It simplifies the image upload process by integrating directly with Cloudinary, allowing for efficient media management and retrieval.
// This is essential for maintaining a clean and scalable application architecture, especially when dealing with user-generated content like profile pictures or media files in