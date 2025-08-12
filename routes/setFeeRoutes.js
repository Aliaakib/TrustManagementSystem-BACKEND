const express = require("express");
const router = express.Router();
const {
  getFeeSetting,
  setFeeAmount,
} = require("../controllers/setFeeController");

router.get("/", getFeeSetting);
router.post("/", setFeeAmount);

module.exports = router;
