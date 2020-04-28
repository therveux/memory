const mongoose = require("mongoose");
const { Schema } = mongoose;

const CardSchema = new Schema({
  type: String,
  data: String,
  set: String,
  cardId: Number,
    _id: String
});

const Card = mongoose.model("card", CardSchema);

module.exports = {
  Card
};
