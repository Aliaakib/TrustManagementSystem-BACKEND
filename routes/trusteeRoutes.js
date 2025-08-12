const express = require("express");
const router = express.Router();
const {
  getTrustees,
  addTrustee,
  deleteTrustee,
} = require("../controllers/trusteeController");

router.get("/", getTrustees);
router.post("/", addTrustee);
router.delete("/:id", deleteTrustee);

module.exports = router;
