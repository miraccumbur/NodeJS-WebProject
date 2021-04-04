const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please provide a email format",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"]
  },
  cart: 
    {
      type: Array,
    },
  
});

module.exports = mongoose.model("User", UserSchema);
