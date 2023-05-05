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
      ChatData: isChat[0],
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
        .findOne({ _id: createdChat._id }) // find Chat with chatId that created
        .populate("users", "-password"); // get all deatils of users those are commnicating

      res.status(200).json({
        success: true,
        ChatData: fullChat,
      });
    } catch (error) {
        console.log(error ,"error");
      return next(new ErrorHandler(error.message, 400));
    }
  }
});


//@description     Create New Group Chat
//@route           POST /api/v1/chat/group
//@access          Protected

exports.createGroupChat  = asyncWrapper(async( req , res  , next) =>{
 

    if (!req.body.users || !req.body.name) {
    return next(new ErrorHandler("Please Fill all the feilds", 400));
  }

  let users = JSON.parse(req.body.users); //  JSON string into a JavaScript object.
    
  if(users.length < 2){
      return next(
        new ErrorHandler("More than 2 users are required to form a group chat" , 400)
      ); 
  }

         // add logged user or who is looged in into group as well beacuse he is cerating group thoug  he will admin as well.
      users.push(req.user);

  try {
       const groupChat = await chatModel.create({
         chatName: req.body.name,
         users: users,
         isGroupChat: true,
         groupAdmin: req.user,
       });

       const fullGroupChat = await chatModel
         .findOne({ _id: groupChat._id })
         .populate("users", "-password")
         .populate("groupAdmin", "-password");

           res.status(201).json({
             success: true,
             chatData: fullGroupChat,
           });

  } catch (error) {
      return next(new ErrorHandler(error.message , 400))
  }


})