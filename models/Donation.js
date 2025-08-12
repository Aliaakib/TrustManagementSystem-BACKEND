const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
});

module.exports = mongoose.model("Donation", donationSchema);
