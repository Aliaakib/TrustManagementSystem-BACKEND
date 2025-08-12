const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  uploadedBy: { type: String },
  trustId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trust",
    required: true,
  },
  fileUrl: { type: String, required: true },
  fileName: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Document", documentSchema);
