const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  contact: { type: String, required: true },
  category: { type: String }, // optional: e.g., books, electronics, clothes
  status: {
  type: String,
  enum: ["available", "sold"],
  default: "available",
},
}, 
{ timestamps: true });

module.exports = mongoose.model("Listing", listingSchema);

