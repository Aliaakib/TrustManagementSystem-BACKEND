const Setting = require("../models/SetFee");

exports.getFeeSetting = async (req, res) => {
  try {
    const { trustId } = req.query;

    if (!trustId) {
      return res.status(400).json({ error: "Missing trustId" });
    }

    let setting = await Setting.findOne({ trustId });

    if (!setting) {
      setting = await Setting.create({ trustId, feeAmount: 500 });
    }

    res.json(setting);
  } catch (err) {
    console.error("Get fee setting error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.setFeeAmount = async (req, res) => {
  try {
    const { trustId, feeAmount } = req.body;

    if (!trustId || feeAmount == null) {
      return res.status(400).json({ error: "Missing trustId or feeAmount" });
    }

    const updated = await Setting.findOneAndUpdate(
      { trustId },
      { feeAmount },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Set fee error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
