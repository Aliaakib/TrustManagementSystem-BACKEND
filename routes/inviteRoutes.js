const express = require("express");
const router = express.Router();
const Trust = require("../models/Trust");

// @route   GET /api/invite/member/:trustId
// @desc    Fetch trust info for invite page
// router.get("/member/:trustId", async (req, res) => {
//   try {
//     const trust = await Trust.findById(req.params.trustId);

//     if (!trust) {
//       return res.status(404).json({ message: "Trust not found" });
//     }

//     res.json({
//       trustName: trust.name,
//       trustLogo: trust.logo,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// backend route (e.g., inviteRoutes.js)
router.get("/invite/member/:trustId", async (req, res) => {
  const { trustId } = req.params;

  try {
    const trust = await Trust.findById(trustId);
    if (!trust) return res.status(404).json({ message: "Trust not found" });

    res.json({
      trustName: trust.name,
      trustLogo: trust.logo, // adjust field names to match your model
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
