const asyncWrapper = require("../middleWare/asyncWrapper");
const messageModel = require("../model/MessageModel");
const chatModel = require("../model/ChatModel");
const ErrorHandler = require("../appUtills/error");
const userModel = require("../model/UserModel");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected

exports.getAllMessage = asyncWrapper(async (req, res, next) => {
  const message = await messageModel
    .find({ chat: req.params.chatId })
    .populate("sender", "name pic email")
    .populate("chat");

  if (!message) {
    return next(new ErrorHandler("Chat id not found", 404));
  }
  res.status(200).json({
    success: true,
    message,
  });
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected

exports.sendMessage = asyncWrapper(async (req, res, next) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return next(new ErrorHandler("Invalid data passed into request", 400));
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  const message = await messageModel.create(newMessage);
  message = await message.populate("sender", "name pic");
  message = await message.populate("chat");
  message = await User.populate(message, {
    path: "chat.users",
    select: "name pic email",
  });


  // now update lastest message  beacuse when user communicate everytime lastest message will change
  await chatModel.findByIdAndUpdate(req.body.chatId, {
    latestMessage: message,
  });

  res.status(201).json({
    success  : true,
    message
  })

});
