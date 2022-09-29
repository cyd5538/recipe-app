const mongoose = require('mongoose');

const favorSchema = mongoose.Schema({
      title: {
        type: String,

      },
      image: {
        type: String,
      },
      url: {
        type: String,
      },
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
},
{
    timestamps : true
})

module.exports = mongoose.model('Favor', favorSchema);