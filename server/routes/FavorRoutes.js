const express = require("express");
const router = express.Router();
const {
  getFavor,
  deleteFavor
} = require("../controller/FavorController");

const { protect } = require("../middlewear/authMiddlewear");

router.route("/").get(protect, getFavor)
router.route("/:id").delete(protect, deleteFavor);

module.exports = router;
