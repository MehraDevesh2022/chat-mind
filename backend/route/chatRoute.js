const express  = require("express");
const { getCreateChatController, createGroupChat  , removeFromGroup} = require("../controller/chatController");
const { authentication } = require("../middleWare/auth");
const router = express.Router();



router.route("/").post(authentication, getCreateChatController);
 router.route("/group").post(authentication , createGroupChat)
router.route("/remove").post(authentication, removeFromGroup);

module.exports = router;
