const express = require("express");
const {
  getCreateChatController,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
  getAllChats,
} = require("../controller/chatController");
const { authentication } = require("../middleWare/auth");
const router = express.Router();

router
  .route("/")
  .post(authentication, getCreateChatController)
  .get(authentication, getAllChats);
router.route("/create/group").post(authentication, createGroupChat);
router.route("/remove/group").delete(authentication, removeFromGroup);
router.route("/add/group").put(authentication, addToGroup);
router.route("/rename/group").put(authentication, renameGroup);
module.exports = router;
