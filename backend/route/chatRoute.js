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
router.route("/group").post(authentication, createGroupChat);
router.route("/groupremove").delete(authentication, removeFromGroup);
router.route("/groupadd").put(authentication, addToGroup);
router.route("/rename").put(authentication, renameGroup);
module.exports = router;
