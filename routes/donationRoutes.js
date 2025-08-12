// const express = require("express");
// const router = express.Router();
// const MainDonation = require("../models/MainDonation");

// router.post("/", async (req, res) => {
//   try {
//     const donation = new MainDonation(req.body);
//     const saved = await donation.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     console.error("Add donation failed:", err.message);
//     res.status(400).json({ error: err.message });
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const { trustId } = req.query;
//     if (!trustId) {
//       return res.status(400).json({ error: "Missing trustId in query" });
//     }

//     const donations = await MainDonation.find({ trustId });
//     res.json(donations);
//   } catch (err) {
//     console.error("Fetch donations failed:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const deleted = await MainDonation.findByIdAndDelete(req.params.id);
//     if (!deleted) {
//       return res.status(404).json({ error: "Donation not found" });
//     }
//     res.json({ message: "Donation deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to delete donation" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const MainDonation = require("../models/MainDonation");

// POST /api/donations - Add new donation
router.post("/", async (req, res) => {
  try {
    const donation = new MainDonation(req.body);
    const saved = await donation.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Add donation failed:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// ✅ GET /api/donations?trustId=... - Get all donations for a trust
router.get("/", async (req, res) => {
  try {
    const { trustId } = req.query;
    if (!trustId) {
      return res.status(400).json({ error: "Missing trustId in query" });
    }

    const donations = await MainDonation.find({ trustId });
    res.json(donations);
  } catch (err) {
    console.error("Fetch donations failed:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/donations/:id - Delete donation
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await MainDonation.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Donation not found" });
    }
    res.json({ message: "Donation deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete donation" });
  }
});

module.exports = router;
