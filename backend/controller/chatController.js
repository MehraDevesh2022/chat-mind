const asyncWrapper = require("../middleWare/asyncWrapper");
const ErrorHandler = require("../appUtills/error");
const chatModel = require("../model/ChatModel");
const userModel = require("../model/UserModel");

// @description     Create or fetch One to One Chat
// @route           POST /api/v1/chat/
// @access          Protected

exports.getCreateChatController = asyncWrapper(async (req, res, next) => {
  const { userId } = req.body;
console.log(req.body);
  if (!userId) {
    return next(new ErrorHandler("UserId param not sent with request", 400));
  }

  let isChat = await chatModel.findOne({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } }, // loged in user
      { users: { $elemMatch: { $eq: userId } } }, // user whom with chat will happen
    ],
  })
    .populate("users", "-password") // users all info exclude password
    .populate("latestMessage"); //  messageModel data

  isChat = await userModel.populate(isChat, {
    path: "latestMessage.sender", // sender from messageModel
    select: "name avatar email", // get that senders deatils
  });

  // if aleady chat available then send data else cerate a new chat between two sender or logged in user
  if (isChat.length > 0) {
    res.status(200).json({
      success: true,
      chat: isChat[0],
    });
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await chatModel.create(chatData);
      const fullChat = await chatModel
        .findOne({ _id: createdChat._id }) // findChat with chatId that created
        .populate("users", "-password"); // get all deatils of users those are commnicating

      res.status(200).json({
        success: true,
        chat: fullChat,
      });
    } catch (error) {
        console.log(error ,"error");
      return next(new ErrorHandler(error.message, 400));
    }
  }
});


