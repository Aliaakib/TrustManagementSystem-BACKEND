//

// routes/trustRoutes.js
const express = require("express");
const multer = require("multer");
const {
  createTrust,
  getTrustByUser,
  updateTrust,
} = require("../controllers/trustController");

const router = express.Router();

// Multer setup for file uploads (in-memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a new trust (with optional logo upload)
router.post("/", upload.single("logo"), createTrust);

// Get trust details by userId
router.get("/by-user/:userId", getTrustByUser);

// Update trust details by trustId (with optional logo upload)
router.put("/:trustId", upload.single("logo"), updateTrust);

module.exports = router;
