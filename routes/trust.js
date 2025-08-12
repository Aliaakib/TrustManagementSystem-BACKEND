// routes/trustRoutes.js
const express = require("express");
const multer = require("multer");
const {
  createTrust,
  getTrustByUser,
  updateTrust,
} = require("../controllers/trustController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("logo"), createTrust);
router.get("/by-user/:userId", getTrustByUser);
router.put("/:trustId", upload.single("logo"), updateTrust); // ✅ new route
router.put("/:id", upload.single("logo"), updateTrust);

module.exports = router;
