// const mongoose = require("mongoose");

// const trusteeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   trustId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Trust",
//     required: true,
//   },
// });

// module.exports = mongoose.model("Trustee", trusteeSchema);

const mongoose = require("mongoose");

const trusteeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  address: String,
  trustId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trust",
    required: true,
  },
});

module.exports = mongoose.model("Trustee", trusteeSchema);
