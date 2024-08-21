const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  title: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },

});
// create in the BD
const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
