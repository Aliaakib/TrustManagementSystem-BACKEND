const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// GET all notes by trustId
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({ trustId: req.query.trustId }).sort({
      createdAt: -1,
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

// POST create note
router.post("/", async (req, res) => {
  const { title, content, trustId } = req.body;
  try {
    const newNote = new Note({ title, content, trustId });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Failed to create note" });
  }
});

// PUT update note
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;
  try {
    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update note" });
  }
});

// DELETE a note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note" });
  }
});

module.exports = router;
