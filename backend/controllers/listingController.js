const Listing = require("../models/Listing");

exports.createListing = async (req, res) => {
  try {
    const { title, description, price, contact, category } = req.body;

    const listing = new Listing({
      user: req.user.id,
      title,
      description,
      price,
      contact,
      category,
      image: req.file ? req.file.path : null,
    });

    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getListings = async (req, res) => {
  try {
    const listings = await Listing.find()
      .sort({ createdAt: -1 })
      .populate("user", "fullName profilePic");
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate("user", "fullName profilePic");
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return res.status(404).json({ message: "Listing not found" });
    if (listing.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const { title, description, price, contact, category } = req.body;

    listing.title = title || listing.title;
    listing.description = description || listing.description;
    listing.price = price || listing.price;
    listing.contact = contact || listing.contact;
    listing.category = category || listing.category;

    if (req.file) {
      listing.image = req.file.path;
    }

    await listing.save();
    res.status(200).json({ message: "Listing updated", listing });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return res.status(404).json({ message: "Listing not found" });
    if (listing.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await listing.remove();
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// This controller handles the creation, retrieval, updating, and deletion of listings in the Hive application.
// It allows users to post items for sale or trade, view listings, and manage their own listings.
// The `createListing` method allows users to create a new listing with details such as title, description, price, contact information, and category.
// The `getListings` method retrieves all listings, sorted by creation date, and populates user information for each listing.
// The `getListingById` method retrieves a specific listing by its ID, including user information.
// The `updateListing` method allows users to update their own listings, including changing the title, description, price, contact information, category, and image.
// The `deleteListing` method allows users to delete their own listings.
// This functionality is essential for facilitating a marketplace within the Hive application, enabling users to buy, sell, or trade items with each other.
// The controller uses Mongoose to interact with the MongoDB database, ensuring that all operations are performed securely and efficiently.
// It also includes error handling to manage cases  where listings are not found or users attempt to perform unauthorized actions.
// The modular structure of the controller allows for easy maintenance and scalability as the application grows,
// ensuring that new features can be added without disrupting existing functionality.
// The use of middleware for authentication ensures that only authorized users can create, update, or delete listings,
// enhancing the security and integrity of the marketplace. exports.deleteListing = async (req, res) => {
//   try {
//     const listing = await Listing.findById(req.params.id);      
exports.getListings = async (req, res) => {
  try {
    const { keyword, category, status } = req.query;
    const query = {};

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    const listings = await Listing.find(query)
      .sort({ createdAt: -1 })
      .populate("user", "fullName profilePic");

    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// This method retrieves listings based on optional filters such as keyword, category, and status.
// It allows users to search for listings that match specific criteria, enhancing the usability of the marketplace 
// within the Hive application.
// The `keyword` filter allows users to search for listings by title or description.
// The `category` filter allows users to view listings within a specific category, such as books, electronics, or clothes.
// The `status` filter allows users to view listings based on their availability, such as available or sold.
// The method constructs a query object based on the provided filters and retrieves listings from the database.
// It sorts the listings by creation date and populates user information for each listing.
// The retrieved listings are returned in the response, allowing users to view and interact with the marketplace.   
// This functionality is essential for providing a comprehensive marketplace experience within the Hive application,
// enabling users to find items of interest quickly and efficiently.

exports.markAsSold = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    if (listing.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    listing.status = "sold";
    await listing.save();

    res.status(200).json({ message: "Listing marked as sold", listing });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  await notifyUser({
  userId: buyerId, // you would need to track this elsewhere
  type: "listing",
  message: `The item "${listing.title}" has been marked as sold.`,
  link: `/listings/${listing._id}`,
});

};
// This method allows users to mark their listings as sold.
// It checks if the listing exists and if the user is authorized to update it.
// If the listing is found and the user is authorized, it updates the status of the listing to "sold" and saves the changes to the database.
// The updated listing is returned in the response
