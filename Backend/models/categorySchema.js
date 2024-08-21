const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  title: { type: String, required: [true, "Le champ titre est obligatoire"] },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});
// create in the BD
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
