const mongoose = require("mongoose");
const { Schema } = mongoose;

// nb: _id is automatically generate by Mongo

const SetSchema = new Schema({
  name: String
});

const Set = mongoose.model("set", SetSchema);

module.exports = {
  Set
};
