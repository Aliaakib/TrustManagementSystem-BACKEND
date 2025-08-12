const Trustee = require("../models/Trustee");

exports.getTrustees = async (req, res) => {
  try {
    const { trustId } = req.query;
    if (!trustId) return res.status(400).json({ error: "Missing trustId" });

    const trustees = await Trustee.find({ trustId });
    res.json(trustees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addTrustee = async (req, res) => {
  try {
    const { name, email, phone, address, trustId } = req.body;
    const trustee = new Trustee({ name, email, phone, address, trustId });
    await trustee.save();
    res.status(201).json(trustee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTrustee = async (req, res) => {
  try {
    const { id } = req.params;
    await Trustee.findByIdAndDelete(id);
    res.json({ message: "Trustee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
