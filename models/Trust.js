const mongoose = require("mongoose");

const trustSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: String,
  description: String,
  // dateCreated: { type: Date, default: Date.now },
  president: {
    name: String,
    phone: String,
  },
  trustee: {
    name: String,
    phone: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Trust", trustSchema);
