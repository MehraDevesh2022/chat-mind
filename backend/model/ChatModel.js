const mongoose = require("mongoose");


const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },

    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
      },
    ], // if not grupChat then 2 user else 2 or more then 2

    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "messageModel",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
  },
  { timestamps: true } //{timestamps: true} option, which will add the createdAt and updatedAt fields to the schema.
);

const chatModel  = mongoose.model('chatModel' , chatSchema);
module.exports = chatModel