const express = require("express");
const router = express.Router();
const multer = require("multer");
const Document = require("../models/Document");
const fs = require("fs");
const path = require("path");

// Setup file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/documents");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// GET all documents for a trust
router.get("/", async (req, res) => {
  const { trustId } = req.query;
  try {
    const docs = await Document.find({ trustId });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

// POST new document
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title, uploadedBy, trustId } = req.body;
    const newDoc = new Document({
      title,
      uploadedBy,
      trustId,
      fileUrl: `/uploads/documents/${req.file.filename}`,
      fileName: req.file.originalname,
      uploadDate: new Date(),
    });
    await newDoc.save();
    res.status(201).json(newDoc);
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});

// DELETE document
router.delete("/:id", async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Document not found" });

    // Delete file from disk
    const filePath = path.join(__dirname, "..", doc.fileUrl);
    fs.unlink(filePath, (err) => {
      if (err) console.warn("Failed to delete file:", err);
    });

    await doc.deleteOne();
    res.json({ message: "Document deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
