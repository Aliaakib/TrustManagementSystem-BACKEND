const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  trustId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trust",
    required: true,
  },
  notes: String,
  amount: Number,
  date: {
    type: Date,
    default: Date.now,
  },
  source: {
    type: String,
    enum: ["fees", "donation"], // categorize source of expense
    required: true,
  },
});

module.exports = mongoose.model("Expense", expenseSchema);
