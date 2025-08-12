// // exports.addMember = async (req, res) => {
// //   try {
// //     const { name, feesPaid, trustId } = req.body;
// //     const newMember = new Member({ name, feesPaid, trustId });
// //     await newMember.save();
// //     res.status(201).json(newMember);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// const Member = require("../models/Member");

// exports.getMembers = async (req, res) => {
//   try {
//     const { trustId } = req.query;
//     if (!trustId) return res.status(400).json({ error: "Missing trustId" });

//     const members = await Member.find({ trustId });
//     res.json(members);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.addMember = async (req, res) => {
//   try {
//     const { name, email, phone, address, fee, status, trustId } = req.body;
//     const member = new Member({
//       name,
//       email,
//       phone,
//       address,
//       fee,
//       status,
//       trustId,
//     });
//     await member.save();
//     res.status(201).json(member);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.deleteMember = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Member.findByIdAndDelete(id);
//     res.json({ message: "Member deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
const Member = require("../models/Member");

// exports.getMembers = async (req, res) => {
//   try {
//     const { trustId } = req.query;
//     if (!trustId) return res.status(400).json({ error: "Missing trustId" });

//     const members = await Member.find({ trustId });
//     res.json(members);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// controllers/memberController.js
exports.getMembers = async (req, res) => {
  try {
    const { trustId } = req.query;
    if (!trustId) return res.status(400).json({ error: "Missing trustId" });

    const members = await Member.find({ trustId }).lean();
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = new Date()
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();
    // e.g., "FEB"

    const updatedMembers = members.map((member) => {
      const paidMonths = member.feesPaidData?.[currentYear] || [];
      const isPaid = paidMonths.includes(currentMonth);
      return {
        ...member,
        feesPaid: isPaid,
      };
    });

    res.json(updatedMembers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { name, email, phone, address, feesPaid, trustId } = req.body;

    if (!name || !email || !phone || !address || !trustId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const member = new Member({
      name,
      email,
      phone,
      address,
      feesPaid,
      trustId,
    });

    await member.save();
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    await Member.findByIdAndDelete(id);
    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { feesPaidData, monthsPaid, yearPaid, ...otherUpdates } = req.body;

    const member = await Member.findById(id);
    if (!member) return res.status(404).json({ error: "Member not found" });

    // Handle monthsPaid + yearPaid from frontend
    if (monthsPaid && yearPaid) {
      const year = String(yearPaid);
      const existingMonths = member.feesPaidData.get(year) || [];
      const mergedMonths = Array.from(
        new Set([...existingMonths, ...monthsPaid])
      );
      member.feesPaidData.set(year, mergedMonths);
      member.feesPaid = true;
    }

    // Also handle bulk feesPaidData (if sent)
    if (feesPaidData) {
      for (const [year, newMonths] of Object.entries(feesPaidData)) {
        const existingMonths = member.feesPaidData.get(year) || [];
        const mergedMonths = Array.from(
          new Set([...existingMonths, ...newMonths])
        );
        member.feesPaidData.set(year, mergedMonths);
        member.feesPaid = true;
      }
    }

    // Apply other updates
    Object.assign(member, otherUpdates);

    await member.save();
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
