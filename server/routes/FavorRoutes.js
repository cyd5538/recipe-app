const express = require('express')
const router = express.Router()
const {
   addFavor,
   DeleteFavor,
   AllFavors,
   getFavors
  } = require('../controller/FavorController')

const { protect } = require('../middlewear/authMiddlewear')

router.route('/').post(protect, addFavor).get(protect,getFavors)
router.route('/:id').delete(protect, DeleteFavor).get(protect,AllFavors)

module.exports = router