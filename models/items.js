const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  type: {
    type: String,
    required: [true, "Please provide a type"],
  },
  brand: {
    type: String,
    required: [true, "Please provide a brand"],
  },
  model: {
    type: String,
    required: [true, "Please provide a model"],
    unique: true,
  },
  price: {
    type: String,
    required: [true, "Please provide  price"],
  },
  image:{
    type:String,
    required:[true,"Please provide a image"]
  },
  stock:{
    type:String,
    required:[true,"Please provide a stock information"]
  }
});

module.exports = mongoose.model("Item", ItemSchema);
