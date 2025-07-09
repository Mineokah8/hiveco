const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

module.exports = cloudinary;
// This module configures Cloudinary for image uploads in the Hive application.
// It sets up the Cloudinary credentials using environment variables.
// The configured Cloudinary instance can be used to upload images, manage media assets, and perform other media-related tasks.
// This is essential for features like profile picture uploads, image sharing, and media management within the application.
// The module exports the configured Cloudinary instance for use in other parts of the application.
// It allows developers to easily integrate image upload functionality without needing to manage the configuration in multiple places