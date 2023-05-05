const express  = require("express");
const { getCreateChatController, createGroupChat  , removeFromGroup, addToGroup, renameGroup, getAllChats} = require("../controller/chatController");
const { authentication } = require("../middleWare/auth");
const router = express.Router();



router.route("/").post(authentication, getCreateChatController).post(authentication , getAllChats)
 router.route("/create/group").post(authentication , createGroupChat)
router.route("/remove/group").post(authentication, removeFromGroup);
router.route("/add/group").post(authentication , addToGroup); 
router.route("/rename/group").post(authentication , renameGroup)
module.exports = router;
