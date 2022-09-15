const mongoose = require("mongoose");

const FavorSchema = mongoose.Schema([{
    array : []
}]);

module.exports = mongoose.model("Favor", FavorSchema);
