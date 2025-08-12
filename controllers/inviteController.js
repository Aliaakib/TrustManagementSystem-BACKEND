const Trust = require("../models/Trust");

exports.getTrustInfo = async (req, res) => {
  const { role, trustId } = req.params;

  try {
    const trust = await Trust.findById(trustId);
    if (!trust) return res.status(404).json({ message: "Trust not found" });

    if (role !== "member" && role !== "trustee") {
      return res.status(400).json({ message: "Invalid role type" });
    }

    res.status(200).json({
      trustName: trust.name,
      trustLogo: trust.logo, // URL
      role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
