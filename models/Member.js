// const mongoose = require("mongoose");

// const memberSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     address: { type: String, required: true },
//     // fee: { type: Number },
//     feesPaid: { type: Boolean, default: false }, // "PAID" => true
//     trustId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Trust",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Member", memberSchema);
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    feesPaid: { type: Boolean, default: false },
    feesPaidData: {
      type: Map,
      of: [String], // e.g. { "2025": ["JAN", "FEB"] }
      default: {},
    },
    trustId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trust",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
