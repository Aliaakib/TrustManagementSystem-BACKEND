const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  address: String,
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "trustee", "member"], required: true },
});

module.exports = mongoose.model("User", userSchema);
