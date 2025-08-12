const mongoose = require("mongoose");

const setFeeSchema = new mongoose.Schema({
  trustId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Trust",
  },
  feeAmount: {
    type: Number,
    required: true,
    default: 100,
  },
});

module.exports = mongoose.model("SetFee", setFeeSchema);
