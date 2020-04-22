const mongoose = require("mongoose");
const { Schema } = mongoose;

const CardSchema = new Schema({
  type: String,
  data: String,
  id: Number
});

const Card = mongoose.model("card", CardSchema);

module.exports = {
  Card
};
