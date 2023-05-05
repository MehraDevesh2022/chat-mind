const express  = require("express");
const { getCreateChatController } = require("../controller/chatController");
const { authentication } = require("../middleWare/auth");
const router = express.Router();



router.route("/").post(authentication, getCreateChatController);
 

module.exports = router;
