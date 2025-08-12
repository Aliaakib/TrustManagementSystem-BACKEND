const Trust = require("../models/Trust");

exports.createTrust = async (req, res) => {
  try {
    const {
      name,
      description,
      dateCreated,
      presidentName,
      presidentPhone,
      trusteeName,
      trusteePhone,
      userId,
    } = req.body;

    if (!name || !description || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const logo = req.file
      ? `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
      : "";

    const trust = new Trust({
      name,
      description,
      dateCreated,
      logo,
      president: { name: presidentName, phone: presidentPhone },
      trustee: { name: trusteeName, phone: trusteePhone },
      createdBy: userId,
    });

    await trust.save();

    res.status(201).json({ message: "Trust created successfully", trust });
  } catch (err) {
    console.error("❌ Trust Creation Error:", err);
    res
      .status(500)
      .json({ message: "Failed to create trust", error: err.message });
  }
};

exports.getTrustByUser = async (req, res) => {
  try {
    const trust = await Trust.findOne({ createdBy: req.params.userId });
    if (!trust) return res.status(404).json({ message: "No trust found" });

    res.json(trust);
  } catch (err) {
    console.error("Get Trust Error:", err);
    res.status(500).json({ message: "Failed to fetch trust" });
  }
};
// Update trust
exports.updateTrust = async (req, res) => {
  try {
    const trustId = req.params.id;
    const {
      name,
      description,
      // dateCreated,
      presidentName,
      presidentPhone,
      trusteeName,
      trusteePhone,
    } = req.body;

    let updateData = {
      name,
      description,
      // dateCreated,
      president: { name: presidentName, phone: presidentPhone },
      trustee: { name: trusteeName, phone: trusteePhone },
    };

    if (req.file) {
      const logo = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        "base64"
      )}`;
      updateData.logo = logo;
    }

    const updatedTrust = await Trust.findByIdAndUpdate(trustId, updateData, {
      new: true,
    });

    res.json({ message: "Trust updated successfully", updatedTrust });
  } catch (err) {
    console.error("Update Trust Error:", err);
    res
      .status(500)
      .json({ message: "Failed to update trust", error: err.message });
  }
};
