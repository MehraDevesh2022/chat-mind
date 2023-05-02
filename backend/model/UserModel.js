const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Enter Your Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
  },

  pic: {
    type: "String",
    required: true,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {timestamps : true});

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel