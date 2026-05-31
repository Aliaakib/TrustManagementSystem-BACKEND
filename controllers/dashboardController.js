
const mongoose = require("mongoose");
const Member = require("../models/Member");
const Trustee = require("../models/Trustee");
const MainDonation = require("../models/MainDonation");
const SetFee = require("../models/SetFee");

exports.getDashboardStats = async (req, res) => {
  try {
    const trustId = req.query.trustId;

    if (!trustId) {
      return res.status(400).json({ error: "Missing trustId query parameter" });
    }

    const [members, trustees, donations, setting] = await Promise.all([
      Member.find({ trustId }),
      Trustee.find({ trustId }),
      MainDonation.find({ trustId }),
      SetFee.findOne({ trustId }),
    ]);

    const totalMembers = members.length;
    const totalTrustees = trustees.length;
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = new Date()
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();

    const feesPaid = members.filter((member) => {
      const paidMonths = member.feesPaidData?.get
        ? member.feesPaidData.get(currentYear) || []
        : member.feesPaidData?.[currentYear] || [];

      return paidMonths.includes(currentMonth);
    }).length;

    const feesNotPaid = totalMembers - feesPaid;

    const feeAmount = setting?.feeAmount || 500; // ✅ FIXED

    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);

    const donationMonthly = Array(12).fill(0);
    donations.forEach((d) => {
      const month = new Date(d.date).getMonth();
      donationMonthly[month] += d.amount;
    });

    res.json({
      totalMembers,
      totalTrustees,
      totalDonations,
      feesCollected: feesPaid * feeAmount, // ✅ Uses correct dynamic fee
      feeStatusData: [
        { name: "Paid", value: feesPaid },
        { name: "Not Paid", value: feesNotPaid },
      ],
      donationData: donationMonthly.map((amount, idx) => ({
        name: new Date(0, idx).toLocaleString("default", { month: "short" }),
        amount,
      })),
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
