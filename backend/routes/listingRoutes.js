const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
} = require("../controllers/listingController");


const {
  createListing,
  getListings,
  getListingById,
} = require("../controllers/listingController");

/**
 * @route POST /api/listings
 * @desc Create a new listing
 * @access Private
 */
router.post("/", auth, upload.single("image"), createListing);

/**
 * @route GET /api/listings
 * @desc Get all listings
 * @access Public
 */
router.get("/", getListings);

/**
 * @route GET /api/listings/:id
 * @desc Get single listing by ID
 * @access Public
 */
router.get("/:id", getListingById);

module.exports = router;

/**
 * @route PUT /api/listings/:id
 * @desc Update a listing
 * @access Private (Owner only)
 */
router.put("/:id", auth, upload.single("image"), updateListing);

/**
 * @route DELETE /api/listings/:id
 * @desc Delete a listing
 * @access Private (Owner only)
 */
router.delete("/:id", auth, deleteListing);

/**
 * @route PUT /api/listings/:id/sold
 * @desc Mark a listing as sold
 * @access Private (Owner only)
 */
router.put("/:id/sold", auth, markAsSold);
