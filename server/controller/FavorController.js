const asyncHandler = require("express-async-handler");

const Favor = require("../models/FavorModel");
const User = require("../models/userModel");

const getFavor = asyncHandler(async (req, res) => {
  const Favors = await Favor.find({ user: req.user.id });
  res.status(200).json(Favors);
});

const deleteFavor = asyncHandler(async (req, res) => {

  const favor = await Favor.findById(req.params.id);
  if (!favor) {
    res.status(400);
    throw new Error("not found");
  }

  const user = await User.findById(req.user.id)

  // 유저가 있는지 확인
  if(!user){
    res.status(401)
    throw new Error('User가 없습니다')
  }

  // 로그인한 유저와 맞는지 확인
  if(favor.user.toString() !== user.id){
    res.status(401)
    throw new Error("인증되지 않은 유저입니다.")
  }

  await Favor.remove()

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  deleteFavor,
  getFavor,
};
