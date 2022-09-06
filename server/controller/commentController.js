const asyncHandler = require("express-async-handler");

const Comment = require("../models/commentModel");
const User = require("../models/userModel");

const getComments = asyncHandler(async (req, res) => {
  const Comments = await Comment.find({ user: req.user.id });
  res.status(200).json(Comments);
});

const setComment = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text");
  }
  const comment = await Comment.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(comment);
});

const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    res.status(400);
    throw new Error("comment not found");
  }

  const updatedcomment = await Comment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  const user = await User.findById(req.user.id)

  // 유저가 있는지 확인
  if(!user){
    res.status(401)
    throw new Error('User가 없습니다')
  }

  // 로그인한 유저와 맞는지 확인
  if(comment.user.toString() !== user.id){
    res.status(401)
    throw new Error("인증되지 않은 유저입니다.")
  }

  res.status(200).json(updatedcomment);
});

const deleteComment = asyncHandler(async (req, res) => {

  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    res.status(400);
    throw new Error("comment not found");
  }

  const user = await User.findById(req.user.id)

  // 유저가 있는지 확인
  if(!user){
    res.status(401)
    throw new Error('User가 없습니다')
  }

  // 로그인한 유저와 맞는지 확인
  if(comment.user.toString() !== user.id){
    res.status(401)
    throw new Error("인증되지 않은 유저입니다.")
  }

  await Comment.remove()

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getComments,
  setComment,
  updateComment,
  deleteComment,
};
