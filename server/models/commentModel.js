const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    text: {
      type: String,
      required: [true, "텍스트 넣어주세요"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
