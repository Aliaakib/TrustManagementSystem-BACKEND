const mongoose = require("mongoose");

const mainDonationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  mode: { type: String, enum: ["cash", "online", "cheque"], required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  trustId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trust",
    required: true,
  },
});

module.exports = mongoose.model("MainDonation", mainDonationSchema);
