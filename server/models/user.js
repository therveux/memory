const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    _id: String,
  email: String,
  id: Number
});

const User = mongoose.model("user", UserSchema);

module.exports = {
  User
};
