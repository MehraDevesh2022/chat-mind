const express  = require("express");
const { getCreateChatController, createGroupChat } = require("../controller/chatController");
const { authentication } = require("../middleWare/auth");
const router = express.Router();



router.route("/").post(authentication, getCreateChatController);
 router.route("/group").post(authentication , createGroupChat)

module.exports = router;
