const asyncHandler = require("express-async-handler");
const Favor = require("../models/favorModel");

const AllFavors = asyncHandler(async (req, res) => {
  const favors = await Favor.find({ user: req.user.id })
  res.status(200).json(favors)
})

const getFavors = asyncHandler(async (req, res) => {
  const favors = await Favor.find({ user: req.user.id })

  res.status(200).json(favors)
})

const addFavor = asyncHandler(async (req, res) => {
  
  const favors = await Favor.create({
    title: req.body.title,
    image: req.body.image,
    url: req.body.url,
    user: req.user.id,
  })

  res.status(200).json(favors)
})




const DeleteFavor = asyncHandler(async (req, res) => {
  const Favors = await Favor.findById(req.params.id)

  if (!Favors) {
    res.status(400)
    throw new Error('Goal not found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }


  if (Favors.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await Favors.remove()

  res.status(200).json({ id: req.params.id })
})


module.exports = {
  addFavor,
  DeleteFavor,
  AllFavors,
  getFavors
};
