const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Add new expense
router.post("/", async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all expenses by trustId and optional filter
router.get("/", async (req, res) => {
  try {
    const { trustId, filter } = req.query;

    if (!trustId) {
      return res.status(400).json({ error: "Missing trustId" });
    }

    let query = { trustId };

    if (filter === "fees") {
      query.source = "fees";
    } else if (filter === "donation") {
      query.source = "donation";
    }

    const expenses = await Expense.find(query);
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    res.json({ expenses, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

module.exports = router;
