const mongoose = require("mongoose");

const messageSchema  = new mongoose.Schema({

  sender : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "userModel",
  },
  content : {
    type : String,
    trim : true
  },
  chat :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "chatModel",

  },
  readBy : [{
    type : mongoose.Schema.Types.ObjectId ,
  ref : "userModel",
}],



},{timestamps : true}) 


const messageModel = mongoose.model("messageModel" , messageSchema);
module.exports = messageModel;
