const express = require("express");
const router = express.Router();
const {
  getLikedRecipes,
  addToLikedRecipe,
  removeFromLikedRecipe
} = require("../controller/FavorController");

const { protect } = require("../middlewear/authMiddlewear");

router.route("/liked/:email").get(protect, getLikedRecipes)
router.route("/add").post(protect, addToLikedRecipe);
router.route("/delete").put(protect, removeFromLikedRecipe);

module.exports = router;
